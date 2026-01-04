
import React, { useState, useEffect } from 'react';
import { InvoiceData, ServiceCategory, DurationOption } from '../types';
import { SecurityService } from '../services/securityService';
import Swal from 'sweetalert2';

interface InvoiceGeneratorProps {
  defaultCategory: ServiceCategory;
  title: string;
  desc: string;
}

const ADMIN_PHONE = '6289526974458';
const API_BASE = 'https://pay.athars.me/api/deposit';
const DB_KEY_ENCRYPTED = 'astralune_orders_db_encrypted';

const PRICING_CONFIG: Record<ServiceCategory, { base: number; perFeature: number; label: string }> = {
  WHATSAPP_BOT: { base: 45000, perFeature: 5000, label: 'WhatsApp Bot' },
  TELEGRAM_BOT: { base: 35000, perFeature: 7000, label: 'Telegram Bot' },
  DISCORD_BOT: { base: 65000, perFeature: 10000, label: 'Discord Bot' },
  WEBSITE: { base: 150000, perFeature: 0, label: 'Website Pro' },
  ADDON_FIX: { base: 0, perFeature: 0, label: 'Addon & Fix' }
};

const DURATION_PRICING: Record<DurationOption, { label: string; price: number }> = {
  FAST: { label: '3-5 Hari', price: 20000 },
  MEDIUM: { label: '7-10 Hari', price: 10000 },
  SLOW: { label: '14-20 Hari', price: 5000 }
};

export const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ defaultCategory, title, desc }) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [targetPlatform, setTargetPlatform] = useState<ServiceCategory>('WHATSAPP_BOT');
  
  const [formData, setFormData] = useState<InvoiceData>({
    clientName: '',
    clientPhone: '',
    serviceCategory: defaultCategory,
    duration: 'MEDIUM',
    projectDescription: '',
    features: [],
    totalPrice: 0,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    invoiceNumber: `AST-${Date.now().toString().slice(-6)}`,
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    setFormData(prev => ({ ...prev, serviceCategory: defaultCategory, features: [], projectDescription: '' }));
  }, [defaultCategory]);

  useEffect(() => {
    let total = 0;
    const category = formData.serviceCategory;
    const config = PRICING_CONFIG[category];
    
    if (category === 'ADDON_FIX') {
      const platformConfig = PRICING_CONFIG[targetPlatform];
      total = formData.features.length * platformConfig.perFeature;
    } else if (category === 'WEBSITE') {
      total = config.base;
    } else {
      total = config.base + (formData.features.length * config.perFeature);
    }

    total += DURATION_PRICING[formData.duration].price;
    setFormData(prev => ({ ...prev, totalPrice: total }));
  }, [formData.features, formData.serviceCategory, formData.duration, targetPlatform]);

  const addFeature = () => {
    if (!newFeature.trim()) return;
    if (formData.features.includes(newFeature.trim())) return;
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const generateTextInvoice = () => {
    const featureText = formData.features.map(f => `  • ${f}`).join('\n');
    const platformLabel = formData.serviceCategory === 'ADDON_FIX' ? ` (Platform: ${PRICING_CONFIG[targetPlatform].label})` : '';
    
    return `*KONFIRMASI PESANAN ASTRALUNE*
----------------------------------------
Ref ID: ${formData.invoiceNumber}
Tanggal: ${formData.date}

*DETAIL CLIENT:*
Nama: ${formData.clientName}
WhatsApp: ${formData.clientPhone}

*DETAIL LAYANAN:*
Kategori: ${PRICING_CONFIG[formData.serviceCategory].label}${platformLabel}
Durasi: ${DURATION_PRICING[formData.duration].label}

${formData.serviceCategory === 'WEBSITE' ? `*DESKRIPSI PROYEK:* \n${formData.projectDescription || '-'}` : `*DAFTAR FITUR:* \n${featureText || '-'}`}

----------------------------------------
*TOTAL INVESTASI: ${formatIDR(formData.totalPrice)}*
*(Sudah termasuk DP 50%)*
----------------------------------------
_Generate by Astralune Digital Secure System_`;
  };

  const handlePaymentAndSend = async () => {
    const limitCheck = SecurityService.checkRateLimit('order', 2, 300000);
    if (!limitCheck.allowed) {
      Swal.fire('SISTEM SIBUK', 'Terdeteksi aktivitas berlebih. Mohon tunggu beberapa menit.', 'error');
      return;
    }

    if (!formData.clientName || !formData.clientPhone) {
      Swal.fire('FORM KOSONG', 'Mohon isi nama dan nomor WhatsApp Anda.', 'warning');
      return;
    }

    const dpAmount = Math.round(formData.totalPrice * 0.5);
    setIsProcessingPayment(true);

    try {
      const response = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nominal: Number(dpAmount), reff_id: formData.invoiceNumber })
      });

      const data = await response.json();
      const qrUrl = data.qr_url || data.data?.qr_url;
      const paymentId = data.id || data.data?.id;

      if (!paymentId) throw new Error('Gateway Error');

      Swal.fire({
        title: 'PEMBAYARAN DP (50%)',
        html: `
          <div class="space-y-4">
             <div class="p-4 bg-slate-50 border-2 border-black">
                <p class="text-[10px] opacity-40 uppercase font-black">Nominal Pembayaran</p>
                <p class="text-3xl text-astral font-black">${formatIDR(dpAmount)}</p>
             </div>
             <div class="flex justify-center p-4 border-4 border-black bg-white">
                <img src="${qrUrl}" class="w-full max-w-[250px] aspect-square mx-auto" alt="QRIS" />
             </div>
             <p class="text-[9px] font-black uppercase tracking-widest opacity-40">Scan QRIS untuk verifikasi pesanan otomatis.</p>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      const poll = setInterval(async () => {
        const res = await fetch(`${API_BASE}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: String(paymentId) })
        });
        const statusData = await res.json();
        const state = statusData.status || statusData.data?.status;

        if (['success', 'PAID', 'COMPLETED'].includes(state)) {
          clearInterval(poll);
          completeOrder();
        }
      }, 5000);

      setTimeout(() => clearInterval(poll), 600000);

    } catch (e) {
      setIsProcessingPayment(false);
      Swal.fire({
        title: 'GATEWAY TIMEOUT',
        text: 'Lanjutkan dengan konfirmasi teks manual?',
        showCancelButton: true,
        confirmButtonText: 'YA, KONFIRMASI MANUAL',
      }).then(r => r.isConfirmed && completeOrder());
    }
  };

  const completeOrder = () => {
    const textInvoice = generateTextInvoice();
    
    // Save to history
    const encrypted = localStorage.getItem(DB_KEY_ENCRYPTED);
    const history = encrypted ? SecurityService.decryptData(encrypted) : [];
    localStorage.setItem(DB_KEY_ENCRYPTED, SecurityService.encryptData([formData, ...history]));

    setIsProcessingPayment(false);

    Swal.fire({
      title: 'PESANAN DIPROSES',
      html: `
        <div class="text-left font-mono text-[10px] p-3 md:p-4 bg-slate-100 border-2 border-black whitespace-pre-wrap h-64 overflow-y-auto mb-4">
          ${textInvoice}
        </div>
      `,
      confirmButtonText: 'KIRIM KE WHATSAPP ADMIN',
      customClass: { popup: 'neo-border' }
    }).then(() => {
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(textInvoice)}`, '_blank');
    });
  };

  return (
    <section className="py-8 md:py-24 max-w-7xl mx-auto px-4">
      {isProcessingPayment && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center text-white backdrop-blur-md px-6 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-8 border-t-astral border-white/10 rounded-full animate-spin mb-6"></div>
          <p className="font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">Menyiapkan Protokol Enkripsi...</p>
        </div>
      )}

      <div className="mb-8 md:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-heading font-black uppercase italic leading-tight mb-4">
          {title.split(' ')[0]} <span className="text-astral text-outline">{title.split(' ')[1] || ''}</span>
        </h2>
        <p className="text-base md:text-xl font-bold border-l-4 md:border-l-8 border-black pl-4 md:pl-6 opacity-80 max-w-2xl">{desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        <div className="bg-white p-6 md:p-10 border-4 border-black neo-shadow-lg space-y-6 md:space-y-8 h-fit">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase">Nama Client</label>
                <input 
                  className="w-full bg-slate-50 border-4 border-black p-4 md:p-5 font-bold outline-none focus:bg-blue-50 text-sm"
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  placeholder="Nama Anda"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase">WhatsApp (628xxx)</label>
                <input 
                  className="w-full bg-slate-50 border-4 border-black p-4 md:p-5 font-bold outline-none focus:bg-blue-50 text-sm"
                  value={formData.clientPhone}
                  onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                  placeholder="628..."
                />
              </div>
           </div>

           {formData.serviceCategory === 'ADDON_FIX' && (
             <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase">Pilih Platform Target</label>
                <div className="grid grid-cols-2 gap-2">
                   {(['WHATSAPP_BOT', 'TELEGRAM_BOT', 'DISCORD_BOT', 'WEBSITE'] as ServiceCategory[]).map(p => (
                     <button 
                        key={p} 
                        onClick={() => setTargetPlatform(p)}
                        className={`p-2 md:p-3 border-2 md:border-4 border-black font-black uppercase text-[8px] md:text-[10px] transition-colors ${targetPlatform === p ? 'bg-astral text-white' : 'bg-white'}`}
                     >
                       {PRICING_CONFIG[p].label}
                     </button>
                   ))}
                </div>
             </div>
           )}

           {formData.serviceCategory === 'WEBSITE' ? (
              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase">Deskripsi Detail Website</label>
                <textarea 
                  className="w-full bg-slate-50 border-4 border-black p-4 md:p-5 font-bold outline-none focus:bg-blue-50 h-32 md:h-48 resize-none text-sm"
                  value={formData.projectDescription}
                  onChange={e => setFormData({...formData, projectDescription: e.target.value})}
                  placeholder="Jelaskan jenis website, fitur utama, dan tujuan Anda secara detail..."
                />
              </div>
           ) : (
              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase">
                  Daftar Fitur / Perbaikan {formData.serviceCategory !== 'ADDON_FIX' ? `(+ ${formatIDR(PRICING_CONFIG[formData.serviceCategory].perFeature)} / fitur)` : `(+ ${formatIDR(PRICING_CONFIG[targetPlatform].perFeature)} / fitur)`}
                </label>
                <div className="flex gap-2">
                  <input 
                    className="flex-grow bg-slate-50 border-4 border-black p-3 md:p-4 font-bold outline-none text-sm"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addFeature()}
                    placeholder="Contoh: Auto Welcome"
                  />
                  <button onClick={addFeature} className="bg-black text-white px-4 md:px-6 font-black border-2 md:border-4 border-black neo-shadow uppercase text-[10px]">TAMBAH</button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 md:p-4 bg-slate-50 border-2 md:border-4 border-black border-dashed min-h-[100px] md:min-h-[120px]">
                   {formData.features.map((f, i) => (
                     <span key={i} className="px-2 py-1 bg-white border-2 border-black font-black text-[9px] md:text-[10px] uppercase flex items-center gap-2">
                       {f} <button onClick={() => removeFeature(i)} className="text-red-600 font-bold">✕</button>
                     </span>
                   ))}
                   {formData.features.length === 0 && <p className="text-[9px] md:text-[10px] opacity-30 italic font-bold">Tambahkan setidaknya satu fitur atau poin perbaikan.</p>}
                </div>
              </div>
           )}

           <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-black uppercase">Prioritas Pengerjaan</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                {(Object.keys(DURATION_PRICING) as DurationOption[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setFormData({...formData, duration: d})}
                    className={`p-2 md:p-3 border-2 md:border-4 border-black font-black uppercase text-[10px] transition-all ${formData.duration === d ? 'bg-black text-white neo-shadow' : 'bg-white'}`}
                  >
                    {DURATION_PRICING[d].label}
                  </button>
                ))}
              </div>
           </div>

           <button 
            onClick={handlePaymentAndSend}
            className="w-full py-5 md:py-8 bg-astral text-white border-4 border-black font-black text-lg md:text-2xl uppercase neo-shadow-hover transition-all"
           >
             BUAT PESANAN
           </button>
        </div>

        <div className="bg-white border-4 border-black p-6 md:p-12 neo-shadow-lg flex flex-col min-h-[400px] md:min-h-[700px] relative">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 0)', backgroundSize: '20px 20px' }}></div>
           <div className="mb-6 md:mb-10 pb-4 md:pb-8 border-b-4 md:border-b-8 border-black">
              <h3 className="text-2xl md:text-4xl font-heading font-black italic uppercase">PREVIEW PESANAN</h3>
              <p className="text-astral font-black uppercase text-[8px] md:text-[10px] tracking-widest mt-1">SISTEM KONTRAK TEKS ASTRALUNE</p>
           </div>
           
           <div className="flex-grow space-y-6 md:space-y-8 font-mono text-[10px] md:text-sm">
              <div className="p-3 md:p-4 bg-slate-50 border-2 md:border-4 border-black whitespace-pre-wrap break-words">
                 {generateTextInvoice()}
              </div>
              <div className="p-3 md:p-4 border-2 border-black border-dashed opacity-60">
                <p className="text-[8px] md:text-[10px] font-black uppercase">Catatan Penting:</p>
                <ul className="text-[8px] md:text-[10px] list-disc pl-4 mt-1 md:mt-2">
                  <li>Pembayaran DP 50% di muka untuk mengamankan slot.</li>
                  <li>Pelunasan setelah sistem "Ready to Deploy".</li>
                  <li>Data pesanan ini dienkripsi secara aman.</li>
                </ul>
              </div>
           </div>

           <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-4 md:border-t-8 border-black flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="w-full">
                <p className="text-[8px] md:text-[10px] font-black uppercase opacity-40">Estimasi Total</p>
                <p className="text-3xl sm:text-4xl md:text-6xl font-black text-astral drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter">
                   {formatIDR(formData.totalPrice)}
                </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

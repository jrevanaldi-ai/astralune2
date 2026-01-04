
import React from 'react';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

const services = [
  {
    title: "WHATSAPP BOT",
    desc: "Otomatisasi bisnis via WhatsApp. Chatbot cerdas dengan fitur database dan broadcast aman.",
    gradient: "from-astral to-astral-dark",
    textColor: "text-white",
    accent: "bg-cyan-400",
    section: "whatsapp-bot"
  },
  {
    title: "TELEGRAM BOT",
    desc: "Bot AI untuk ekosistem Telegram. Solusi moderasi, trading bot, hingga payment gateway.",
    gradient: "from-white to-slate-100",
    textColor: "text-black",
    accent: "bg-astral",
    section: "telegram-bot"
  },
  {
    title: "DISCORD BOT",
    desc: "Manajemen komunitas Discord premium. Bot kustom untuk role, ekonomi, dan proteksi server.",
    gradient: "from-black to-slate-800",
    textColor: "text-white",
    accent: "bg-blue-500",
    section: "discord-bot"
  },
  {
    title: "FIX & ADDON",
    desc: "Layanan perbaikan bug atau penambahan fitur baru pada bot/web yang sudah Anda miliki.",
    gradient: "from-red-600 to-red-800",
    textColor: "text-white",
    accent: "bg-white",
    section: "addon-fix"
  },
  {
    title: "WEBSITE PRO",
    desc: "Website eksklusif dengan performa maksimal dan keamanan berlapis untuk profil bisnis modern.",
    gradient: "from-blue-50 to-white",
    textColor: "text-black",
    accent: "bg-black",
    section: "website"
  }
];

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-32 bg-[#f0f0f0] border-t-8 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="text-5xl md:text-8xl font-heading font-black uppercase mb-4 md:mb-6 tracking-tighter italic leading-none">
              <span className="text-astral block">KAMI</span> 
              <span>MENGUASAI</span>
            </h2>
            <p className="text-lg md:text-2xl font-bold text-black border-l-4 md:border-l-8 border-black pl-4 md:pl-6">
              Layanan digital kustom yang dirancang untuk efisiensi bisnis Anda di era digital.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-20 md:mb-32">
          {services.map((s, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(s.section)}
              className={`cursor-pointer relative p-6 md:p-8 border-4 border-black bg-gradient-to-br ${s.gradient} ${s.textColor} neo-shadow-lg transform transition-all hover:-translate-y-2 md:hover:-translate-y-4 hover:rotate-1 group overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 ${s.accent} border-b-4 border-l-4 border-black transform translate-x-5 -translate-y-5 md:translate-x-6 md:-translate-y-6 rotate-45 group-hover:translate-x-3 md:group-hover:translate-x-4 group-hover:-translate-y-3 md:group-hover:-translate-y-4 transition-transform`}></div>

              <h3 className="text-lg md:text-xl font-black mb-3 md:mb-4 uppercase leading-tight">{s.title}</h3>
              <p className="text-[10px] md:text-[11px] font-bold opacity-80 leading-relaxed mb-6 md:mb-8">{s.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-[8px] tracking-widest uppercase opacity-40 italic">Klik Layanan</span>
                <div className="w-6 h-6 border-2 border-black bg-white flex items-center justify-center group-hover:bg-astral transition-colors">
                  <span className="text-black group-hover:text-white font-black text-xs">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

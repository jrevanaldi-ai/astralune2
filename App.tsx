
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { InvoiceGenerator } from './components/InvoiceGenerator';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { SnowBackground } from './components/SnowBackground';
import { ServiceCategory } from './types';

export type AppSection = 'home' | 'whatsapp-bot' | 'telegram-bot' | 'discord-bot' | 'website' | 'addon-fix' | 'dashboard';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('whatsapp-bot')} />
            <Services onNavigate={(s) => setActiveSection(s as AppSection)} />
            <TechStack />
            <section id="server" className="py-32 border-y-8 border-black bg-black relative">
              <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-12 text-white uppercase tracking-tighter italic">
                  DITOPANG OLEH <span className="text-astral-light">INFRASTRUKTUR</span> PREMIUM
                </h2>
                <div className="p-16 bg-astral border-4 border-black inline-block neo-shadow-lg transform -rotate-1 transition-transform hover:rotate-0">
                  <span className="text-5xl md:text-8xl font-mono font-black text-white uppercase tracking-tight">
                    athars.eu
                  </span>
                </div>
                <p className="mt-16 text-slate-400 text-2xl font-bold max-w-3xl mx-auto leading-relaxed italic">
                  "Stabilitas adalah komitmen kami. Astralune menggunakan infrastruktur VPS high-end untuk memastikan seluruh layanan tetap online 24/7."
                </p>
              </div>
            </section>
          </>
        );
      case 'whatsapp-bot':
        return <InvoiceGenerator defaultCategory="WHATSAPP_BOT" title="WhatsApp Bot" desc="Sistem otomatisasi chat WhatsApp dengan manajemen database terintegrasi." />;
      case 'telegram-bot':
        return <InvoiceGenerator defaultCategory="TELEGRAM_BOT" title="Telegram Bot" desc="Bot cerdas untuk moderasi grup, payment gateway, dan monitoring sistem." />;
      case 'discord-bot':
        return <InvoiceGenerator defaultCategory="DISCORD_BOT" title="Discord Bot" desc="Pengelolaan komunitas Discord profesional dengan fitur kustom tingkat lanjut." />;
      case 'website':
        return <InvoiceGenerator defaultCategory="WEBSITE" title="Website Pro" desc="Pengembangan Website eksklusif dengan performa tinggi dan desain neobrutalisme." />;
      case 'addon-fix':
        return <InvoiceGenerator defaultCategory="ADDON_FIX" title="Fix & Addon" desc="Layanan perbaikan error (bug fix) atau penambahan fitur baru pada sistem yang sudah ada." />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0] text-black selection:bg-astral selection:text-white relative">
      <SnowBackground />
      <Header onNavigate={setActiveSection} activeSection={activeSection} />
      
      <main className="flex-grow pt-24 relative z-10">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;

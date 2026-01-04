
import React from 'react';
import { AstraluneLogo } from './AstraluneLogo';

const techWithLogos = [
  { name: 'Golang', logo: 'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png' },
  { name: 'Rust', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg' },
  { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'JavaScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { name: 'TypeScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
  { name: 'Java', logo: 'https://www.vectorlogo.zone/logos/java/java-icon.svg' },
  { name: 'Vlang', logo: 'https://vlang.io/img/v-logo.png' }
];

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative z-10 bg-white border-t-8 border-black pt-24 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-astral opacity-5 -rotate-45 transform translate-x-16 -translate-y-16"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <AstraluneLogo size="md" className="-rotate-3" />
              <span className="text-4xl font-heading font-black uppercase tracking-tighter italic">
                Astralune
              </span>
            </div>
            <p className="text-xl font-bold max-w-sm leading-relaxed">
              Arsitek solusi digital yang berfokus pada <span className="text-astral font-black underline">performa</span>, 
              <span className="text-astral font-black underline"> keamanan</span>, dan <span className="text-astral font-black underline">estetika</span> modern.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://t.me/NathanAwful" 
                target="_blank"
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:rotate-6 group"
                title="Telegram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="Telegram"
                />
              </a>
              <a 
                href="mailto:contact@nathan.christmas" 
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:-rotate-6 group"
                title="Email"
              >
                <img 
                  src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="Email"
                />
              </a>
              <a 
                href="https://wa.me/6289526974458" 
                target="_blank"
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:scale-110 group"
                title="WhatsApp"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="WhatsApp"
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-1 bg-astral inline-block"></span>
              Teknologi Kami
            </h4>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {techWithLogos.map(tech => (
                <div key={tech.name} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-white border-2 border-black p-1 flex items-center justify-center neo-shadow group-hover:scale-110 transition-transform">
                    <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-black uppercase text-xs group-hover:text-astral transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-1 bg-black inline-block"></span>
              Status Sistem
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://athars.eu" 
                  target="_blank" 
                  className="flex items-center justify-between p-4 border-2 border-black bg-slate-50 hover:bg-astral hover:text-white transition-all neo-shadow group"
                >
                  <span className="font-black uppercase text-[10px] tracking-widest">Infrastruktur</span>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="block font-black uppercase text-[10px] tracking-widest hover:text-astral transition-colors border-b-2 border-transparent hover:border-astral pb-1 w-fit">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="block font-black uppercase text-[10px] tracking-widest hover:text-astral transition-colors border-b-2 border-transparent hover:border-astral pb-1 w-fit">
                  Dokumentasi Teknis
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-black uppercase text-sm tracking-widest italic mb-1">
              &copy; {new Date().getFullYear()} Astralune Digital Solutions.
            </p>
            <p className="text-[10px] font-bold text-astral uppercase tracking-[0.3em]">
              Premium Craftsmanship for the Digital World
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-4 py-1 bg-black text-white text-[10px] font-black uppercase">Gw di atas nama mbud</div>
             <div className="px-4 py-1 bg-astral text-white text-[10px] font-black uppercase">Astralune</div>
          </div>
        </div>
      </div>
    </footer>
  );
};


import React from 'react';
import { AstraluneLogo } from './AstraluneLogo';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden bg-astral py-20 md:py-0">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      {/* Diagonal White Stripe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-20 md:h-48 bg-white/95 border-y-[4px] md:border-y-[10px] border-black -rotate-[12deg] z-0 flex items-center justify-center overflow-hidden">
         <div className="flex whitespace-nowrap animate-scroll-text gap-10 md:gap-20">
            <span className="text-2xl md:text-8xl font-black uppercase italic tracking-tighter text-black">WEBSITE • BOT DEVELOPMENT • WEBSITE • BOT DEVELOPMENT • WEBSITE • BOT DEVELOPMENT</span>
            <span className="text-2xl md:text-8xl font-black uppercase italic tracking-tighter text-black">WEBSITE • BOT DEVELOPMENT • WEBSITE • BOT DEVELOPMENT • WEBSITE • BOT DEVELOPMENT</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="max-w-3xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-6 md:mb-10">
               <AstraluneLogo size="lg" className="-rotate-12 scale-75 md:scale-100" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-[120px] lg:text-[140px] font-heading font-black leading-[0.9] mb-8 md:mb-12 uppercase italic text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] md:drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
              ASTRA<br/>
              <span className="text-white">LUNE</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center lg:items-start mb-10 md:mb-16">
              <div className="max-w-lg border-l-4 md:border-l-8 border-white pl-4 md:pl-8 text-left">
                <p className="text-lg md:text-2xl font-bold text-white leading-tight italic">
                  Solusi digital premium dengan fokus pada <span className="underline decoration-2 md:decoration-4">keamanan data</span> dan 
                  <span className="text-cyan-300"> performa server</span> tak tertandingi.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full sm:w-auto">
              <button 
                onClick={onGetStarted}
                className="px-8 md:px-12 py-4 md:py-6 bg-white text-astral border-4 border-black font-black text-xl md:text-2xl uppercase neo-shadow-hover transition-all active:translate-y-1 active:shadow-none"
              >
                Mulai Proyek
              </button>
              <a 
                href="https://t.me/NathanAwful" 
                target="_blank" 
                className="px-8 md:px-12 py-4 md:py-6 bg-black text-white border-4 border-black font-black text-xl md:text-2xl uppercase neo-shadow-hover transition-all text-center group"
              >
                Kontak Admin <span className="ml-2 md:ml-3 group-hover:translate-x-2 transition-transform inline-block">→</span>
              </a>
            </div>
          </div>

          {/* Decorative element for large screens only */}
          <div className="hidden lg:block relative">
             <div className="w-[400px] xl:w-[500px] h-[600px] xl:h-[700px] border-[12px] border-black bg-white neo-shadow-lg transform rotate-3 flex flex-col p-10 overflow-hidden">
                <div className="flex justify-between border-b-8 border-black pb-8 mb-8">
                   <AstraluneLogo size="md" />
                   <div className="text-right font-black uppercase italic text-xs">
                      Astralune Digital<br/>Est. 2025
                   </div>
                </div>
                <div className="flex-grow space-y-6">
                   <div className="h-12 bg-astral w-full"></div>
                   <div className="h-12 bg-astral w-3/4"></div>
                   <div className="h-12 bg-astral w-5/6"></div>
                   <div className="pt-10">
                      <h3 className="text-5xl xl:text-6xl font-black uppercase italic leading-none tracking-tighter">PREMIUM<br/>SERVICE</h3>
                      <p className="mt-4 font-bold text-lg xl:text-xl leading-tight">Membangun masa depan digital yang lebih cepat, lebih aman, dan lebih eksklusif.</p>
                   </div>
                </div>
                <div className="mt-auto pt-8 border-t-8 border-black flex justify-between items-end">
                   <div className="font-black text-3xl xl:text-4xl italic">01 // OPS</div>
                   <div className="w-10 xl:w-12 h-10 xl:h-12 bg-astral rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-text {
          animation: scroll-text 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

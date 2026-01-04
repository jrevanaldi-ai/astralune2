
import React from 'react';

const coreLanguages = [
  { 
    name: "Golang", 
    desc: "Performa tinggi untuk microservices & backend bot.",
    logo: "https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png"
  },
  { 
    name: "Rust", 
    desc: "Keamanan memori maksimal untuk sistem kritikal.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg"
  },
  { 
    name: "Python", 
    desc: "Integrasi AI & otomasi skrip yang fleksibel.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
  },
  { 
    name: "TypeScript", 
    desc: "Pengembangan web & bot dengan tipe data aman.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
  },
  { 
    name: "JavaScript", 
    desc: "Standar industri untuk pengembangan web interaktif.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  },
  { 
    name: "Java", 
    desc: "Sistem enterprise skala besar & aplikasi Android.",
    logo: "https://www.vectorlogo.zone/logos/java/java-icon.svg"
  },
  { 
    name: "Vlang", 
    desc: "Bahasa pemrograman statis yang simpel dan sangat cepat.",
    logo: "https://vlang.io/img/v-logo.png"
  }
];

export const TechStack: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t-8 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic leading-none mb-4">
              ARSITEKTUR <span className="text-astral text-outline">TECH</span>
            </h2>
            <p className="text-xl font-bold opacity-80 border-l-8 border-astral pl-6">
              Team Astralune menguasai stack teknologi modern untuk menjamin sistem Anda stabil, cepat, dan aman.
            </p>
          </div>
          <div className="hidden md:block w-32 h-32 border-4 border-black bg-astral neo-shadow -rotate-12 flex items-center justify-center p-4 text-white">
            <span className="font-black text-center text-xs uppercase leading-none">Powered by Innovation</span>
          </div>
        </div>

        {/* Core Languages with Images */}
        <div className="mb-10">
          <div className="bg-black text-white px-6 py-2 border-4 border-black inline-block transform -rotate-2 mb-8">
            <span className="text-xs font-black uppercase tracking-widest">BAHASA PEMROGRAMAN UTAMA</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreLanguages.map((lang, idx) => (
              <div key={idx} className="group p-6 border-4 border-black bg-slate-50 neo-shadow-hover transition-all flex items-center gap-6">
                <div className="w-16 h-16 flex-shrink-0 bg-white border-2 border-black p-2 neo-shadow group-hover:rotate-6 transition-transform">
                  <img src={lang.logo} alt={lang.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase text-astral">{lang.name}</h4>
                  <p className="text-[10px] md:text-xs font-bold opacity-60 leading-relaxed uppercase italic">
                    {lang.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20 py-10 border-y-4 border-black flex overflow-hidden whitespace-nowrap bg-astral text-white">
          <div className="flex animate-marquee gap-10 md:gap-20">
             {[ "NODE.JS", "MONGODB", "POSTGRESQL", "REDIS", "NGINX", "GIT", "AWS", "LINUX", "DOCKER", "KUBERNETES"].map((t, i) => (
               <span key={i} className="text-2xl md:text-4xl font-black italic opacity-50 hover:opacity-100 transition-opacity cursor-default">{t}</span>
             ))}
             {[ "NODE.JS", "MONGODB", "POSTGRESQL", "REDIS", "NGINX", "GIT", "AWS", "LINUX", "DOCKER", "MYSQL", "ETHICAL CYBER", "KUBERNETES"].map((t, i) => (
               <span key={i + 'copy'} className="text-2xl md:text-4xl font-black italic opacity-50 hover:opacity-100 transition-opacity cursor-default">{t}</span>
             ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

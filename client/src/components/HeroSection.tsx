import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToNext = () => {
    const statsSection = document.querySelector('.stats-section');
    statsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-20 px-12"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 68% 50%, rgba(201,168,76,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 50% 70% at 15% 80%, rgba(201,168,76,0.04) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0d0d0d 100%)
        `,
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-6"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow Effect */}
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[min(500px,50vw)] h-[min(500px,50vw)] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Car SVG */}
      <div className="absolute right-[4%] bottom-[6%] w-[min(460px,48vw)] z-10 opacity-15 hidden lg:block">
        <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M50,145 L75,100 L135,58 L305,54 L385,88 L435,102 L445,145 Z" stroke="#c9a84c" strokeWidth="1.5" />
          <circle cx="128" cy="155" r="26" stroke="#c9a84c" strokeWidth="1.5" />
          <circle cx="358" cy="155" r="26" stroke="#c9a84c" strokeWidth="1.5" />
          <path d="M98,100 L158,62 L290,59 L365,92" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />
          <line x1="238" y1="59" x2="235" y2="100" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
          <path d="M50,145 L445,145" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.28)',
          }}
        >
          <span className="text-yellow-600 text-xs tracking-widest uppercase">✦ Premium Valet Service · Düsseldorf DUS</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
          Parken am Flughafen
          <br />
          <em className="text-yellow-600 not-italic">ohne jeden Stress</em>
        </h1>

        {/* Description */}
        <p className="text-lg text-white/60 max-w-md mb-8 leading-relaxed">
          Wir übernehmen Ihr Fahrzeug direkt am Terminal – sicher, diskret und zuverlässig. Sie steigen aus, wir parken. So einfach ist das.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <a
            href="#buchen"
            className="bg-yellow-600 text-black font-medium px-8 py-3 hover:bg-yellow-500 transition-colors inline-block text-center"
          >
            Jetzt buchen →
          </a>
          <a
            href="tel:+491234567890"
            className="border border-white/20 text-white px-8 py-3 hover:border-yellow-600 hover:text-yellow-600 transition-colors inline-block text-center"
          >
            📞 Direkt anrufen
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-12 flex items-center gap-4 z-20">
        <div className="w-12 h-px bg-yellow-600/40" />
        <span className="text-xs tracking-widest uppercase text-gray-500">Mehr erfahren</span>
      </div>

      {/* Scroll Arrow */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 right-12 z-20 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="text-yellow-600" size={24} />
      </button>
    </section>
  );
}

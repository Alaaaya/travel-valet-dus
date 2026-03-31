import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToNext = () => {
    const statsSection = document.querySelector('.stats-section');
    statsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-20 px-6 md:px-12"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/hero-background-bY6siUeWr6bJr93vNJwpVC.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30 z-0" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
          }}
        >
          <span className="text-yellow-500 text-xs tracking-widest uppercase">✦ Premium Valet Service · Düsseldorf DUS</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white">
          Parken am Flughafen
          <br />
          <span className="text-yellow-500">ohne jeden Stress</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-white/75 max-w-2xl mb-10 leading-relaxed">
          Wir übernehmen Ihr Fahrzeug direkt am Terminal – sicher, diskret und zuverlässig. Sie steigen aus, wir parken. So einfach ist das.
        </p>

        {/* Buttons - New Order */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <a
            href="/booking"
            className="bg-yellow-500 text-slate-900 font-semibold px-8 py-4 hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center"
          >
            Jetzt buchen →
          </a>
          <a
            href="https://wa.me/491639176557"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-semibold px-8 py-4 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center"
          >
            💬 Über WhatsApp buchen
          </a>
          <a
            href="tel:+491639176557"
            className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-slate-900 transition-all duration-300 inline-block text-center font-semibold"
          >
            📞 Direkt anrufen
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-12 flex items-center gap-4 z-20">
        <div className="w-12 h-px bg-yellow-500/40" />
        <span className="text-xs tracking-widest uppercase text-gray-300">Mehr erfahren</span>
      </div>

      {/* Scroll Arrow */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 right-12 z-20 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="text-yellow-500" size={28} />
      </button>
    </section>
  );
}

import { useEffect, useRef } from 'react';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card, idx) => {
      card.classList.add(`reveal-delay-${(idx % 4) + 1}`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      number: '01',
      icon: '🚘',
      title: 'Premium-Abgabe',
      description: 'Fahren Sie direkt zum Abflugterminal B–C. Unser Mitarbeiter erstellt ein Übergabeprotokoll und übernimmt Ihr Fahrzeug – völlig unkompliziert.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/service-1-premium-handover-2DtmK8pF3VsteqSRgZ7QDx.webp',
    },
    {
      number: '02',
      icon: '⚡',
      title: 'Express-Abholung',
      description: 'Nach der Landung einfach anrufen. Ihr Fahrzeug steht in wenigen Minuten vor dem Terminal – kein Shuttle, kein Parkhaus, keine langen Wege.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/service-3-quick-return-HTrsmD3uqdaR9JHZJZExmx.webp',
    },
    {
      number: '03',
      icon: '🔒',
      title: 'Sichere Parkanlage',
      description: 'Videoüberwacht, zugangskontrolliert. Vollkaskoversicherung für die gesamte Standzeit inklusive. Freifläche oder überdachtes Parkhaus wählbar.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/about-section-background-YV2SMQBzqvGT3hnsNGKEZf.webp',
    },
    {
      number: '04',
      icon: '🤍',
      title: 'Sorgfältige Handhabung',
      description: 'Nur geschulte Mitarbeiter bewegen Ihre Fahrzeuge nach klaren Protokollen. Ihr Auto bleibt genau so, wie Sie es übergeben haben.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/service-1-premium-handover-2DtmK8pF3VsteqSRgZ7QDx.webp',
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12" style={{ background: '#1a2847' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30">
            <span className="text-yellow-500 text-xs tracking-widest uppercase">Leistungen</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">
            Unser Premium-Service<br />im Überblick
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="service-card reveal bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-yellow-600/20 rounded-xl overflow-hidden hover:border-yellow-500/40 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 relative">
                {/* Number */}
                <div className="absolute top-6 right-8 font-serif text-5xl font-bold text-yellow-500/20">
                  {service.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-2xl mb-6 bg-yellow-500/10">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-white mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

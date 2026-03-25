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
    },
    {
      number: '02',
      icon: '⚡',
      title: 'Express-Abholung',
      description: 'Nach der Landung einfach anrufen. Ihr Fahrzeug steht in wenigen Minuten vor dem Terminal – kein Shuttle, kein Parkhaus, keine langen Wege.',
    },
    {
      number: '03',
      icon: '🔒',
      title: 'Sichere Parkanlage',
      description: 'Videoüberwacht, zugangskontrolliert. Vollkaskoversicherung für die gesamte Standzeit inklusive. Freifläche oder überdachtes Parkhaus wählbar.',
    },
    {
      number: '04',
      icon: '🤍',
      title: 'Sorgfältige Handhabung',
      description: 'Nur geschulte Mitarbeiter bewegen Ihre Fahrzeuge nach klaren Protokollen. Ihr Auto bleibt genau so, wie Sie es übergeben haben.',
    },
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/28">
            <span className="text-yellow-600 text-xs tracking-widest uppercase">Leistungen</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Unser Premium-Service<br />im Überblick
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              className="service-card reveal bg-black p-12 relative overflow-hidden hover:bg-yellow-600/4 transition-colors"
            >
              {/* Background Number */}
              <div className="absolute top-5 right-8 font-serif text-7xl font-bold text-white/3 pointer-events-none">
                {service.number}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 border border-yellow-600/25 flex items-center justify-center text-2xl mb-6">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

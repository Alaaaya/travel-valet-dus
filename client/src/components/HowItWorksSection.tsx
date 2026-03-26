import { useEffect, useRef } from 'react';

export default function HowItWorksSection() {
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

    const steps = containerRef.current?.querySelectorAll('.timeline-step');
    steps?.forEach((step, idx) => {
      step.classList.add(`reveal-delay-${(idx % 4) + 1}`);
      observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Online buchen',
      description: 'Reisedaten eingeben, Parkart wählen und absenden. Bestätigung kommt in wenigen Minuten.',
    },
    {
      number: '2',
      title: 'Ankunft am Terminal',
      description: 'Zur vereinbarten Zeit direkt zum Terminal B–C vorfahren. Mitarbeiter übernimmt nach Protokoll.',
    },
    {
      number: '3',
      title: 'Sicheres Parken',
      description: 'Überdachte, videoüberwachte Anlage. Vollkaskoversichert für die gesamte Reisedauer.',
    },
    {
      number: '4',
      title: 'Entspannte Rückkehr',
      description: 'Kurz anrufen nach der Gepäckausgabe – Ihr Auto steht in Minuten startklar am Terminal.',
    },
  ];

  return (
    <section id="ablauf" className="py-24 px-6 md:px-12" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300">
            <span className="text-yellow-700 text-xs tracking-widest uppercase font-semibold">Ablauf</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900">So einfach funktioniert&apos;s</h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step reveal">
              {/* Dot */}
              <div className="w-16 h-16 border-4 border-yellow-500 rounded-full bg-yellow-50 flex items-center justify-center font-serif text-2xl font-bold text-yellow-600 mb-8 shadow-lg">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

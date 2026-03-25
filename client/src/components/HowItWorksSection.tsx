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
    <section id="ablauf" className="bg-yellow-600/3 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/28">
            <span className="text-yellow-600 text-xs tracking-widest uppercase">Ablauf</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">So einfach funktioniert&apos;s</h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-7 left-8 right-8 h-px bg-yellow-600/18 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step reveal">
              {/* Dot */}
              <div className="w-14 h-14 border-2 border-yellow-600 rounded-full bg-yellow-600/3 flex items-center justify-center font-serif text-xl font-bold text-yellow-600 mb-6">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

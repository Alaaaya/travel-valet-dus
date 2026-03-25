import { useEffect, useRef } from 'react';

export default function AboutSection() {
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

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    'Fahrzeugübergabe direkt am Terminal – kein Umweg, kein Stress',
    'Überdachte, videoüberwachte Stellplätze nahe des Flughafens',
    'Vollkaskoversicherung für die gesamte Standzeit inklusive',
    '24/7 erreichbar per Telefon, WhatsApp oder E-Mail',
    'Transparente Preise ohne versteckte Zusatzkosten',
  ];

  return (
    <section id="ueber-uns" className="grid grid-cols-1 md:grid-cols-2">
      {/* Visual Side */}
      <div
        className="min-h-96 md:min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 50%, #0d0d0d 100%)',
        }}
      >
        <div className="font-serif text-9xl md:text-[200px] font-bold text-white/7 leading-none text-center">
          DUS
        </div>
        <div className="absolute bottom-9 left-9 right-9 border-t border-yellow-600/15 pt-5">
          <p className="font-serif text-2xl italic text-white/45 leading-relaxed">
            "Wir parken Ihr Auto –<br />Sie genießen die Reise."
          </p>
        </div>
      </div>

      {/* Content Side */}
      <div ref={containerRef} className="p-12 md:p-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/28 w-fit">
          <span className="text-yellow-600 text-xs tracking-widest uppercase">Über uns</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 reveal">
          Ihr persönlicher<br />Parkservice in Düsseldorf
        </h2>

        <p className="text-base text-white/60 leading-relaxed mb-6 reveal reveal-delay-1">
          Travel Valet Düsseldorf steht für komfortables, sicheres und preislich attraktives Valet Parking am Flughafen Düsseldorf (DUS). Wir übernehmen Ihr Fahrzeug persönlich – damit Sie sich voll auf Ihre Reise konzentrieren können.
        </p>

        <p className="text-base text-white/60 leading-relaxed mb-8 reveal reveal-delay-2">
          Unser Service richtet sich an Reisende aus Düsseldorf, Neuss, Ratingen, Duisburg, Krefeld, Meerbusch und der gesamten Region.
        </p>

        <ul className="space-y-4 mb-10 reveal reveal-delay-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-yellow-600 text-lg mt-0.5">✦</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#buchen"
          className="bg-yellow-600 text-black font-medium px-8 py-3 hover:bg-yellow-500 transition-colors inline-block w-fit reveal reveal-delay-4"
        >
          Jetzt Stellplatz sichern →
        </a>
      </div>
    </section>
  );
}

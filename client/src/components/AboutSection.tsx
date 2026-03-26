import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

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
    <section id="ueber-uns" className="grid grid-cols-1 md:grid-cols-2" style={{ background: '#f8f8f8' }}>
      {/* Visual Side */}
      <div
        className="min-h-96 md:min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663038360745/UuXWRhwHAUuwUjZEEfktYD/about-section-background-YV2SMQBzqvGT3hnsNGKEZf.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40" />
        <div className="relative z-10 text-center">
          <div className="font-serif text-9xl md:text-[200px] font-bold text-yellow-300/40 leading-none">
            DUS
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div ref={containerRef} className="p-12 md:p-20 flex flex-col justify-center" style={{ background: '#ffffff' }}>
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300 w-fit">
          <span className="text-yellow-700 text-xs tracking-widest uppercase font-semibold">Über uns</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-10 reveal">
          Ihr persönlicher<br />Parkservice in Düsseldorf
        </h2>

        <p className="text-base text-gray-700 leading-relaxed mb-8 reveal reveal-delay-1">
          Travel Valet Düsseldorf steht für komfortables, sicheres und preislich attraktives Valet Parking am Flughafen Düsseldorf (DUS). Wir übernehmen Ihr Fahrzeug persönlich – damit Sie sich voll auf Ihre Reise konzentrieren können.
        </p>

        <p className="text-base text-gray-700 leading-relaxed mb-12 reveal reveal-delay-2">
          Unser Service richtet sich an Reisende aus Düsseldorf, Neuss, Ratingen, Duisburg, Krefeld, Meerbusch und der gesamten Region.
        </p>

        <ul className="space-y-4 mb-12 reveal reveal-delay-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-4 text-sm text-gray-700">
              <Check className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#buchen"
          className="bg-yellow-500 text-white font-semibold px-8 py-4 hover:bg-yellow-600 transition-all duration-300 inline-block w-fit rounded-lg shadow-lg hover:shadow-xl reveal reveal-delay-4"
        >
          Jetzt Stellplatz sichern →
        </a>
      </div>
    </section>
  );
}

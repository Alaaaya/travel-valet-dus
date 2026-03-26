import { useEffect, useRef } from 'react';

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);

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

    const stats = statsRef.current?.querySelectorAll('.stat-item');
    stats?.forEach((stat) => observer.observe(stat));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '24/7', label: 'Verfügbarkeit' },
    { number: '5★', label: 'Kundenbewertung' },
    { number: '2min', label: 'Übergabezeit' },
    { number: '100%', label: 'Vollkaskoversichert' },
  ];

  return (
    <div
      ref={statsRef}
      className="stats-section grid grid-cols-2 md:grid-cols-4 border-t border-b border-yellow-200"
      style={{ background: '#ffffff' }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="stat-item reveal py-12 px-6 text-center border-r border-yellow-200 hover:bg-yellow-50 transition-colors"
          style={{ transitionDelay: `${idx * 0.08}s` }}
        >
          <div className="font-serif text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
            {stat.number}
          </div>
          <div className="text-xs text-gray-600 tracking-wide uppercase font-semibold">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
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

  const contactItems = [
    {
      icon: Phone,
      label: 'Telefon',
      value: '+49 163 9176557',
      href: 'tel:+491639176557',
      delay: 0,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Jetzt schreiben',
      href: 'https://wa.me/491639176557',
      delay: 1,
    },
    {
      icon: Mail,
      label: 'E-Mail',
      value: 'info@travelvalet-dus.de',
      href: 'mailto:info@travelvalet-dus.de',
      delay: 2,
    },
    {
      icon: MapPin,
      label: 'Standort',
      value: 'Flughafen Düsseldorf (DUS)',
      href: '#',
      delay: 3,
    },
  ];

  return (
    <section id="kontakt" className="py-24 px-6 md:px-12" style={{ background: '#ffffff' }}>
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300">
            <span className="text-yellow-700 text-xs tracking-widest uppercase font-semibold">Kontakt</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900">Wir sind für Sie da</h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Items */}
          <div className="space-y-6">
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className={`reveal flex items-start gap-6 p-6 border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 rounded-lg group`}
                  style={{ transitionDelay: `${item.delay * 0.08}s` }}
                >
                  <div className="w-12 h-12 flex-shrink-0 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1 font-semibold">{item.label}</div>
                    <div className="text-gray-900 group-hover:text-yellow-600 transition-colors font-semibold">{item.value}</div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="reveal space-y-6">
            <div>
              <label className="block text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Ihr Name"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded-lg placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">E-Mail</label>
              <input
                type="email"
                placeholder="Ihre E-Mail"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded-lg placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">Nachricht</label>
              <textarea
                placeholder="Ihre Nachricht …"
                rows={5}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:border-yellow-500 outline-none transition-colors resize-none rounded-lg placeholder-gray-500"
              />
            </div>
            <button className="w-full bg-yellow-500 text-white font-bold py-4 hover:bg-yellow-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl">
              Nachricht senden →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

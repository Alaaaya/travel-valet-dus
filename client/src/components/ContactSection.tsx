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
      value: '+49 123 456 78 90',
      href: 'tel:+491234567890',
      delay: 0,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Jetzt schreiben',
      href: 'https://wa.me/491234567890',
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
    <section id="kontakt" className="bg-yellow-600/3 py-20 px-6 md:px-12">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/28">
            <span className="text-yellow-600 text-xs tracking-widest uppercase">Kontakt</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Wir sind für Sie da</h2>
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
                  className={`reveal flex items-start gap-4 p-6 border border-white/5 hover:border-yellow-600 transition-colors group`}
                  style={{ transitionDelay: `${item.delay * 0.08}s` }}
                >
                  <div className="w-11 h-11 flex-shrink-0 border border-yellow-600/22 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600/10 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-white group-hover:text-yellow-600 transition-colors">{item.value}</div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="reveal space-y-4">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                placeholder="Ihr Name"
                className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">E-Mail</label>
              <input
                type="email"
                placeholder="Ihre E-Mail"
                className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Nachricht</label>
              <textarea
                placeholder="Ihre Nachricht …"
                rows={5}
                className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors resize-none"
              />
            </div>
            <button className="w-full bg-yellow-600 text-black font-medium py-3 hover:bg-yellow-500 transition-colors">
              Nachricht senden →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

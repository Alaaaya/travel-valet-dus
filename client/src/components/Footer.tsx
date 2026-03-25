export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-yellow-600/10 py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-11 mb-11">
          {/* Logo & Description */}
          <div>
            <a href="#" className="font-serif text-lg font-bold text-white mb-3 block">
              Travel Valet <span className="text-yellow-600">Düsseldorf</span>
            </a>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              Wir parken Ihr Auto, während Sie unterwegs sind. Direktübergabe am Terminal, vollkaskoversichert, 24/7 erreichbar.
            </p>
            <div className="flex gap-2">
              {['f', 'in', 'ig'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:border-yellow-600 hover:text-yellow-600 transition-colors text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-1">
              {['Services', 'Ablauf', 'Über uns', 'Buchen'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-5">Dienstleistungen</h4>
            <ul className="space-y-1">
              {['Premium-Abgabe', 'Express-Abholung', 'Fahrzeugreinigung', 'Langzeitparken'].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-5">Newsletter</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">Aktuelle Angebote direkt ins Postfach.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Ihre E-Mail"
                className="flex-1 bg-white/4 border border-white/10 text-white px-3 py-2 text-sm focus:border-yellow-600 outline-none"
              />
              <button className="bg-yellow-600 text-black px-3 py-2 hover:bg-yellow-500 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>© {currentYear} Travel Valet Düsseldorf. Alle Rechte vorbehalten.</div>
          <div className="flex gap-2">
            {['VISA', 'MC', 'PayPal', 'GPay'].map((payment, idx) => (
              <span key={idx} className="bg-white/5 border border-white/8 px-2 py-1">
                {payment}
              </span>
            ))}
          </div>
          <div className="flex gap-5">
            {['Impressum', 'AGB', 'Datenschutz'].map((link, idx) => (
              <a key={idx} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

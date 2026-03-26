export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-yellow-200 py-16 px-6 md:px-12" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="#" className="font-serif text-2xl font-bold text-gray-900 mb-4 block">
              Travel Valet <span className="text-yellow-600">Düsseldorf</span>
            </a>
            <p className="text-sm leading-relaxed text-gray-700 mb-6">
              Wir parken Ihr Auto, während Sie unterwegs sind. Direktübergabe am Terminal, vollkaskoversichert, 24/7 erreichbar.
            </p>
            <div className="flex gap-3">
              {['f', 'in', 'ig'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 border border-yellow-300 flex items-center justify-center text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition-colors text-sm font-semibold rounded-lg"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-yellow-700 uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Services', 'Ablauf', 'Über uns', 'Buchen'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-700 text-sm hover:text-yellow-600 transition-colors font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-yellow-700 uppercase tracking-wider mb-6">Dienstleistungen</h4>
            <ul className="space-y-3">
              {['Premium-Abgabe', 'Express-Abholung', 'Fahrzeugreinigung', 'Langzeitparken'].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-700 text-sm hover:text-yellow-600 transition-colors font-medium">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-yellow-700 uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">Aktuelle Angebote direkt ins Postfach.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Ihre E-Mail"
                className="flex-1 bg-white border border-yellow-300 text-gray-900 px-4 py-2 text-sm focus:border-yellow-500 outline-none rounded-l-lg placeholder-gray-500"
              />
              <button className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition-colors font-bold rounded-r-lg">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
          <div>© {currentYear} Travel Valet Düsseldorf. Alle Rechte vorbehalten.</div>
          <div className="flex gap-3">
            {['VISA', 'MC', 'PayPal', 'GPay'].map((payment, idx) => (
              <span key={idx} className="bg-white border border-yellow-200 px-3 py-1 rounded">
                {payment}
              </span>
            ))}
          </div>
          <div className="flex gap-6">
            {['Impressum', 'AGB', 'Datenschutz'].map((link, idx) => (
              <a key={idx} href="#" className="hover:text-yellow-600 transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

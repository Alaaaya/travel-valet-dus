import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Ablauf', href: '#ablauf' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-yellow-200'
          : 'bg-white/80 backdrop-blur-lg border-b border-yellow-100'
      }`}
      style={{ padding: '18px 48px' }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="font-serif text-2xl font-bold text-gray-900">
          Travel Valet <span className="text-yellow-600">Düsseldorf</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 items-center list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#buchen"
              className="text-sm font-bold bg-yellow-500 text-white px-6 py-2 hover:bg-yellow-600 transition-all rounded-lg shadow-lg hover:shadow-xl"
            >
              Jetzt Buchen
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1 text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 border-b border-yellow-200 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 text-base px-6 py-4 border-b border-yellow-100 hover:text-yellow-600 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buchen"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-yellow-500 text-white text-center font-bold py-4 px-6 hover:bg-yellow-600 transition-colors"
          >
            Jetzt Buchen →
          </a>
        </div>
      )}
    </nav>
  );
}

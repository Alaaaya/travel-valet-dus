import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedParking, setSelectedParking] = useState('free');
  const [selectedCleaning, setSelectedCleaning] = useState('none');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dayCount = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
      setDays(dayCount);
      setPrice(dayCount * 7);
    }
  }, [startDate, endDate]);

  const parkingOptions = [
    { id: 'free', name: 'Freifläche', price: '€7 / Tag' },
    { id: 'covered', name: 'Überdacht', price: '€12 / Tag' },
  ];

  const cleaningOptions = [
    { id: 'inside', name: 'Innenreinigung', emoji: '🧹' },
    { id: 'outside', name: 'Außenreinigung', emoji: '✨' },
    { id: 'none', name: 'Keine', emoji: '🚫' },
  ];

  const handleSubmit = () => {
    alert('Vielen Dank für Ihre Buchungsanfrage!\nWir melden uns in Kürze bei Ihnen.');
  };

  const isStep1 = currentStep === 1;
  const isStep2 = currentStep === 2;
  const isStep3 = currentStep === 3;

  return (
    <section id="buchen" className="bg-yellow-600/5 py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/28">
            <span className="text-yellow-600 text-xs tracking-widest uppercase">Reservierung</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">Stellplatz anfragen</h2>
        </div>

        {/* Form Box */}
        <div className="bg-yellow-600/3 border border-yellow-600/14 p-12">
          {/* Tabs */}
          <div className="flex border-b border-white/6 mb-8">
            {[1, 2, 3].map((step) => {
              const isActive = currentStep === step;
              const tabClass = isActive
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 border-b-2 border-transparent';
              const stepLabel = step === 1 ? 'Reisedaten' : step === 2 ? 'Fahrzeug & Service' : 'Persönliche Daten';
              return (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex-1 text-center py-3 px-2 text-sm transition-all ${tabClass}`}
                >
                  {step} · {stepLabel}
                </button>
              );
            })}
          </div>

          {/* Step 1: Travel Dates */}
          {isStep1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Hinflugdatum *</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Rückflugdatum *</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Ankunftszeit am Terminal *</label>
                  <input
                    type="text"
                    placeholder="07:30"
                    maxLength={5}
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Landezeit Rückflug *</label>
                  <input
                    type="text"
                    placeholder="22:15"
                    maxLength={5}
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Price Bar */}
              <div className="bg-yellow-600/7 border border-yellow-600/18 p-5 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Aufenthaltsdauer</div>
                  <div className="text-sm text-gray-500">{days} Tag{days !== 1 ? 'e' : ''}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-3xl text-yellow-600">€ {price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Grundpreis</div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-yellow-600 text-black font-medium py-3 hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                Weiter <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Vehicle & Service */}
          {isStep2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Parkart wählen</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {parkingOptions.map((opt) => {
                    const isSelected = selectedParking === opt.id;
                    const borderClass = isSelected
                      ? 'border-yellow-600 bg-yellow-600/5'
                      : 'border-white/10 hover:border-yellow-600';
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedParking(opt.id)}
                        className={`border p-4 text-left transition-all ${borderClass}`}
                      >
                        <div className="text-lg mb-1">🅿️</div>
                        <div className="font-medium text-white">{opt.name}</div>
                        <div className="text-sm text-yellow-600">{opt.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Reinigungsservice</label>
                <div className="grid grid-cols-3 gap-2">
                  {cleaningOptions.map((opt) => {
                    const isSelected = selectedCleaning === opt.id;
                    const textClass = isSelected
                      ? 'border-yellow-600 text-yellow-600'
                      : 'border-white/10 text-white hover:border-yellow-600';
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedCleaning(opt.id)}
                        className={`border p-3 text-center transition-all ${textClass}`}
                      >
                        <div className="text-xl mb-1">{opt.emoji}</div>
                        <div className="text-xs">{opt.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border border-white/12 text-gray-500 py-3 hover:border-yellow-600 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} /> Zurück
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-yellow-600 text-black font-medium py-3 hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  Weiter <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Data */}
          {isStep3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Vorname *</label>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Nachname *</label>
                  <input
                    type="text"
                    placeholder="Mustermann"
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">E-Mail *</label>
                  <input
                    type="email"
                    placeholder="max@beispiel.de"
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Telefon *</label>
                  <input
                    type="tel"
                    placeholder="+49 …"
                    className="w-full bg-white/4 border border-white/9 text-white px-4 py-3 focus:border-yellow-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border border-white/12 text-gray-500 py-3 hover:border-yellow-600 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} /> Zurück
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-yellow-600 text-black font-medium py-3 hover:bg-yellow-500 transition-colors"
                >
                  Buchung abschicken ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

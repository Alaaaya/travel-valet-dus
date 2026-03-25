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
    <section id="buchen" className="py-24 px-6 md:px-12" style={{ background: '#1a2847' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30">
            <span className="text-yellow-500 text-xs tracking-widest uppercase">Reservierung</span>
          </div>
          <h2 className="font-serif text-5xl font-bold text-white mb-4">Stellplatz anfragen</h2>
          <p className="text-gray-300 text-lg">Buchen Sie Ihren Parkplatz in wenigen Schritten</p>
        </div>

        {/* Form Box */}
        <div className="bg-yellow-500/10 border border-yellow-600/20 p-12 rounded-lg shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-yellow-600/20 mb-10">
            {[1, 2, 3].map((step) => {
              const isActive = currentStep === step;
              const tabClass = isActive
                ? 'text-yellow-500 border-b-2 border-yellow-500'
                : 'text-gray-400 border-b-2 border-transparent';
              const stepLabel = step === 1 ? 'Reisedaten' : step === 2 ? 'Fahrzeug & Service' : 'Persönliche Daten';
              return (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex-1 text-center py-4 px-2 text-sm transition-all font-semibold ${tabClass}`}
                >
                  {step} · {stepLabel}
                </button>
              );
            })}
          </div>

          {/* Step 1: Travel Dates */}
          {isStep1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Hinflugdatum *</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Rückflugdatum *</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Ankunftszeit am Terminal *</label>
                  <input
                    type="text"
                    placeholder="07:30"
                    maxLength={5}
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Landezeit Rückflug *</label>
                  <input
                    type="text"
                    placeholder="22:15"
                    maxLength={5}
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
              </div>

              {/* Price Bar */}
              <div className="bg-yellow-500/15 border border-yellow-600/30 p-6 flex justify-between items-center rounded-lg">
                <div>
                  <div className="text-sm text-gray-300 font-semibold">Aufenthaltsdauer</div>
                  <div className="text-lg text-yellow-500 font-bold">{days} Tag{days !== 1 ? 'e' : ''}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-4xl text-yellow-500 font-bold">€ {price.toFixed(2)}</div>
                  <div className="text-sm text-gray-300">Grundpreis</div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-yellow-500 text-slate-900 font-bold py-4 hover:bg-yellow-400 transition-all duration-300 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Weiter <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Step 2: Vehicle & Service */}
          {isStep2 && (
            <div className="space-y-8">
              <div>
                <label className="text-xs text-gray-300 uppercase tracking-wider mb-4 block font-semibold">Parkart wählen</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parkingOptions.map((opt) => {
                    const isSelected = selectedParking === opt.id;
                    const borderClass = isSelected
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-yellow-600/20 hover:border-yellow-500';
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedParking(opt.id)}
                        className={`border p-5 text-left transition-all rounded-lg ${borderClass}`}
                      >
                        <div className="text-3xl mb-2">🅿️</div>
                        <div className="font-semibold text-white">{opt.name}</div>
                        <div className="text-sm text-yellow-500 font-semibold">{opt.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 uppercase tracking-wider mb-4 block font-semibold">Reinigungsservice</label>
                <div className="grid grid-cols-3 gap-3">
                  {cleaningOptions.map((opt) => {
                    const isSelected = selectedCleaning === opt.id;
                    const textClass = isSelected
                      ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                      : 'border-yellow-600/20 text-white hover:border-yellow-500';
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedCleaning(opt.id)}
                        className={`border p-4 text-center transition-all rounded-lg ${textClass}`}
                      >
                        <div className="text-2xl mb-2">{opt.emoji}</div>
                        <div className="text-xs font-semibold">{opt.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border-2 border-yellow-600/30 text-gray-300 py-4 hover:border-yellow-500 hover:text-yellow-500 transition-all rounded-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <ChevronLeft size={20} /> Zurück
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-yellow-500 text-slate-900 font-bold py-4 hover:bg-yellow-400 transition-all rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Weiter <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Data */}
          {isStep3 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Vorname *</label>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Nachname *</label>
                  <input
                    type="text"
                    placeholder="Mustermann"
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">E-Mail *</label>
                  <input
                    type="email"
                    placeholder="max@beispiel.de"
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-wider mb-3 font-semibold">Telefon *</label>
                  <input
                    type="tel"
                    placeholder="+49 …"
                    className="w-full bg-white/5 border border-yellow-600/20 text-white px-4 py-3 focus:border-yellow-500 outline-none transition-colors rounded"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border-2 border-yellow-600/30 text-gray-300 py-4 hover:border-yellow-500 hover:text-yellow-500 transition-all rounded-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <ChevronLeft size={20} /> Zurück
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-yellow-500 text-slate-900 font-bold py-4 hover:bg-yellow-400 transition-all rounded-lg shadow-lg hover:shadow-xl"
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

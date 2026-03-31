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
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dayCount = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
      setDays(dayCount);

      const pricePerDay = selectedParking === 'free' ? 10 : 15;
      setPrice(dayCount * pricePerDay);
    }
  }, [startDate, endDate, selectedParking]);

  const parkingOptions = [
    { id: 'free', name: 'Freifläche', price: '€10 / Tag' },
    { id: 'covered', name: 'Parkhaus', price: '€15 / Tag' },
  ];

  const cleaningOptions = [
    { id: 'inside', name: 'Innenreinigung', emoji: '🧹' },
    { id: 'outside', name: 'Außenreinigung', emoji: '✨' },
    { id: 'none', name: 'Keine', emoji: '🚫' },
  ];

  const isStep1 = currentStep === 1;
  const isStep2 = currentStep === 2;
  const isStep3 = currentStep === 3;
  const isStep4 = currentStep === 4;

  return (
    <section id="buchen" className="py-24 px-6 md:px-12" style={{ background: '#f8f8f8' }}>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white border border-yellow-200 p-12 rounded-lg shadow-xl">

          {/* Tabs */}
          <div className="flex border-b border-yellow-200 mb-10">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const tabClass = isActive
                ? 'text-yellow-600 border-b-2 border-yellow-500'
                : 'text-gray-400 border-b-2 border-transparent';

              const stepLabel =
                step === 1 ? 'Reisedaten' :
                step === 2 ? 'Fahrzeug & Service' :
                step === 3 ? 'Persönliche Daten' :
                'Zahlung';

              return (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex-1 text-center py-4 px-2 text-sm font-semibold ${tabClass}`}
                >
                  {step} · {stepLabel}
                </button>
              );
            })}
          </div>

          {/* Step 1 */}
          {isStep1 && (
            <div className="space-y-6">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

              <div>€ {price}</div>

              <button onClick={() => setCurrentStep(2)}>Weiter</button>
            </div>
          )}

          {/* Step 2 */}
          {isStep2 && (
            <div>
              {parkingOptions.map((opt) => (
                <button key={opt.id} onClick={() => setSelectedParking(opt.id)}>
                  {opt.name}
                </button>
              ))}

              <button onClick={() => setCurrentStep(1)}>Zurück</button>
              <button onClick={() => setCurrentStep(3)}>Weiter</button>
            </div>
          )}

          {/* Step 3 */}
          {isStep3 && (
            <div>
              <input type="text" placeholder="Name" />

              <button onClick={() => setCurrentStep(2)}>Zurück</button>
              <button onClick={() => setCurrentStep(4)}>Weiter</button>
            </div>
          )}

          {/* Step 4 (Payment) */}
          {isStep4 && (
            <div className="space-y-6">
              <h3>Zahlungsmethode wählen</h3>

              <label>
                <input type="radio" name="payment" value="cash"
                  onChange={(e) => setPaymentMethod(e.target.value)} />
                Barzahlung
              </label>

              <label>
                <input type="radio" name="payment" value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)} />
                PayPal
              </label>

              <label>
                <input type="radio" name="payment" value="card"
                  onChange={(e) => setPaymentMethod(e.target.value)} />
                Kreditkarte
              </label>

              <button onClick={() => setCurrentStep(3)}>Zurück</button>

              <button
                onClick={() => {
                  if (paymentMethod === 'cash') {
                    alert('Buchung bestätigt!');
                  }
                  if (paymentMethod === 'paypal') {
                    window.location.href = "PUT_PAYPAL_LINK";
                  }
                  if (paymentMethod === 'card') {
                    window.location.href = "PUT_STRIPE_LINK";
                  }
                }}
              >
                Bestätigen
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
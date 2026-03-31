import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface BookingFormData {
  // Step 1: Reisedaten
  startDate: string;
  endDate: string;
  
  // Step 2: Fahrzeug & Service
  vehicleType: string;
  service: string;
  
  // Step 3: Persönliche Daten
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface MultiStepBookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

export default function MultiStepBookingForm({ onSubmit }: MultiStepBookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    startDate: '',
    endDate: '',
    vehicleType: '',
    service: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      onSubmit(formData);
    } else {
      handleNext();
    }
  };

  const isStep1Valid = formData.startDate && formData.endDate;
  const isStep2Valid = formData.vehicleType && formData.service;
  const isStep3Valid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-8 bg-white">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNum
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-yellow-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Reisedaten */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1 · Reisedaten</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startdatum
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enddatum
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Fahrzeug & Service */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2 · Fahrzeug & Service</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fahrzeugtyp
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  <option value="">Wählen Sie einen Fahrzeugtyp</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="sports">Sportwagen</option>
                  <option value="luxury">Luxusfahrzeug</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  <option value="">Wählen Sie einen Service</option>
                  <option value="freifläche">Freifläche - €10/Tag</option>
                  <option value="parkhaus">Parkhaus - €15/Tag</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Persönliche Daten */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3 · Persönliche Daten</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vorname
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Zurück
            </Button>

            <Button
              type="submit"
              className={`flex items-center gap-2 ${
                step === 3
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-white'
              }`}
            >
              {step === 3 ? (
                <>
                  Zur Zahlung
                  <ChevronRight size={20} />
                </>
              ) : (
                <>
                  Weiter
                  <ChevronRight size={20} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

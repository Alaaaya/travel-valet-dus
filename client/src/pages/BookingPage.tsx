import React, { useState } from 'react';
import { toast } from 'sonner';
import MultiStepBookingForm from '@/components/MultiStepBookingForm';
import { trpc } from '@/lib/trpc';

interface BookingFormData {
  startDate: string;
  endDate: string;
  vehicleType: string;
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookingPage() {

  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutMutation = trpc.payment.createCheckoutSession.useMutation();

  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const getServicePrice = (service: string): number => {
    return service === 'freifläche' ? 10 : 15; // in euros
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    try {
      setIsLoading(true);

      const days = calculateDays(data.startDate, data.endDate);
      const pricePerDay = getServicePrice(data.service);
      const totalPrice = days * pricePerDay;

      const serviceName = data.service === 'freifläche' 
        ? 'Freifläche Parkplatz' 
        : 'Parkhaus Service';

      // Create checkout session
      const result = await createCheckoutMutation.mutateAsync({
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        serviceName: serviceName,
        serviceType: data.service,
        days: days,
      });

      if (result?.url) {
        // Redirect to Stripe checkout
        window.open(result.url, '_blank');
        toast.success('Weiterleitung zur Zahlungsseite...');
      } else {
        toast.error('Fehler beim Erstellen der Zahlungssitzung');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Fehler beim Verarbeiten der Buchung');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buchen Sie Ihren Parkplatz
          </h1>
          <p className="text-lg text-gray-600">
            Folgen Sie den Schritten, um Ihre Reservierung abzuschließen
          </p>
        </div>

        <MultiStepBookingForm 
          onSubmit={handleBookingSubmit}
        />

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <p className="text-lg font-semibold">Verarbeitung läuft...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

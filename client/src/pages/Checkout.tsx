import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const SERVICES = {
  freifläche: {
    name: 'Freifläche (Open Parking)',
    emoji: '🅿️',
    description: 'Secure open-air parking at the airport',
  },
  parkhaus: {
    name: 'Parkhaus (Covered Parking)',
    emoji: '🏢',
    description: 'Climate-controlled covered parking',
  },
  reinigung: {
    name: 'Reinigung (Car Wash)',
    emoji: '🧼',
    description: 'Professional car washing service',
  },
};

export default function Checkout() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [serviceType, setServiceType] = useState<string>('');
  const [days, setDays] = useState<number>(1);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get pricing
  const { data: pricingData } = trpc.pricing.getAll.useQuery();

  // Create checkout session mutation
  const createCheckoutMutation = trpc.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, '_blank');
        toast.success('Redirecting to payment page...');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create checkout session');
      setIsProcessing(false);
    },
  });

  // Get service details
  const service = serviceType ? SERVICES[serviceType as keyof typeof SERVICES] : null;
  const pricing = serviceType ? pricingData?.find((p: any) => p.serviceType === serviceType) : null;
  const pricePerDay = pricing ? pricing.pricePerDay / 100 : 0;
  const totalPrice = pricePerDay * days;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    if (!serviceType || !customerName || !customerEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      await createCheckoutMutation.mutateAsync({
        serviceType,
        serviceName: service?.name || '',
        days,
        customerName,
        customerEmail,
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your booking and payment</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </CardTitle>
            <CardDescription className="text-blue-100">
              Secure payment powered by Stripe
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Service Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Service</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(SERVICES).map(([key, svc]) => (
                  <button
                    key={key}
                    onClick={() => setServiceType(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      serviceType === key
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{svc.emoji}</div>
                    <div className="font-semibold text-sm">{svc.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{svc.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            {service && pricing && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">€{pricePerDay.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">per day</p>
                  </div>
                </div>

                {/* Days Selection */}
                <div className="space-y-2">
                  <Label htmlFor="days" className="text-sm">Number of Days</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDays(Math.max(1, days - 1))}
                      disabled={days <= 1}
                    >
                      −
                    </Button>
                    <Input
                      id="days"
                      type="number"
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                      min="1"
                      max="30"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDays(Math.min(30, days + 1))}
                      disabled={days >= 30}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-gray-900">Your Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  disabled={isProcessing}
                />
              </div>
            </div>

            {/* Price Summary */}
            {service && pricing && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({days} day{days !== 1 ? 's' : ''}):</span>
                  <span className="font-medium">€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (19%):</span>
                  <span className="font-medium">€{(totalPrice * 0.19).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    €{(totalPrice * 1.19).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                Your payment is secure and encrypted. We use industry-standard Stripe payment processing.
              </p>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={!serviceType || isProcessing || createCheckoutMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              {isProcessing || createCheckoutMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
              disabled={isProcessing}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

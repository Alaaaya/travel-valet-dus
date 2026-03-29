import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';

export default function Cancel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16" />
            </div>
            <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
            <CardDescription className="text-amber-100 mt-2">
              Your payment was not completed
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-900">
                Your payment has been cancelled. No charges have been made to your account.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="font-medium text-gray-900">What happened?</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>You cancelled the payment process</li>
                <li>Your payment method was declined</li>
                <li>The session expired</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Need help?</strong> Contact our support team at +49 163 9176557 or via WhatsApp.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Home } from 'lucide-react';

export default function Success() {
  const [, navigate] = useLocation();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get('session_id') || '');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="text-green-100 mt-2">
              Your booking has been confirmed
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Session ID:</p>
              <p className="font-mono text-xs text-gray-900 break-all">{sessionId}</p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment Confirmed</p>
                  <p>Your payment has been processed securely</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Booking Confirmed</p>
                  <p>Check your email for confirmation details</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ready to Go</p>
                  <p>Your service is ready for your arrival</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Next Steps:</strong> A confirmation email has been sent to your registered email address with all booking details and instructions.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

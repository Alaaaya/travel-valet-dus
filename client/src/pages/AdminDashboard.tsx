import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pricing state
  const [freiflächePrice, setFreiflächePrice] = useState('10');
  const [parkhausPrice, setParkhausPrice] = useState('15');
  const [updatingPricing, setUpdatingPricing] = useState(false);

  // Services state
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any>(null);
  const [updatingService, setUpdatingService] = useState(false);

  // Fetch pricing
  const { data: pricingData, isLoading: pricingLoading } = trpc.pricing.getAll.useQuery();

  // Fetch services
  const { data: servicesData, isLoading: servicesLoading } = trpc.services.getAll.useQuery();

  // Update pricing mutation
  const updatePricingMutation = trpc.pricing.update.useMutation({
    onSuccess: () => {
      setSuccessMessage('تم تحديث السعر بنجاح!');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    onError: (error) => {
      setErrorMessage(error.message || 'حدث خطأ في تحديث السعر');
      setTimeout(() => setErrorMessage(''), 3000);
    },
  });

  // Update service mutation
  const updateServiceMutation = trpc.services.update.useMutation({
    onSuccess: () => {
      setSuccessMessage('تم تحديث الخدمة بنجاح!');
      setEditingService(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    onError: (error) => {
      setErrorMessage(error.message || 'حدث خطأ في تحديث الخدمة');
      setTimeout(() => setErrorMessage(''), 3000);
    },
  });

  // Load pricing data
  useEffect(() => {
    if (pricingData) {
      const freifläche = pricingData.find((p: any) => p.serviceType === 'freifläche');
      const parkhaus = pricingData.find((p: any) => p.serviceType === 'parkhaus');
      
      if (freifläche) setFreiflächePrice((freifläche.pricePerDay / 100).toString());
      if (parkhaus) setParkhausPrice((parkhaus.pricePerDay / 100).toString());
    }
  }, [pricingData]);

  // Load services data
  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
    }
  }, [servicesData]);

  // Check authorization
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <Card className="w-full max-w-md border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              غير مصرح
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              عذراً، أنت لا تملك صلاحيات الوصول إلى لوحة التحكم. يرجى التواصل مع المسؤول.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdatePricing = async (serviceType: string, price: string) => {
    setUpdatingPricing(true);
    try {
      await updatePricingMutation.mutateAsync({
        serviceType,
        pricePerDay: Math.round(parseFloat(price) * 100),
      });
    } finally {
      setUpdatingPricing(false);
    }
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    
    setUpdatingService(true);
    try {
      await updateServiceMutation.mutateAsync({
        id: editingService.id,
        name: editingService.name,
        emoji: editingService.emoji,
        description: editingService.description,
        price: editingService.price ? Math.round(editingService.price * 100) : undefined,
        isActive: editingService.isActive ? 1 : 0,
      });
    } finally {
      setUpdatingService(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً {user.name}، إدارة الأسعار والخدمات</p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            {errorMessage}
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pricing">الأسعار</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
          </TabsList>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الأسعار</CardTitle>
                <CardDescription>قم بتحديث أسعار الخدمات المختلفة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pricingLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6" />
                  </div>
                ) : (
                  <>
                    {/* Freifläche */}
                    <div className="space-y-2">
                      <Label htmlFor="freifläche">سعر الفراغ المفتوح (Freifläche) - باليورو</Label>
                      <div className="flex gap-2">
                        <Input
                          id="freifläche"
                          type="number"
                          step="0.01"
                          value={freiflächePrice}
                          onChange={(e) => setFreiflächePrice(e.target.value)}
                          className="flex-1"
                          disabled={updatingPricing}
                        />
                        <Button
                          onClick={() => handleUpdatePricing('freifläche', freiflächePrice)}
                          disabled={updatingPricing || pricingLoading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {updatingPricing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'تحديث'}
                        </Button>
                      </div>
                    </div>

                    {/* Parkhaus */}
                    <div className="space-y-2">
                      <Label htmlFor="parkhaus">سعر المرآب (Parkhaus) - باليورو</Label>
                      <div className="flex gap-2">
                        <Input
                          id="parkhaus"
                          type="number"
                          step="0.01"
                          value={parkhausPrice}
                          onChange={(e) => setParkhausPrice(e.target.value)}
                          className="flex-1"
                          disabled={updatingPricing}
                        />
                        <Button
                          onClick={() => handleUpdatePricing('parkhaus', parkhausPrice)}
                          disabled={updatingPricing || pricingLoading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {updatingPricing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'تحديث'}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الخدمات</CardTitle>
                <CardDescription>قم بتحديث تفاصيل الخدمات المتاحة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {servicesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6" />
                  </div>
                ) : (
                  <>
                    {services.map((service) => (
                      <Card key={service.id} className="bg-gray-50">
                        <CardContent className="pt-6">
                          {editingService?.id === service.id ? (
                            <div className="space-y-4">
                              <div>
                                <Label>الاسم</Label>
                                <Input
                                  value={editingService.name}
                                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                  disabled={updatingService}
                                />
                              </div>
                              <div>
                                <Label>الرمز (Emoji)</Label>
                                <Input
                                  value={editingService.emoji}
                                  onChange={(e) => setEditingService({ ...editingService, emoji: e.target.value })}
                                  disabled={updatingService}
                                  maxLength={2}
                                />
                              </div>
                              <div>
                                <Label>الوصف</Label>
                                <Input
                                  value={editingService.description}
                                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                  disabled={updatingService}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleUpdateService}
                                  disabled={updatingService}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {updatingService ? <Loader2 className="w-4 h-4 animate-spin" /> : 'حفظ'}
                                </Button>
                                <Button
                                  onClick={() => setEditingService(null)}
                                  disabled={updatingService}
                                  variant="outline"
                                >
                                  إلغاء
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-semibold">
                                  {service.emoji} {service.name}
                                </p>
                                <p className="text-sm text-gray-600">{service.description}</p>
                              </div>
                              <Button
                                onClick={() => setEditingService(service)}
                                variant="outline"
                              >
                                تعديل
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

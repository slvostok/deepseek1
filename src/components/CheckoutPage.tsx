import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { CheckCircle2, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { DeliverySelector } from './DeliverySelector';
import { PaymentSelector } from './PaymentSelector';

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'info' | 'delivery' | 'payment'>('info');
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    comment: '',
  });

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const handleNextStep = () => {
    if (step === 'info') {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.city) {
        toast.error('Пожалуйста, заполните все обязательные поля');
        return;
      }
      setStep('delivery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'delivery') {
      if (!deliveryInfo) {
        toast.error('Пожалуйста, выберите способ доставки');
        return;
      }
      setStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step === 'payment') {
      setStep('delivery');
    } else if (step === 'delivery') {
      setStep('info');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeliverySelect = (delivery: any) => {
    setDeliveryInfo(delivery);
  };

  const handleSubmit = async () => {
    if (!paymentMethod) {
      toast.error('Пожалуйста, выберите способ оплаты');
      return;
    }

    setSubmitting(true);

    try {
      // Используем цену доставки из выбранного варианта
      const deliveryCost = deliveryInfo.option.price;
      const total = totalPrice + deliveryCost;

      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          comment: formData.comment,
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        totalAmount: total,
        deliveryInfo: deliveryInfo,
        paymentMethod: paymentMethod,
      };

      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { order } = await response.json();

      // Если выбрана онлайн-оплата, создаем платеж
      if (paymentMethod === 'card' || paymentMethod === 'sbp' || paymentMethod === 'yoomoney') {
        const paymentResponse = await fetch(`${API_URL}/payment/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            orderId: order.id,
            amount: total,
            description: `Заказ #${order.id.slice(0, 8)}`,
            paymentMethod: paymentMethod,
            customerEmail: formData.email,
          }),
        });

        if (!paymentResponse.ok) {
          throw new Error('Failed to create payment');
        }

        const { confirmationUrl } = await paymentResponse.json();

        // Перенаправляем на страницу оплаты
        window.location.href = confirmationUrl;
        return;
      }

      // Для оплаты при получении просто показываем успех
      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Заказ успешно оформлен!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="w-24 h-24 mx-auto mb-6 text-[#D4AF37]" />
          <h1 className="text-4xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            Заказ оформлен!
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Спасибо за ваш заказ. Мы отправили подтверждение на ваш email.
          </p>
          <div className="bg-[#1A1F3A] rounded-lg p-6 mb-8">
            <h3 className="text-lg mb-4 text-[#D4AF37]">Что дальше?</h3>
            <ul className="text-left space-y-3 text-white/70">
              <li>• Мы свяжемся с вами в течение 24 часов для подтверждения</li>
              <li>• Доставка осуществляется в течение {deliveryInfo?.option?.deliveryDays || '3-7 дней'}</li>
              <li>• Вы получите трек-номер для отслеживания посылки</li>
            </ul>
          </div>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const deliveryCost = deliveryInfo?.option?.price || 0;
  const total = totalPrice + deliveryCost;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
        Оформление заказа
      </h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step === 'info' ? 'text-[#D4AF37]' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === 'info' ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/40'
            }`}>
              1
            </div>
            <span className="hidden sm:inline">Контакты</span>
          </div>
          <div className="w-12 h-0.5 bg-white/20" />
          <div className={`flex items-center gap-2 ${step === 'delivery' ? 'text-[#D4AF37]' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === 'delivery' ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/40'
            }`}>
              2
            </div>
            <span className="hidden sm:inline">Доставка</span>
          </div>
          <div className="w-12 h-0.5 bg-white/20" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#D4AF37]' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === 'payment' ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/40'
            }`}>
              3
            </div>
            <span className="hidden sm:inline">Оплата</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Contact Information */}
          {step === 'info' && (
            <div className="space-y-6">
              <div className="bg-[#1A1F3A] rounded-lg p-6">
                <h2 className="text-2xl mb-6 text-[#D4AF37]">Контактная информация</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Полное имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (999) 123-45-67"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Москва"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-black border border-white/20 text-white rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="Пожелания по доставке или другая информация"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNextStep}
                size="lg"
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
              >
                Продолжить
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 'delivery' && (
            <div className="space-y-6">
              <DeliverySelector
                city={formData.city}
                totalPrice={totalPrice}
                onSelect={handleDeliverySelect}
              />

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Назад
                </Button>
                <Button
                  onClick={handleNextStep}
                  size="lg"
                  disabled={!deliveryInfo}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
                >
                  Продолжить
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <PaymentSelector
                amount={total}
                onSelect={setPaymentMethod}
                selectedMethod={paymentMethod}
              />

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Назад
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={!paymentMethod || submitting}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
                >
                  {submitting ? 'Обработка...' : 'Оплатить'}
                  <CreditCard className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1F3A] rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl mb-6 text-[#D4AF37]">Ваш заказ</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.name}</p>
                    <p className="text-xs text-white/60">
                      Размер: {item.size} × {item.quantity}
                    </p>
                    <p className="text-sm text-[#D4AF37]">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-white/60">
                <span>Товары:</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Доставка:</span>
                <span>
                  {deliveryCost === 0 
                    ? step === 'info' 
                      ? 'Рассчитается позже' 
                      : 'Бесплатно' 
                    : `${deliveryCost.toLocaleString('ru-RU')} ₽`}
                </span>
              </div>
              {deliveryInfo && (
                <div className="text-xs text-white/40 pl-4">
                  {deliveryInfo.option.name}
                </div>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                <span>Итого:</span>
                <span className="text-[#D4AF37]">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

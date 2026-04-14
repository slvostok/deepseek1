import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { CheckCircle2, Gift, Mail, Sparkles, Copy, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function PreOrderPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (items.length === 0 && !submitted) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePromoCode = () => {
    // Генерируем уникальный промокод
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `АЗЬ20-${timestamp.slice(-4)}-${random}`;
  };

  const handleSubmit = async () => {
    // Валидация
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Пожалуйста, введите корректный email');
      return;
    }

    if (!agreedToPrivacy) {
      toast.error('Пожалуйста, согласитесь с политикой конфиденциальности');
      return;
    }

    setSubmitting(true);

    try {
      const generatedPromoCode = generatePromoCode();

      const preOrderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        totalAmount: totalPrice,
        promoCode: generatedPromoCode,
        discount: 20, // 20% скидка
        status: 'pre-order',
      };

      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;
      const response = await fetch(`${API_URL}/pre-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(preOrderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Pre-order creation error:', errorData);
        throw new Error('Failed to create pre-order');
      }

      setPromoCode(generatedPromoCode);
      setSubmitted(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Предзаказ успешно оформлен!');
    } catch (error) {
      console.error('Error creating pre-order:', error);
      toast.error('Произошла ошибка. Пожалуйста, попробуйте снова.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast.success('Промокод скопирован!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D4AF37]/10 mb-6">
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37]" />
              </div>
              <h1 className="text-5xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                Спасибо за интерес!
              </h1>
              <p className="text-xl text-white/70">
                Ваш предзаказ успешно зарегистрирован
              </p>
            </div>

            {/* Promo Code Card */}
            <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#C41E3A]/10 border-2 border-[#D4AF37] rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-[#D4AF37]" />
                <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                  Ваш подарок
                </h2>
              </div>
              
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                Мы дарим вам персональный промокод на <span className="text-[#D4AF37] font-bold">20% скидку</span> при запуске коллекции!
              </p>

              <div className="bg-black/50 rounded-xl p-6 border border-[#D4AF37]/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-white/60 mb-2">Ваш промокод:</p>
                    <p className="text-3xl font-mono text-[#D4AF37] tracking-wider">
                      {promoCode}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyPromoCode}
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Скопировано
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Копировать
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1A1F3A] rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-3">
                  <Mail className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>
                      Уведомление на email
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Мы отправим вам письмо, как только коллекция будет доступна для заказа. 
                      Проверьте папку "Спам", если не найдете письмо в основной.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1F3A] rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>
                      Эксклюзивный доступ
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Вы будете среди первых, кто узнает о запус��е коллекции. 
                      Используйте промокод при оформлении первого заказа.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-order Summary */}
            <div className="bg-[#1A1F3A] rounded-xl p-6 mb-8 border border-white/10">
              <h3 className="text-xl text-[#D4AF37] mb-4" style={{ fontFamily: 'serif' }}>
                Ваш предзаказ
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-white">{item.name}</p>
                      <p className="text-sm text-white/60">
                        Размер: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-white/80">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Сумма предзаказа:</span>
                  <span className="text-white">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-[#D4AF37]">Со скидкой 20%:</span>
                  <span className="text-[#D4AF37] font-bold">
                    {Math.round(totalPrice * 0.8).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-black/30 rounded-xl p-6 mb-8 border border-white/10">
              <h3 className="text-lg text-white/80 mb-3">Ваши контактные данные:</h3>
              <div className="space-y-2 text-white/60">
                <p>📧 Email: <span className="text-white">{formData.email}</span></p>
                <p>📱 Телефон: <span className="text-white">{formData.phone}</span></p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold mb-4"
              >
                Вернуться на главную
              </Button>
              <p className="text-sm text-white/50">
                Следите за обновлениями в наших социальных сетях
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
              Предзаказ
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Все товары нашей коллекции пока доступны по предзаказу
            </p>
          </div>

          {/* Pre-order Notice */}
          <div className="bg-gradient-to-r from-[#1A1F3A] to-[#C41E3A]/20 border-l-4 border-[#D4AF37] rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: 'serif' }}>
                  Получите эксклюзивное предложение
                </h2>
                <div className="space-y-3 text-white/80 text-lg leading-relaxed">
                  <p>
                    ✨ Мы готовим к выпуску первую коллекцию бренда <span className="text-[#D4AF37] font-bold">«Азь Есьм»</span>
                  </p>
                  <p>
                    📧 Оставьте свой email, и мы отправим вам уведомление, когда товары будут доступны для заказа
                  </p>
                  <p className="text-[#D4AF37] font-semibold text-xl">
                    🎁 В подарок — промокод на скидку 20% при запуске коллекции!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#1A1F3A] rounded-lg p-8 border border-white/10">
                <h2 className="text-2xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                  Оставьте ваши контакты
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white/80">Ваше имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Иван Иванов"
                      className="bg-black border-white/20 text-white mt-2 h-12 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white/80">Email для уведомлений *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ivan@example.com"
                      className="bg-black border-white/20 text-white mt-2 h-12 text-lg"
                    />
                    <p className="text-sm text-white/50 mt-2">
                      Мы пришлем вам письмо, когда коллекция будет готова
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white/80">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (999) 123-45-67"
                      className="bg-black border-white/20 text-white mt-2 h-12 text-lg"
                    />
                  </div>

                  <div className="flex items-start gap-3 space-y-0">
                    <Checkbox
                      id="privacy"
                      checked={agreedToPrivacy}
                      onCheckedChange={setAgreedToPrivacy}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-white/80 leading-relaxed cursor-pointer">
                      Я согласен с{' '}
                      <Link to="/privacy-policy" className="text-[#D4AF37] hover:text-[#D4AF37]/80 underline">
                        политикой обработки персональных данных
                      </Link>{' '}
                      и даю согласие на обработку моих персональных данных
                    </Label>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold text-lg h-14"
                  >
                    {submitting ? (
                      'Оформление...'
                    ) : (
                      <>
                        <Gift className="w-6 h-6 mr-2" />
                        Получить промокод 20%
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-white/50 text-center">
                    Нажимая кнопку, вы соглашаетесь на получение уведомлений о запуске коллекции
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10 sticky top-24">
                <h2 className="text-xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                  Ваш предзаказ
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm mb-1 truncate">{item.name}</p>
                        <p className="text-xs text-white/60">
                          {item.size} × {item.quantity}
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
                    <span>Сумма:</span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>Скидка 20%:</span>
                    <span>−{Math.round(totalPrice * 0.2).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                    <span>Со скидкой:</span>
                    <span className="text-[#D4AF37] font-bold">
                      {Math.round(totalPrice * 0.8).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                  <p className="text-xs text-white/60 text-center leading-relaxed">
                    Это предварительная сумма со скидкой. Окончательная цена будет указана при оформлении заказа.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
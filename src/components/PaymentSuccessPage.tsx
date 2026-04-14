import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const isTest = searchParams.get('test');

  useEffect(() => {
    // Можно отправить событие в аналитику
    console.log('Payment success for order:', orderId);
  }, [orderId]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle2 className="w-24 h-24 mx-auto mb-6 text-[#D4AF37]" />
        
        <h1 className="text-4xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
          Оплата прошла успешно!
        </h1>
        
        <p className="text-xl text-white/70 mb-8">
          Спасибо за ваш заказ{orderId && ` #${orderId.slice(0, 8)}`}. <br />
          Мы отправили подтверждение на ваш email.
        </p>

        {isTest && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-8">
            <p className="text-yellow-400 text-sm">
              ⚠️ Это тестовый платеж. Реальное списание средств не произошло.
            </p>
          </div>
        )}

        <div className="bg-[#1A1F3A] rounded-lg p-6 mb-8">
          <h3 className="text-lg mb-4 text-[#D4AF37]">Что дальше?</h3>
          <ul className="text-left space-y-3 text-white/70">
            <li>✅ Ваш платеж успешно обработан</li>
            <li>📧 Мы отправили чек на вашу электронную почту</li>
            <li>📦 Мы свяжемся с вами в течение 24 часов для подтверждения</li>
            <li>🚚 Доставка осуществляется в течение 3-7 рабочих дней</li>
            <li>📱 Вы получите трек-номер для отслеживания посылки</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
          >
            Вернуться на главную
          </Button>
          <Button
            onClick={() => navigate('/shop')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Продолжить покупки
          </Button>
        </div>
      </div>
    </div>
  );
}

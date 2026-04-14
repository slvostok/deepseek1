import { CreditCard, Smartphone, Wallet, Banknote } from 'lucide-react';

interface PaymentSelectorProps {
  amount: number;
  onSelect: (method: string) => void;
  selectedMethod: string;
}

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Банковская карта',
    description: 'Visa, Mastercard, МИР',
    icon: CreditCard,
    color: '#4A90E2',
    badge: 'Безопасно',
  },
  {
    id: 'sbp',
    name: 'СБП (Система быстрых платежей)',
    description: 'Мгновенный перевод по QR-коду',
    icon: Smartphone,
    color: '#5856D6',
    badge: 'Без комиссии',
  },
  {
    id: 'yoomoney',
    name: 'ЮMoney',
    description: 'Электронный кошелек',
    icon: Wallet,
    color: '#8E24AA',
    badge: null,
  },
  {
    id: 'cash',
    name: 'Оплата при получении',
    description: 'Наличными или картой курьеру',
    icon: Banknote,
    color: '#43A047',
    badge: 'Популярно',
  },
];

export function PaymentSelector({ amount, onSelect, selectedMethod }: PaymentSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Выберите способ оплаты</h3>

      <div className="grid gap-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`bg-[#1A1F3A] rounded-lg p-4 border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: method.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: method.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white">{method.name}</h4>
                    {method.badge && (
                      <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60">{method.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]'
                        : 'border-white/40'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-black" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment Info */}
      <div className="bg-[#1A1F3A]/50 rounded-lg p-4 border border-white/10">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🔒</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1">Безопасная оплата через ЮKassa</h4>
            <p className="text-xs text-white/60">
              Все платежи защищены по стандарту PCI DSS. Мы не храним данные ваших карт.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Payment Details */}
      {selectedMethod === 'card' && (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
          <p className="text-sm text-blue-400">
            После нажатия "Оплатить" вы будете перенаправлены на защищенную страницу ЮKassa для ввода данных карты.
          </p>
        </div>
      )}

      {selectedMethod === 'sbp' && (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4">
          <p className="text-sm text-purple-400">
            Вам будет показан QR-код для оплаты через мобильное приложение вашего банка. Без комиссии!
          </p>
        </div>
      )}

      {selectedMethod === 'yoomoney' && (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4">
          <p className="text-sm text-purple-400">
            Вы будете перенаправлены на сайт ЮMoney для подтверждения платежа.
          </p>
        </div>
      )}

      {selectedMethod === 'cash' && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <p className="text-sm text-green-400">
            Вы сможете оплатить заказ наличными или картой при получении. Курьер предоставит чек.
          </p>
        </div>
      )}

      {/* Amount Summary */}
      <div className="bg-[#1A1F3A] rounded-lg p-4 border border-[#D4AF37]">
        <div className="flex items-center justify-between">
          <span className="text-white/60">К оплате:</span>
          <span className="text-3xl font-bold text-[#D4AF37]">
            {amount.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
}

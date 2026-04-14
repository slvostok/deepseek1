import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, Save, CreditCard, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PaymentSettingsData {
  enabled: boolean;
  yukassaShopId: string;
  yukassaSecretKey: string;
}

export function PaymentSettings() {
  const [settings, setSettings] = useState<PaymentSettingsData>({
    enabled: false,
    yukassaShopId: '',
    yukassaSecretKey: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/payment/settings`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSettings({
          enabled: data.enabled || false,
          yukassaShopId: data.yukassaShopId || '',
          yukassaSecretKey: '', // Не получаем секретный ключ с сервера
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек оплаты:', error);
      setMessage({ type: 'error', text: 'Не удалось загрузить настройки' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/payment/settings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }

      setMessage({ type: 'success', text: 'Настройки успешно сохранены!' });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
      setMessage({ type: 'error', text: 'Не удалось сохранить настройки' });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof PaymentSettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Настройки оплаты</h2>
          <p className="text-white/60 text-sm mt-1">
            Интеграция с платежным агрегатором ЮKassa
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Сохранить настройки
            </>
          )}
        </Button>
      </div>

      {message && (
        <Alert
          className={
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500/50 text-green-400'
              : 'bg-red-500/10 border-red-500/50 text-red-400'
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Основные настройки */}
      <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-xl font-bold text-white">ЮKassa (Яндекс.Касса)</h3>
        </div>

        <div className="space-y-6">
          {/* Включить/выключить */}
          <div className="flex items-center justify-between bg-black/30 rounded-lg p-4">
            <div>
              <h4 className="font-bold text-white mb-1">Включить онлайн-оплату</h4>
              <p className="text-sm text-white/60">
                Прием платежей через ЮKassa (карты, СБП, кошельки)
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => updateSetting('enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
            </label>
          </div>

          {/* Shop ID */}
          <div>
            <Label htmlFor="yukassa-shop-id" className="text-white">
              Shop ID (идентификатор магазина)
            </Label>
            <Input
              id="yukassa-shop-id"
              type="text"
              placeholder="123456"
              value={settings.yukassaShopId}
              onChange={(e) => updateSetting('yukassaShopId', e.target.value)}
              className="mt-2 bg-black border-white/20 text-white"
            />
            <p className="text-xs text-white/40 mt-1">
              Найдите в личном кабинете ЮKassa в разделе "Настройки магазина"
            </p>
          </div>

          {/* Secret Key */}
          <div>
            <Label htmlFor="yukassa-secret-key" className="text-white">
              Секретный ключ (Secret Key)
            </Label>
            <Input
              id="yukassa-secret-key"
              type="password"
              placeholder="live_••••••••••••••••"
              value={settings.yukassaSecretKey}
              onChange={(e) => updateSetting('yukassaSecretKey', e.target.value)}
              className="mt-2 bg-black border-white/20 text-white"
            />
            <p className="text-xs text-white/40 mt-1">
              Секретный ключ для API. Хранится в зашифрованном виде.
            </p>
          </div>
        </div>
      </div>

      {/* Способы оплаты */}
      <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Доступные способы оплаты</h3>
        
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-black/30 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Банковские карты</p>
              <p className="text-xs text-white/60">Visa, Mastercard, МИР</p>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-lg">📱</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">СБП</p>
              <p className="text-xs text-white/60">Быстрые платежи</p>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-lg">💳</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">ЮMoney</p>
              <p className="text-xs text-white/60">Электронный кошелек</p>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-lg">💵</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">При получении</p>
              <p className="text-xs text-white/60">Наличными/картой</p>
            </div>
          </div>
        </div>
      </div>

      {/* Инструкция по подключению */}
      <div className="bg-[#1A1F3A]/50 rounded-lg p-6 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-3">📖 Как подключить ЮKassa:</h4>
        <ol className="text-sm text-white/60 space-y-2 list-decimal list-inside">
          <li>
            Зарегистрируйтесь на{' '}
            <a
              href="https://yookassa.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
            >
              yookassa.ru
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>Заполните данные о компании и пройдите модерацию</li>
          <li>В личном кабинете откройте раздел "Настройки" → "Интеграция"</li>
          <li>Скопируйте <strong>Shop ID</strong> и <strong>Секретный ключ</strong></li>
          <li>Вставьте их в поля выше и нажмите "Сохранить"</li>
          <li>
            Настройте webhook URL:{' '}
            <code className="bg-black px-2 py-0.5 rounded text-xs text-[#D4AF37]">
              https://{projectId}.supabase.co/functions/v1/make-server-dfbfad0c/payment/webhook
            </code>
          </li>
        </ol>
      </div>

      {/* Тестовый режим */}
      {!settings.enabled && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="text-sm font-bold text-yellow-400 mb-1">Тестовый режим</h4>
              <p className="text-xs text-yellow-400/80">
                Онлайн-оплата отключена. Покупатели смогут оплатить только при получении.
                Включите интеграцию с ЮKassa для приема онлайн-платежей.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Безопасность */}
      <div className="bg-[#1A1F3A]/50 rounded-lg p-4 border border-white/10">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Безопасность</h4>
            <p className="text-xs text-white/60">
              Секретный ключ хранится в зашифрованном виде на сервере и никогда не передается на фронтенд.
              Все платежи защищены по стандарту PCI DSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

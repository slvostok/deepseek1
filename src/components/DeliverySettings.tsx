import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, Save, Truck, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DeliverySettingsData {
  courierMarkup: number;
  cdekEnabled: boolean;
  boxberryEnabled: boolean;
  dellinEnabled: boolean;
  yandexEnabled: boolean;
  cdekApiKey: string;
  boxberryApiKey: string;
  dellinApiKey: string;
  yandexApiKey: string;
}

export function DeliverySettings() {
  const [settings, setSettings] = useState<DeliverySettingsData>({
    courierMarkup: 0,
    cdekEnabled: true,
    boxberryEnabled: true,
    dellinEnabled: true,
    yandexEnabled: true,
    cdekApiKey: '',
    boxberryApiKey: '',
    dellinApiKey: '',
    yandexApiKey: '',
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
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/delivery/settings`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек доставки:', error);
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
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/delivery/settings`,
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

  const updateSetting = (key: keyof DeliverySettingsData, value: any) => {
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
          <h2 className="text-2xl font-bold text-white">Настройки доставки</h2>
          <p className="text-white/60 text-sm mt-1">
            Управление сервисами доставки и наценками
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

      {/* Наценки */}
      <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-xl font-bold text-white">Наценки и комиссии</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="courier-markup" className="text-white">
              Наценка за курьерскую доставку (₽)
            </Label>
            <Input
              id="courier-markup"
              type="number"
              min="0"
              value={settings.courierMarkup}
              onChange={(e) => updateSetting('courierMarkup', Number(e.target.value))}
              className="mt-2 bg-black border-white/20 text-white"
            />
            <p className="text-xs text-white/40 mt-1">
              Дополнительная плата за курьерскую доставку Яндекс по Москве
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-sm text-white/60">
              💡 <strong>Совет:</strong> Наценка добавляется к базовой стоимости курьерской доставки.
              Например, если базовая стоимость 300₽, а наценка 100₽, клиент заплатит 400₽.
            </p>
          </div>
        </div>
      </div>

      {/* Сервисы доставки */}
      <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-xl font-bold text-white">Сервисы доставки</h3>
        </div>

        <div className="space-y-6">
          {/* СДЭК */}
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="font-bold text-white">СДЭК</h4>
                  <p className="text-xs text-white/60">Доставка до пунктов выдачи</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.cdekEnabled}
                  onChange={(e) => updateSetting('cdekEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
              </label>
            </div>
            <div>
              <Label htmlFor="cdek-key" className="text-white/80 text-sm">
                API ключ (опционально)
              </Label>
              <Input
                id="cdek-key"
                type="password"
                placeholder="Оставьте пустым для тестового режима"
                value={settings.cdekApiKey}
                onChange={(e) => updateSetting('cdekApiKey', e.target.value)}
                className="mt-1 bg-black border-white/20 text-white"
              />
            </div>
          </div>

          {/* Boxberry */}
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📮</span>
                <div>
                  <h4 className="font-bold text-white">Boxberry</h4>
                  <p className="text-xs text-white/60">Постаматы и пункты выдачи</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.boxberryEnabled}
                  onChange={(e) => updateSetting('boxberryEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
              </label>
            </div>
            <div>
              <Label htmlFor="boxberry-key" className="text-white/80 text-sm">
                API ключ (опционально)
              </Label>
              <Input
                id="boxberry-key"
                type="password"
                placeholder="Оставьте пустым для тестового режима"
                value={settings.boxberryApiKey}
                onChange={(e) => updateSetting('boxberryApiKey', e.target.value)}
                className="mt-1 bg-black border-white/20 text-white"
              />
            </div>
          </div>

          {/* Деловые Линии */}
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚛</span>
                <div>
                  <h4 className="font-bold text-white">Деловые Линии</h4>
                  <p className="text-xs text-white/60">Доставка до терминалов</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dellinEnabled}
                  onChange={(e) => updateSetting('dellinEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
              </label>
            </div>
            <div>
              <Label htmlFor="dellin-key" className="text-white/80 text-sm">
                API ключ (опционально)
              </Label>
              <Input
                id="dellin-key"
                type="password"
                placeholder="Оставьте пустым для тестового режима"
                value={settings.dellinApiKey}
                onChange={(e) => updateSetting('dellinApiKey', e.target.value)}
                className="mt-1 bg-black border-white/20 text-white"
              />
            </div>
          </div>

          {/* Яндекс Доставка */}
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🟡</span>
                <div>
                  <h4 className="font-bold text-white">Яндекс Доставка</h4>
                  <p className="text-xs text-white/60">Курьер по Москве</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.yandexEnabled}
                  onChange={(e) => updateSetting('yandexEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
              </label>
            </div>
            <div>
              <Label htmlFor="yandex-key" className="text-white/80 text-sm">
                API ключ (опционально)
              </Label>
              <Input
                id="yandex-key"
                type="password"
                placeholder="Оставьте пустым для тестового режима"
                value={settings.yandexApiKey}
                onChange={(e) => updateSetting('yandexApiKey', e.target.value)}
                className="mt-1 bg-black border-white/20 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="bg-[#1A1F3A]/50 rounded-lg p-4 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-2">📖 Справка по API ключам:</h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• <strong>СДЭК:</strong> Получите ключ на <a href="https://api.cdek.ru" target="_blank" className="text-[#D4AF37] hover:underline">api.cdek.ru</a></li>
          <li>• <strong>Boxberry:</strong> Зарегистрируйтесь на <a href="https://boxberry.ru" target="_blank" className="text-[#D4AF37] hover:underline">boxberry.ru</a></li>
          <li>• <strong>Деловые Линии:</strong> Личный кабинет на <a href="https://dellin.ru" target="_blank" className="text-[#D4AF37] hover:underline">dellin.ru</a></li>
          <li>• <strong>Яндекс:</strong> Подключение через <a href="https://business.go.yandex" target="_blank" className="text-[#D4AF37] hover:underline">Яндекс Go для бизнеса</a></li>
          <li className="pt-2">💡 Без API ключей работает тестовый режим с примерными тарифами</li>
        </ul>
      </div>
    </div>
  );
}

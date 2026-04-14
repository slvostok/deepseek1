import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MapPin, Package, Truck, Clock, Loader2 } from 'lucide-react';
import { PickupPointSelector } from './PickupPointSelector';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DeliveryOption {
  id: string;
  name: string;
  service: 'cdek' | 'boxberry' | 'dellin' | 'yandex';
  type: 'pickup' | 'courier';
  price: number;
  deliveryDays: string;
  description: string;
  logo: string;
}

interface PickupPoint {
  id: string;
  service: string;
  address: string;
  city: string;
  workTime: string;
  lat: number;
  lon: number;
  phone?: string;
}

interface DeliveryInfo {
  option: DeliveryOption;
  pickupPoint?: PickupPoint;
  courierAddress?: string;
}

interface DeliverySelectorProps {
  city: string;
  totalWeight?: number; // в граммах
  totalPrice: number;
  onSelect: (delivery: DeliveryInfo) => void;
}

const DELIVERY_SERVICES = [
  {
    id: 'cdek',
    name: 'СДЭК',
    logo: '📦',
    color: '#00B33C',
  },
  {
    id: 'boxberry',
    name: 'Boxberry',
    logo: '📮',
    color: '#FF6B00',
  },
  {
    id: 'dellin',
    name: 'Деловые Линии',
    logo: '🚛',
    color: '#0066CC',
  },
  {
    id: 'yandex',
    name: 'Яндекс Доставка',
    logo: '🟡',
    color: '#FFCC00',
  },
];

export function DeliverySelector({ city, totalWeight = 500, totalPrice, onSelect }: DeliverySelectorProps) {
  const [loading, setLoading] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DeliveryOption | null>(null);
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [courierAddress, setCourierAddress] = useState('');
  const [error, setError] = useState('');

  // Загрузка вариантов доставки
  useEffect(() => {
    if (city) {
      loadDeliveryOptions();
    }
  }, [city, totalWeight]);

  const loadDeliveryOptions = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/delivery/calculate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            city,
            weight: totalWeight,
            totalPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка расчета доставки');
      }

      const data = await response.json();
      setDeliveryOptions(data.options || []);
    } catch (err) {
      console.error('Ошибка загрузки вариантов доставки:', err);
      setError('Не удалось загрузить варианты доставки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = async (option: DeliveryOption) => {
    setSelectedOption(option);
    setError('');

    if (option.type === 'pickup') {
      // Загружаем пункты выдачи для этого сервиса
      await loadPickupPoints(option.service);
      setShowPickupMap(true);
    } else if (option.type === 'courier') {
      // Курьерская доставка - ничего не делаем, ждем ввода адреса
      setShowPickupMap(false);
    }
  };

  const loadPickupPoints = async (service: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c/delivery/pickup-points`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            service,
            city,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка загрузки пунктов выдачи');
      }

      const data = await response.json();
      setPickupPoints(data.points || []);
    } catch (err) {
      console.error('Ошибка загрузки пунктов выдачи:', err);
      setError('Не удалось загрузить пункты выдачи');
    } finally {
      setLoading(false);
    }
  };

  const handlePickupPointSelect = (point: PickupPoint) => {
    if (selectedOption) {
      onSelect({
        option: selectedOption,
        pickupPoint: point,
      });
      setShowPickupMap(false);
    }
  };

  const handleCourierConfirm = () => {
    if (selectedOption && courierAddress.trim()) {
      onSelect({
        option: selectedOption,
        courierAddress: courierAddress.trim(),
      });
    }
  };

  const getServiceInfo = (serviceId: string) => {
    return DELIVERY_SERVICES.find((s) => s.id === serviceId);
  };

  if (loading && deliveryOptions.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <span className="ml-3 text-white">Загрузка вариантов доставки...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-400">{error}</p>
        <Button onClick={loadDeliveryOptions} className="mt-3" size="sm">
          Попробовать снова
        </Button>
      </div>
    );
  }

  // Показываем карту выбора ПВЗ
  if (showPickupMap && selectedOption) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Выберите пункт выдачи {getServiceInfo(selectedOption.service)?.name}
          </h3>
          <Button
            variant="outline"
            onClick={() => setShowPickupMap(false)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            ← Назад
          </Button>
        </div>
        <PickupPointSelector
          points={pickupPoints}
          onSelect={handlePickupPointSelect}
          city={city}
        />
      </div>
    );
  }

  // Форма ввода адреса для курьера
  if (selectedOption && selectedOption.type === 'courier') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Курьерская доставка {getServiceInfo(selectedOption.service)?.name}
          </h3>
          <Button
            variant="outline"
            onClick={() => setSelectedOption(null)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            ← Назад
          </Button>
        </div>

        <div className="bg-[#1A1F3A] rounded-lg p-6 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{getServiceInfo(selectedOption.service)?.logo}</div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{selectedOption.name}</h4>
              <p className="text-white/60 text-sm mb-2">{selectedOption.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#D4AF37] font-bold text-xl">
                  {selectedOption.price.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-white/60 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedOption.deliveryDays}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="courier-address" className="text-white">
                Адрес доставки
              </Label>
              <Input
                id="courier-address"
                placeholder="Москва, ул. Ленина, д. 1, кв. 10"
                value={courierAddress}
                onChange={(e) => setCourierAddress(e.target.value)}
                className="mt-2 bg-black border-white/20 text-white"
              />
              <p className="text-xs text-white/40 mt-1">
                Укажите полный адрес с индексом, номером дома и квартиры
              </p>
            </div>

            <Button
              onClick={handleCourierConfirm}
              disabled={!courierAddress.trim()}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
            >
              Подтвердить адрес доставки
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Список вариантов доставки
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Выберите способ доставки</h3>

      {deliveryOptions.length === 0 ? (
        <div className="bg-[#1A1F3A] rounded-lg p-8 text-center border border-white/10">
          <Package className="w-12 h-12 mx-auto mb-3 text-white/40" />
          <p className="text-white/60">
            Нет доступных вариантов доставки для города {city}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {deliveryOptions.map((option) => {
            const serviceInfo = getServiceInfo(option.service);
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className="bg-[#1A1F3A] rounded-lg p-4 border border-white/10 hover:border-[#D4AF37] transition-all text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl">{serviceInfo?.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{option.name}</h4>
                        {option.type === 'pickup' ? (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            ПВЗ
                          </span>
                        ) : (
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                            <Truck className="w-3 h-3 inline mr-1" />
                            Курьер
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-2">{option.description}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-white/60 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {option.deliveryDays}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#D4AF37] mb-1">
                      {option.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-xs text-white/40">за доставку</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="bg-[#1A1F3A]/50 rounded-lg p-4 border border-white/10">
        <p className="text-xs text-white/60">
          💡 <strong>Подсказка:</strong> Доставка до пункта выдачи обычно дешевле курьерской
        </p>
      </div>
    </div>
  );
}

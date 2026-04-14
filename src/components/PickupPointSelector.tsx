import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, Phone, Clock, Search, Map as MapIcon, List } from 'lucide-react';

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

interface PickupPointSelectorProps {
  points: PickupPoint[];
  onSelect: (point: PickupPoint) => void;
  city: string;
}

export function PickupPointSelector({ points, onSelect, city }: PickupPointSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return points;
    
    const query = searchQuery.toLowerCase();
    return points.filter(
      (point) =>
        point.address.toLowerCase().includes(query) ||
        point.city.toLowerCase().includes(query)
    );
  }, [points, searchQuery]);

  const handleSelectPoint = (point: PickupPoint) => {
    setSelectedPoint(point);
  };

  const handleConfirm = () => {
    if (selectedPoint) {
      onSelect(selectedPoint);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and View Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Поиск по адресу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black border-white/20 text-white"
          />
        </div>
        <div className="flex gap-2 bg-[#1A1F3A] rounded-lg p-1 border border-white/10">
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#D4AF37] text-black' : 'text-white'}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-[#D4AF37] text-black' : 'text-white'}
          >
            <MapIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="text-sm text-white/60">
        Найдено пунктов выдачи: <span className="text-[#D4AF37] font-bold">{filteredPoints.length}</span>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* List View */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1F3A] rounded-lg border border-white/10 max-h-[500px] overflow-y-auto">
            {filteredPoints.length === 0 ? (
              <div className="p-8 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-white/40" />
                <p className="text-white/60">Пункты выдачи не найдены</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredPoints.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => handleSelectPoint(point)}
                    className={`w-full p-4 text-left transition-all hover:bg-white/5 ${
                      selectedPoint?.id === point.id
                        ? 'bg-[#D4AF37]/20 border-l-4 border-[#D4AF37]'
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          selectedPoint?.id === point.id ? 'text-[#D4AF37]' : 'text-white/60'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white mb-1">{point.address}</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <Clock className="w-3 h-3" />
                            <span>{point.workTime}</span>
                          </div>
                          {point.phone && (
                            <div className="flex items-center gap-2 text-xs text-white/60">
                              <Phone className="w-3 h-3" />
                              <span>{point.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedPoint?.id === point.id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
                            <span className="text-black text-xs font-bold">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-1">
          {viewMode === 'map' ? (
            <div className="bg-[#1A1F3A] rounded-lg border border-white/10 h-[500px] overflow-hidden">
              {/* Yandex Maps Integration */}
              <YandexMapView
                points={filteredPoints}
                selectedPoint={selectedPoint}
                onSelectPoint={handleSelectPoint}
                city={city}
              />
            </div>
          ) : (
            <div className="bg-[#1A1F3A] rounded-lg border border-white/10 h-[500px] flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="w-16 h-16 mx-auto mb-4 text-white/20" />
                <p className="text-white/40">Нажмите кнопку карты для просмотра</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Point Info */}
      {selectedPoint && (
        <div className="bg-[#1A1F3A] rounded-lg p-4 border-2 border-[#D4AF37]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-white mb-2">Выбранный пункт выдачи:</h4>
              <p className="text-white/80 mb-2">{selectedPoint.address}</p>
              <div className="space-y-1 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedPoint.workTime}</span>
                </div>
                {selectedPoint.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{selectedPoint.phone}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={handleConfirm}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold"
            >
              Подтвердить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Компонент Яндекс Карты
function YandexMapView({
  points,
  selectedPoint,
  onSelectPoint,
  city,
}: {
  points: PickupPoint[];
  selectedPoint: PickupPoint | null;
  onSelectPoint: (point: PickupPoint) => void;
  city: string;
}) {
  // В реальном приложении здесь будет интеграция с Яндекс.Картами
  // Для прототипа показываем упрощенную версию
  
  const centerLat = points.length > 0 ? points[0].lat : 55.75;
  const centerLon = points.length > 0 ? points[0].lon : 37.62;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1A1F3A] to-black">
      {/* Placeholder для карты */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <MapIcon className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
          <h4 className="text-white font-bold mb-2">Интерактивная карта</h4>
          <p className="text-white/60 text-sm mb-4">
            Здесь будет Яндекс.Карта с метками пунктов выдачи
          </p>
          <div className="bg-black/50 rounded-lg p-4 inline-block">
            <p className="text-xs text-white/40 mb-2">Для подключения добавьте в index.html:</p>
            <code className="text-xs text-[#D4AF37] block">
              {'<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>'}
            </code>
          </div>
        </div>
      </div>

      {/* Метки на упрощенной карте */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-lg p-3 max-h-48 overflow-y-auto">
        <h5 className="text-white text-sm font-bold mb-2">Пункты на карте ({points.length}):</h5>
        <div className="space-y-1">
          {points.slice(0, 5).map((point, idx) => (
            <button
              key={point.id}
              onClick={() => onSelectPoint(point)}
              className={`w-full text-left text-xs p-2 rounded transition-colors ${
                selectedPoint?.id === point.id
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              📍 {point.address}
            </button>
          ))}
          {points.length > 5 && (
            <p className="text-xs text-white/40 pt-1">
              +{points.length - 5} ещё...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

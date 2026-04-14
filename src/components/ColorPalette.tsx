import { Check } from 'lucide-react';
import { useState } from 'react';

export function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (color: string, name: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const primaryColors = [
    { name: 'Черный', hex: '#000000', rgb: '0, 0, 0', description: 'Основной цвет, глубина, сила' },
    { name: 'Белый', hex: '#FFFFFF', rgb: '255, 255, 255', description: 'Чистота, свет, надежда' },
    { name: 'Кремовый', hex: '#F5F5DC', rgb: '245, 245, 220', description: 'Теплота, естественность' },
    { name: 'Темно-синий', hex: '#1A1F3A', rgb: '26, 31, 58', description: 'Зимняя глубина, спокойствие' },
  ];

  const accentColors = [
    { name: 'Красный', hex: '#C41E3A', rgb: '196, 30, 58', description: 'Сила, страсть, энергия' },
    { name: 'Золото', hex: '#D4AF37', rgb: '212, 175, 55', description: 'Духовность, ценность' },
  ];

  const ColorCard = ({ color }: { color: typeof primaryColors[0] }) => (
    <div className="bg-black/30 border border-white/10 rounded-sm overflow-hidden hover:border-white/30 transition-colors">
      <div
        className="h-40 relative cursor-pointer group"
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.hex, color.name)}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          {copiedColor === color.name ? (
            <div className="bg-white text-black px-4 py-2 rounded-sm flex items-center gap-2">
              <Check size={16} />
              <span className="text-sm">Скопировано</span>
            </div>
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-4 py-2 rounded-sm text-sm">
              Нажмите, чтобы скопировать
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-white mb-2">{color.name}</h3>
        <div className="space-y-2 text-sm">
          <p className="text-white/80 font-mono">{color.hex}</p>
          <p className="text-white/60 font-mono">RGB: {color.rgb}</p>
          <p className="text-white/50 text-xs mt-3 italic">{color.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ЦВЕТОВАЯ ПАЛИТРА
          </h2>
          <div className="h-px w-24 bg-[#C41E3A] mx-auto mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Минимализм с "зимними" оттенками. Цвета отражают философию бренда: 
            от темноты к свету, от земного к духовному.
          </p>
        </div>

        {/* Primary Colors */}
        <div className="mb-16">
          <h3 className="text-2xl text-white mb-8 tracking-wide">Основные цвета</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryColors.map((color) => (
              <ColorCard key={color.name} color={color} />
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="mb-16">
          <h3 className="text-2xl text-white mb-8 tracking-wide">Акцентные цвета</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {accentColors.map((color) => (
              <ColorCard key={color.name} color={color} />
            ))}
          </div>
        </div>

        {/* Color Usage */}
        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 border border-white/10 rounded-sm">
          <h3 className="text-2xl text-white mb-8 tracking-wide">Правила использования</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg text-white mb-4">Основа</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Черный и белый — основа всех коллекций (80% изделий)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Кремовый и темно-синий — дополнительные базовые цвета</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-white mb-4">Акценты</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#C41E3A] mt-1">•</span>
                  <span>Красный — для деталей, вышивки, ключевых элементов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C41E3A] mt-1">•</span>
                  <span>Золото — для премиум линии, символики, отделки</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

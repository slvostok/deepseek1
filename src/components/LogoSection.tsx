import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function LogoSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-8 py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl w-full">
        <div className="mb-16">
          <h2 className="text-5xl mb-4">Логотип</h2>
          <p className="text-gray-400 max-w-2xl">
            Руководство по использованию логотипа бренда Азь Езьм
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Основной логотип */}
          <div className="bg-white rounded-2xl p-12 flex items-center justify-center aspect-square">
            <div className="w-64 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl text-black mb-2">АЗЬ</div>
                <div className="text-6xl text-black">ЕЗЬМ</div>
              </div>
            </div>
          </div>

          {/* Темный вариант */}
          <div className="bg-black border border-gray-800 rounded-2xl p-12 flex items-center justify-center aspect-square">
            <div className="w-64 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl text-white mb-2">АЗЬ</div>
                <div className="text-6xl text-white">ЕЗЬМ</div>
              </div>
            </div>
          </div>

          {/* Минимальный размер */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12">
            <h3 className="text-xl mb-8">Минимальный размер</h3>
            <div className="flex items-center gap-8">
              <div className="bg-white rounded-lg p-6 inline-block">
                <div className="text-center">
                  <div className="text-2xl text-black">АЗЬ</div>
                  <div className="text-lg text-black">ЕЗЬМ</div>
                </div>
              </div>
              <div>
                <p className="text-gray-300">Минимальная ширина:</p>
                <p className="text-2xl">40px</p>
              </div>
            </div>
          </div>

          {/* Свободное пространство */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12">
            <h3 className="text-xl mb-8">Защитное поле</h3>
            <div className="relative bg-white rounded-lg p-12 inline-block">
              <div className="absolute inset-0 border-4 border-dashed border-red-500 rounded-lg"></div>
              <div className="absolute inset-6 border-2 border-blue-500 rounded-lg"></div>
              <div className="text-center relative z-10">
                <div className="text-4xl text-black">АЗЬ</div>
                <div className="text-3xl text-black">ЕЗЬМ</div>
              </div>
            </div>
            <p className="text-gray-400 mt-6">
              Минимальный отступ = высота буквы "А"
            </p>
          </div>
        </div>

        {/* Правила использования */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-950 to-green-900 border border-green-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-6 h-6 text-green-400" />
              <h3 className="text-xl text-green-100">Правильное использование</h3>
            </div>
            <ul className="space-y-3 text-green-200">
              <li>• Сохраняйте пропорции логотипа</li>
              <li>• Используйте на контрастных фонах</li>
              <li>• Соблюдайте защитное поле</li>
              <li>• Используйте оригинальные цвета</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-950 to-red-900 border border-red-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Copy className="w-6 h-6 text-red-400" />
              <h3 className="text-xl text-red-100">Неправильное использование</h3>
            </div>
            <ul className="space-y-3 text-red-200">
              <li>• Не изменяйте пропорции</li>
              <li>• Не добавляйте эффекты и тени</li>
              <li>• Не размещайте на пёстрых фонах</li>
              <li>• Не меняйте цвета произвольно</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

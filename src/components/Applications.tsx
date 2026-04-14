import { ImageWithFallback } from './figma/ImageWithFallback';

export function Applications() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-8 py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl w-full">
        <div className="mb-16">
          <h2 className="text-5xl mb-4">Применение</h2>
          <p className="text-gray-400 max-w-2xl">
            Примеры использования фирменного стиля на продукции и носителях
          </p>
        </div>

        {/* Одежда */}
        <div className="mb-20">
          <h3 className="text-3xl mb-8 text-gray-300">Одежда</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Худи */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <div className="aspect-[3/4] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllJTIwYmxhY2t8ZW58MXx8fHwxNzU5ODMxMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Hoodie mockup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl mb-2">Худи</h4>
                  <p className="text-gray-400">Логотип на груди и спине</p>
                </div>
              </div>
            </div>

            {/* Футболка */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <div className="aspect-[3/4] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0LXNoaXJ0JTIwbW9ja3VwJTIwYmxhY2t8ZW58MXx8fHwxNzU5ODMxMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="T-shirt mockup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl mb-2">Футболка</h4>
                  <p className="text-gray-400">Центральное размещение</p>
                </div>
              </div>
            </div>

            {/* Свитшот */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <div className="aspect-[3/4] bg-gray-800 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-6xl mb-2">АЗЬ</div>
                  <div className="text-4xl">ЕЗЬМ</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl mb-2">Свитшот</h4>
                  <p className="text-gray-400">Крупный принт</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Аксессуары и упаковка */}
        <div className="mb-20">
          <h3 className="text-3xl mb-8 text-gray-300">Аксессуары и упаковка</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Бирки */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
              <div className="flex flex-wrap gap-6">
                <div className="bg-white rounded-lg p-6 shadow-xl">
                  <div className="text-black text-center mb-4">
                    <div className="text-3xl">АЗЬ</div>
                    <div className="text-2xl">ЕЗЬМ</div>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    RUSSIAN STREETWEAR
                  </div>
                </div>
                <div className="bg-black rounded-lg p-6 shadow-xl border border-gray-700">
                  <div className="text-white text-center mb-4">
                    <div className="text-3xl">АЗЬ</div>
                    <div className="text-2xl">ЕЗЬМ</div>
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    RUSSIAN STREETWEAR
                  </div>
                </div>
              </div>
              <h4 className="text-xl mt-8 mb-2">Бирки и ярлыки</h4>
              <p className="text-gray-400">Фирменные бирки для одежды</p>
            </div>

            {/* Упаковка */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
              <div className="bg-black rounded-lg p-8 border border-gray-600 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">АЗЬ</div>
                  <div className="text-4xl mb-6">ЕЗЬМ</div>
                  <div className="text-xs text-gray-500 tracking-widest">
                    УЛИЧНАЯ ОДЕЖДА
                  </div>
                </div>
              </div>
              <h4 className="text-xl mt-8 mb-2">Упаковка</h4>
              <p className="text-gray-400">Фирменные коробки и пакеты</p>
            </div>
          </div>
        </div>

        {/* Цифровые носители */}
        <div>
          <h3 className="text-3xl mb-8 text-gray-300">Цифровые носители</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Социальные сети */}
            <div className="bg-gradient-to-br from-purple-950 to-purple-900 rounded-2xl p-8 border border-purple-700">
              <div className="bg-black rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">АЗЬ</div>
                  <div className="text-3xl">ЕЗЬМ</div>
                </div>
              </div>
              <h4 className="text-xl mb-2">Социальные сети</h4>
              <p className="text-purple-200">Аватары и посты</p>
            </div>

            {/* Веб-сайт */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-8 border border-blue-700">
              <div className="bg-white rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
                <div className="text-center text-black">
                  <div className="text-4xl mb-2">АЗЬ</div>
                  <div className="text-3xl">ЕЗЬМ</div>
                </div>
              </div>
              <h4 className="text-xl mb-2">Веб-сайт</h4>
              <p className="text-blue-200">Хедер и фавикон</p>
            </div>

            {/* Мобильное приложение */}
            <div className="bg-gradient-to-br from-green-950 to-green-900 rounded-2xl p-8 border border-green-700">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">АЗЬ</div>
                  <div className="text-3xl">ЕЗЬМ</div>
                </div>
              </div>
              <h4 className="text-xl mb-2">Приложение</h4>
              <p className="text-green-200">Иконка и сплэш</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

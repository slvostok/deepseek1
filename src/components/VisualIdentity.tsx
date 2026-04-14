import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function VisualIdentity() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ВИЗУАЛЬНАЯ АЙДЕНТИКА
          </h2>
          <div className="h-px w-24 bg-[#C41E3A] mx-auto"></div>
        </div>

        {/* Logo Section */}
        <div className="mb-24">
          <h3 className="text-2xl text-white mb-12 text-center tracking-wide">
            Логотип
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Logo on Black */}
            <div className="bg-black border border-white/10 p-12 rounded-sm flex flex-col items-center justify-center">
              <img src={logo} alt="Logo on Black" className="h-32 w-auto mb-4" />
              <p className="text-white/50 text-sm">На черном фоне</p>
            </div>

            {/* Logo on White */}
            <div className="bg-white border border-black/10 p-12 rounded-sm flex flex-col items-center justify-center">
              <img src={logo} alt="Logo on White" className="h-32 w-auto mb-4" />
              <p className="text-black/50 text-sm">На белом фоне</p>
            </div>

            {/* Logo on Cream */}
            <div className="bg-[#F5F5DC] border border-black/5 p-12 rounded-sm flex flex-col items-center justify-center">
              <img src={logo} alt="Logo on Cream" className="h-32 w-auto mb-4" />
              <p className="text-black/50 text-sm">На кремовом фоне</p>
            </div>
          </div>

          {/* Logo Description */}
          <div className="bg-white/5 p-8 border border-white/10 rounded-sm max-w-3xl mx-auto">
            <h4 className="text-xl text-white mb-4 tracking-wide">О логотипе</h4>
            <div className="space-y-3 text-white/70">
              <p>
                <strong className="text-white">«А»</strong> — красный треугольник с горизонтальной 
                линией символизирует силу, основу, первоначало («Азъ» — первая буква старославянской азбуки).
              </p>
              <p>
                <strong className="text-white">«Е»</strong> — черная буква олицетворяет 
                «есмь» (быть, существовать).
              </p>
              <p>
                Вместе они образуют философскую формулу: <em className="text-white">«Я ЕСТЬ»</em> — 
                утверждение бытия, осознания себя.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Space & Sizing */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Clear Space */}
          <div className="bg-black/50 p-8 border border-white/10 rounded-sm">
            <h4 className="text-xl text-white mb-6 tracking-wide">Охранное поле</h4>
            <div className="bg-white/5 p-8 rounded-sm relative">
              <div className="absolute inset-0 border-2 border-dashed border-[#C41E3A]/30 m-4 rounded-sm pointer-events-none"></div>
              <img src={logo} alt="Clear Space" className="h-24 w-auto mx-auto" />
            </div>
            <p className="text-white/60 text-sm mt-4">
              Минимальное расстояние вокруг логотипа — высота буквы «А»
            </p>
          </div>

          {/* Minimum Size */}
          <div className="bg-black/50 p-8 border border-white/10 rounded-sm">
            <h4 className="text-xl text-white mb-6 tracking-wide">Минимальный размер</h4>
            <div className="bg-white/5 p-8 rounded-sm flex items-center justify-center">
              <img src={logo} alt="Minimum Size" className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm mt-4">
              Минимальная высота логотипа: <strong className="text-white">24px</strong> (цифровые носители), 
              <strong className="text-white"> 15мм</strong> (печать)
            </p>
          </div>
        </div>

        {/* Don'ts */}
        <div className="mt-12 bg-gradient-to-br from-[#C41E3A]/10 to-transparent p-8 border border-[#C41E3A]/20 rounded-sm">
          <h4 className="text-xl text-white mb-6 tracking-wide">Недопустимо</h4>
          <div className="grid md:grid-cols-3 gap-4 text-white/60 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Изменять пропорции логотипа</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Менять цвета элементов</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Добавлять эффекты и тени</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Поворачивать логотип</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Размещать на пестрых фонах</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#C41E3A]">✕</span>
              <span>Использовать с низким контрастом</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

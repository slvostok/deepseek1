export function Typography() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ТИПОГРАФИКА
          </h2>
          <div className="h-px w-24 bg-[#C41E3A] mx-auto"></div>
        </div>

        {/* Main Font */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white/5 to-transparent p-10 border border-white/10 rounded-sm mb-8">
            <p className="text-white/50 mb-4 tracking-widest uppercase text-sm">
              Основной шрифт
            </p>
            <h3 className="text-6xl text-white mb-8">
              АЗЪ ЕСМЬ
            </h3>
            <p className="text-white/70 mb-2">
              Рекомендуемые шрифты (без засечек):
            </p>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Montserrat</strong> — для логотипа и заголовков</li>
              <li>• <strong className="text-white">Inter</strong> — для основного текста</li>
              <li>• <strong className="text-white">PT Sans</strong> — альтернатива с кириллицей</li>
            </ul>
          </div>

          {/* Font Hierarchy */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 p-8 border border-white/10 rounded-sm">
              <h4 className="text-sm text-white/50 mb-6 tracking-widest uppercase">
                Заголовки
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-4xl text-white tracking-wider mb-2">
                    Заголовок H1
                  </p>
                  <p className="text-white/50 text-sm font-mono">48-72px, Medium, Tracking: 0.05em</p>
                </div>
                <div>
                  <p className="text-3xl text-white tracking-wide mb-2">
                    Заголовок H2
                  </p>
                  <p className="text-white/50 text-sm font-mono">36-48px, Medium, Tracking: 0.03em</p>
                </div>
                <div>
                  <p className="text-2xl text-white tracking-wide mb-2">
                    Заголовок H3
                  </p>
                  <p className="text-white/50 text-sm font-mono">24-32px, Medium, Tracking: 0.02em</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 p-8 border border-white/10 rounded-sm">
              <h4 className="text-sm text-white/50 mb-6 tracking-widest uppercase">
                Основной текст
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-lg text-white mb-2">
                    Крупный текст
                  </p>
                  <p className="text-white/50 text-sm font-mono">18-20px, Regular, Line-height: 1.6</p>
                </div>
                <div>
                  <p className="text-white mb-2">
                    Основной текст
                  </p>
                  <p className="text-white/50 text-sm font-mono">16px, Regular, Line-height: 1.6</p>
                </div>
                <div>
                  <p className="text-sm text-white/80 mb-2">
                    Мелкий текст
                  </p>
                  <p className="text-white/50 text-sm font-mono">14px, Regular, Line-height: 1.5</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-2">
                    Подписи
                  </p>
                  <p className="text-white/50 text-sm font-mono">12px, Regular, Line-height: 1.4</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography in Use */}
        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 border border-white/10 rounded-sm">
          <h3 className="text-2xl text-white mb-8 tracking-wide">Примеры использования</h3>
          
          <div className="space-y-12">
            {/* Example 1 - Logo Style */}
            <div className="border-l-2 border-[#C41E3A] pl-8">
              <p className="text-4xl text-white tracking-[0.2em] mb-4">
                АЗЪ ЕСМЬ
              </p>
              <p className="text-white/60 text-sm">
                Логотип: заглавные буквы, широкий межбуквенный интервал (tracking: 0.2em)
              </p>
            </div>

            {/* Example 2 - Tagline */}
            <div className="border-l-2 border-[#D4AF37] pl-8">
              <p className="text-2xl text-white tracking-wide mb-4">
                Одежда для тех, кто есть
              </p>
              <p className="text-white/60 text-sm">
                Слоган: строчные буквы, умеренный tracking, спокойный тон
              </p>
            </div>

            {/* Example 3 - Body Text */}
            <div className="border-l-2 border-white/20 pl-8">
              <p className="text-white/80 leading-relaxed mb-4">
                Это одежда для тех, кто верит, чувствует и существует. Для тех, кто не теряет 
                себя в темные времена, светит в хорошие времена, верит в лучшее будущее для 
                себя и родины.
              </p>
              <p className="text-white/60 text-sm">
                Основной текст: межстрочный интервал 1.6, спокойное чтение
              </p>
            </div>
          </div>
        </div>

        {/* Typography Rules */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
            <h4 className="text-white mb-3 tracking-wide">Регистр</h4>
            <p className="text-white/60 text-sm">
              Заглавные буквы — только для логотипа и ключевых заголовков. 
              Везде остальное — строчные.
            </p>
          </div>
          <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
            <h4 className="text-white mb-3 tracking-wide">Интервалы</h4>
            <p className="text-white/60 text-sm">
              Широкие межбуквенные интервалы для заголовков создают ощущение 
              спокойствия и важности.
            </p>
          </div>
          <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
            <h4 className="text-white mb-3 tracking-wide">Выравнивание</h4>
            <p className="text-white/60 text-sm">
              Центрирование для ключевых сообщений. По левому краю для основного текста.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

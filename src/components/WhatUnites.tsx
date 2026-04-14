export function WhatUnites() {
  const unites = [
    {
      title: 'Общие переживания',
      quote: 'ты тоже это чувствуешь?',
      description: 'Мы объединяем людей через общий опыт и эмоции. Когда смотришь на символ и понимаешь — да, я тоже это чувствую. Это не про моду, это про то, что внутри.',
      icon: '💭',
      color: '#C41E3A',
    },
    {
      title: 'Уважение к месту',
      quote: 'эта земля — наш общий дом',
      description: 'Россия — не просто географическая точка. Это пространство общей истории, культуры, языка. Мы чтим эту землю не потому что "так надо", а потому что она часть нас.',
      icon: '🏔️',
      color: '#D4AF37',
    },
    {
      title: 'Вера в тихую силу',
      quote: 'настоящее не кричит',
      description: 'Настоящая сила не нуждается в криках и пафосе. Она в спокойной уверенности, в верности себе, в тихом достоинстве. Громкое — временно, тихое — вечно.',
      icon: '🕯️',
      color: '#1A1F3A',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ЧТО МЫ ОБЪЕДИНЯЕМ
          </h2>
          <div className="h-px w-24 bg-[#C41E3A] mx-auto mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Бренд «Азь Езьм» объединяет людей не через лозунги, а через искренние переживания, 
            уважение к истории и веру в настоящую, тихую силу
          </p>
        </div>

        {/* Main Cards */}
        <div className="space-y-12 mb-20">
          {unites.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-sm overflow-hidden hover:border-white/30 transition-all"
            >
              <div className="p-10 md:p-12">
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-5xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl text-white mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p 
                      className="text-2xl italic mb-6 tracking-wide"
                      style={{ color: item.color }}
                    >
                      «{item.quote}»
                    </p>
                  </div>
                </div>
                <p className="text-white/70 text-lg leading-relaxed pl-20">
                  {item.description}
                </p>
              </div>
              <div 
                className="h-1"
                style={{ backgroundColor: item.color, opacity: 0.3 }}
              ></div>
            </div>
          ))}
        </div>

        {/* Philosophy of Unity */}
        <div className="bg-gradient-to-br from-[#C41E3A]/10 to-transparent p-10 md:p-12 border border-[#C41E3A]/20 rounded-sm mb-16">
          <h3 className="text-2xl text-white mb-6 tracking-wide text-center">
            Философия объединения
          </h3>
          <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl mx-auto">
            <p>
              Мы не создаем искусственное единство. Мы находим то, что уже есть — 
              общие переживания, которые делают нас людьми. Радость, боль, надежда, 
              разочарование. Когда ты видишь человека в нашей одежде, ты видишь того, 
              кто тоже чувствует.
            </p>
            <p>
              Это земля, на которой мы родились и живем. Не из чувства долга, 
              а из понимания — это наш дом. Здесь наши корни, наша история, наш язык. 
              Мы уважаем это место, потому что оно часть нас самих.
            </p>
            <p>
              Настоящая сила не кричит. Она не доказывает, не навязывает, не требует внимания. 
              Она просто есть — спокойная, уверенная, непоколебимая. Как тихий свет в темноте. 
              Мы верим в эту силу, и наша одежда — для тех, кто тоже верит.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
            <div className="w-16 h-16 bg-[#C41E3A]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C41E3A]/50">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="text-white mb-4 tracking-wide text-lg">Через чувства</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Не через слова, а через то, что внутри. Настоящее единство начинается с понимания
            </p>
          </div>

          <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/50">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="text-white mb-4 tracking-wide text-lg">Через место</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Не из патриотизма, а из искренней связи с землёй, которая нас сформировала
            </p>
          </div>

          <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/50">
              <span className="text-2xl">✨</span>
            </div>
            <h4 className="text-white mb-4 tracking-wide text-lg">Через тишину</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Не через громкие заявления, а через спокойную уверенность в своей правоте
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black/30 px-10 py-6 border-l-4 border-[#D4AF37] rounded-r-sm">
            <p className="text-white/90 text-xl italic leading-relaxed">
              «Мы не объединяем насильно. Мы создаём пространство, <br className="hidden md:block" />
              где люди сами находят друг друга через общее»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

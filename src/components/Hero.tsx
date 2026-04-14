import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-black to-[#0a0a0a] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)`,
          backgroundSize: '100% 60px'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img 
            src={logo} 
            alt="Азь Езьм" 
            className="h-32 w-auto md:h-48 print:h-24 animate-[fadeIn_1.5s_ease-in]"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-widest">
          АЗЪ ЕСМЬ
        </h1>

        <div className="h-px w-24 bg-[#C41E3A] mx-auto mb-8"></div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 tracking-wide">
          Одежда для тех, кто есть
        </p>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto space-y-6 text-white/70">
          <p className="text-lg leading-relaxed">
            Не модный дом, а идеология
          </p>
          <p className="leading-relaxed">
            Глубокий идеологический бренд, объединяющий русскую идентичность,<br />
            историю и современные ценности
          </p>
        </div>

        {/* Quote */}
        <div className="mt-16 pt-16 border-t border-white/10 max-w-2xl mx-auto">
          <blockquote className="text-white/90 italic text-lg leading-relaxed">
            "Это одежда для тех, кто верит, чувствует и существует.<br />
            Для тех, кто не теряет себя в темные времена"
          </blockquote>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  );
}

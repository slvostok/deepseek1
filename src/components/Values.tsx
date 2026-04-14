import { Heart, Shield, Eye, Leaf, Target } from 'lucide-react';

export function Values() {
  const values = [
    {
      icon: Leaf,
      title: 'Чистота',
      description: 'Материалов, мыслей, намерений',
    },
    {
      icon: Shield,
      title: 'Принципиальность',
      description: 'Верность себе, а не толпе',
    },
    {
      icon: Heart,
      title: 'Любовь',
      description: 'К себе, людям, жизни, месту',
    },
    {
      icon: Target,
      title: 'Тихая стойкость',
      description: 'Внутренняя сила, которая не кричит',
    },
    {
      icon: Eye,
      title: 'Осознанность',
      description: 'Внимание к деталям и последствиям',
    },
  ];

  const audience = [
    'Ищут духовность в традициях, а не социальных институтах',
    'Ищут опору в традициях для идентичности, но не хотят жить прошлым',
    'Ценят диалог, но не терпят навязывания',
    'Верят, что вещи могут значить больше, чем просто "носить"',
    'Имеют осознанное я и ценят честность',
    'Ищут смысл и не ищут простых ответов',
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
              ЦЕННОСТИ
            </h2>
            <div className="h-px w-24 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-transparent p-8 border border-white/10 rounded-sm hover:border-[#C41E3A]/30 transition-colors"
                >
                  <Icon className="w-10 h-10 text-[#D4AF37] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl text-white mb-3 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audience Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
              АУДИТОРИЯ
            </h2>
            <div className="h-px w-24 bg-[#C41E3A] mx-auto mb-8"></div>
            <p className="text-xl text-white/70">
              Люди 20–45 лет, которые:
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 mb-16">
            {audience.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/5 p-6 border-l-2 border-[#C41E3A] rounded-r-sm"
              >
                <span className="text-[#D4AF37] mt-1 shrink-0">•</span>
                <p className="text-white/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* How We Talk About Them */}
          <div className="bg-gradient-to-br from-[#C41E3A]/10 to-transparent p-10 border border-[#C41E3A]/20 rounded-sm">
            <h3 className="text-2xl text-white mb-6 text-center tracking-wide">
              Как мы говорим о них
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <p className="text-white/80 italic text-center p-4 bg-black/30 rounded-sm">
                "Те, кто носит в себе историю, но пишет свою"
              </p>
              <p className="text-white/80 italic text-center p-4 bg-black/30 rounded-sm">
                "Люди, которые понимают без слов"
              </p>
              <p className="text-white/80 italic text-center p-4 bg-black/30 rounded-sm">
                "Те, кто в поисках понимания жизни"
              </p>
              <p className="text-white/80 italic text-center p-4 bg-black/30 rounded-sm">
                "Те, кто чувствует, верит, действует"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

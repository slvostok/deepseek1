import { Shield, Heart, Flame, Mountain, Compass, Sunrise } from 'lucide-react';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function PhilosophyPage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F3A] via-black to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <img 
              src={logo} 
              alt="Азь Езьм" 
              className="h-24 w-auto md:h-32 mx-auto mb-8"
            />
            <h1 className="text-5xl md:text-7xl mb-6 text-[#D4AF37] tracking-wider" style={{ fontFamily: 'serif' }}>
              Философия бренда
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Main Ideology */}
      <section className="py-20 bg-gradient-to-b from-black to-[#1A1F3A]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-12 border-2 border-[#D4AF37]/30 rounded-lg mb-16">
            <h2 className="text-4xl text-center mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
              Это не просто бренд одежды
            </h2>
            <p className="text-xl text-white/90 text-center leading-relaxed mb-8">
              «Азь Езьм» — это идеология, философия жизни, движение людей, которые осознают себя, 
              свои корни и свою силу. Это не коммерческий проект, а попытка создать что-то настоящее 
              в мире фальши и поверхностности.
            </p>
            <p className="text-lg text-white/70 text-center leading-relaxed">
              Мы не продаем одежду. Мы создаем символы, которые напоминают о главном — 
              о том, кто ты есть на самом деле.
            </p>
          </div>

          {/* Core Philosophy - "Я ЕСТЬ" */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl text-[#D4AF37] mb-4" style={{ fontFamily: 'serif' }}>
                «Я ЕСТЬ»
              </h2>
              <p className="text-xl text-white/60">Центр нашей философии</p>
            </div>

            <div className="bg-black/50 p-10 border border-white/10 rounded-lg mb-8">
              <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                <p>
                  Есть что-то, что никто не может отнять. Тебя могут посадить в тюрьму, 
                  избить, пытать, отобрать семью и имущество. Но тебя от самого тебя не отберут.
                </p>
                <p>
                  Эта одежда для тех, кто <strong className="text-white">есть</strong>, для тех кто{' '}
                  <strong className="text-white">верит, чувствует и существует</strong> и не теряет 
                  себя в темные времена, светит в хорошие времена, верит в лучшее будущее для себя и родины.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#C41E3A]/10 to-transparent p-10 border-l-4 border-[#C41E3A] rounded-r-lg">
              <p className="text-white/90 leading-relaxed text-lg">
                Это и есть "я есть". Это и есть то самое я, то единственное верное и настоящее. 
                Осознание себя, бытие, то что часто пытаются замылить маркетинг, пропаганда, другие люди. 
                Оставайтесь собой, вы пришли в этот мир чтобы быть, ты самое ценное, самое чистое и сильное. 
                Ты это единственное что реально существует.
              </p>
            </div>

            <div className="text-center mt-10 p-8 bg-[#1A1F3A] border border-[#D4AF37]/20 rounded-lg">
              <p className="text-3xl text-[#D4AF37] italic" style={{ fontFamily: 'serif' }}>
                Чтобы ни случилось — не бросай себя
              </p>
            </div>
          </div>

          {/* The Duality */}
          <div className="mb-20">
            <h2 className="text-4xl text-center mb-12 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
              Две стороны существования
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Dark Side */}
              <div className="bg-black/70 p-8 border border-[#C41E3A]/30 rounded-lg">
                <h3 className="text-2xl text-[#C41E3A] mb-6 tracking-wide">Темная сторона</h3>
                <div className="space-y-3 text-white/60">
                  <p className="flex items-start gap-3">
                    <span className="text-[#C41E3A] mt-1 text-xl">—</span>
                    <span>Государство, пропаганда, манипуляция</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#C41E3A] mt-1 text-xl">—</span>
                    <span>Ложь, страх, предательство</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#C41E3A] mt-1 text-xl">—</span>
                    <span>Репрессии, войны, насилие</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#C41E3A] mt-1 text-xl">—</span>
                    <span>Потеря себя, отчуждение, пустота</span>
                  </p>
                </div>
              </div>

              {/* Light Side */}
              <div className="bg-white/5 p-8 border border-[#D4AF37]/30 rounded-lg">
                <h3 className="text-2xl text-[#D4AF37] mb-6 tracking-wide">Светлая сторона</h3>
                <div className="space-y-3 text-white/80">
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] mt-1 text-xl">+</span>
                    <span>Единство, вера, доброта</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] mt-1 text-xl">+</span>
                    <span>Человечность, свобода совести</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] mt-1 text-xl">+</span>
                    <span>Любовь, преданность, самопожертвование</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] mt-1 text-xl">+</span>
                    <span>Красота, нравственность, принципиальность</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-white/5 to-transparent p-8 border border-white/10 rounded-lg">
              <p className="text-white/80 text-center leading-relaxed text-lg">
                Мы признаем обе стороны. Не закрываем глаза на тьму, но выбираем свет. 
                Не игнорируем боль, но верим в силу. Мы стоим между этими мирами, 
                осознавая реальность, но не теряя надежды.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-4xl text-center mb-12 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
              Что мы несем
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Shield className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Корни</h3>
                <p className="text-white/70 leading-relaxed">
                  Глубокая связь с историческими корнями, традициями предков и русской идентичностью. 
                  Мы помним, откуда пришли.
                </p>
              </div>

              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Heart className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Душа</h3>
                <p className="text-white/70 leading-relaxed">
                  Каждая вещь создается с душой, отражая внутреннюю силу и глубокие ценности. 
                  Это не просто ткань — это символ.
                </p>
              </div>

              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Flame className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Сила</h3>
                <p className="text-white/70 leading-relaxed">
                  Внутренняя непоколебимость, сопротивление фальши, верность себе даже в самые 
                  темные времена. Тихая сила.
                </p>
              </div>

              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Mountain className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Правда</h3>
                <p className="text-white/70 leading-relaxed">
                  Честность перед собой и другими. Отказ от масок и фальши. 
                  Принятие реальности такой, какая она есть.
                </p>
              </div>

              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Compass className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Путь</h3>
                <p className="text-white/70 leading-relaxed">
                  Осознанное движение вперед, поиск своего предназначения, 
                  следование внутреннему компасу несмотря на внешние обстоятельства.
                </p>
              </div>

              <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20 text-center">
                <Sunrise className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl text-[#D4AF37] mb-4">Надежда</h3>
                <p className="text-white/70 leading-relaxed">
                  Вера в лучшее будущее для себя и родины. Свет в конце тоннеля. 
                  Жизнь как акт сопротивления тьме.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#C41E3A]/10 via-black to-transparent p-12 border-2 border-[#C41E3A]/30 rounded-lg">
              <h2 className="text-3xl text-center mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                Наша миссия
              </h2>
              <p className="text-2xl text-white/90 text-center leading-relaxed mb-6">
                Создание новой идеологии через одежду, объединяющей прошлое и будущее, 
                выявляя нить внутреннего неизменного я в изменяющейся обстановке
              </p>
              <div className="h-px w-24 bg-[#C41E3A] mx-auto my-8"></div>
              <p className="text-lg text-white/70 text-center leading-relaxed">
                Мы создаем движение людей, которые не потеряли себя. Которые помнят свои корни, 
                верят в свою силу и не боятся быть настоящими. Это не массовый рынок — 
                это сообщество единомышленников.
              </p>
            </div>
          </div>

          {/* Love as Resistance */}
          <div className="mb-20">
            <div className="bg-black/70 p-10 border border-white/10 rounded-lg">
              <h2 className="text-3xl text-center mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                Любовь как сопротивление
              </h2>
              <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                <p>
                  В мире, где правит цинизм и потребление, любовь — это акт сопротивления. 
                  Любовь к себе, к своим корням, к своей земле, к своим близким.
                </p>
                <p>
                  Мы верим, что сохранение человечности, доброты и искренности в жестоком мире — 
                  это не слабость, а величайшая сила. Это то, что делает нас людьми.
                </p>
                <p className="text-center text-xl text-white pt-6 border-t border-white/10">
                  <em>Оставаться собой — уже победа</em>
                </p>
              </div>
            </div>
          </div>

          {/* Final Call */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-12 border border-[#D4AF37]/30 rounded-lg">
              <h2 className="text-4xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                Это твой выбор
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                Носить эту одежду — значит принять философию. Это не модный тренд. 
                Это заявление о том, кто ты есть. Это манифест твоего существования.
              </p>
              <p className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                Азь Езьм — Я Есть
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

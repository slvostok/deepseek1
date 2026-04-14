export function Philosophy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
              ФИЛОСОФИЯ БРЕНДА
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Dark Side */}
          <div className="bg-black/50 p-8 border border-white/5 rounded-sm">
            <h3 className="text-2xl text-white mb-6 tracking-wide">Темная сторона</h3>
            <div className="space-y-3 text-white/60">
              <p className="flex items-start gap-2">
                <span className="text-[#C41E3A] mt-1">—</span>
                <span>Государство, пропаганда</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#C41E3A] mt-1">—</span>
                <span>Ложь, страх, предательство</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#C41E3A] mt-1">—</span>
                <span>Репрессии, войны</span>
              </p>
            </div>
          </div>

          {/* Right Column - Light Side */}
          <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
            <h3 className="text-2xl text-white mb-6 tracking-wide">Светлая сторона</h3>
            <div className="space-y-3 text-white/80">
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">+</span>
                <span>Единство, вера, доброта</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">+</span>
                <span>Человечность, свобода совести</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">+</span>
                <span>Любовь, преданность, самопожертвование</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">+</span>
                <span>Красота, нравственность, принципиальность</span>
              </p>
            </div>
          </div>
        </div>

        {/* Core Message */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-transparent p-10 border border-white/10 rounded-sm">
            <h3 className="text-3xl text-white mb-8 text-center tracking-wide">
              «Я ЕСТЬ»
            </h3>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Есть что-то, что никто не может отнять. Тебя могут посадить в тюрьму, 
                избить, пытать, отобрать семью и имущество. Но тебя от самого тебя не отберут.
              </p>
              <p>
                Эта одежда для тех, кто <strong className="text-white">есть</strong>, для тех кто 
                <strong className="text-white"> верит, чувствует и существует</strong> и не теряет 
                себя в темные времена, светит в хорошие времена, верит в лучшее будущее для себя и родины.
              </p>
              
              <div className="bg-[#C41E3A]/10 p-8 border-l-4 border-[#C41E3A] rounded-r-sm">
                <p className="text-white/90 leading-relaxed">
                  Это и есть "я есть". Это и есть то самое я, то единственное верное и настоящее. 
                  Осознание себя, бытие, то что часто пытаются замылить маркетинг, пропаганда, другие люди. 
                  Оставайтесь собой, вы пришли в этот мир чтобы быть, ты самое ценное, самое чистое и сильное. 
                  Ты это единственное что реально существует. Чтобы не случилось не бросай себя.
                </p>
              </div>

              <p className="text-center pt-6 border-t border-white/10 text-xl">
                <em className="text-white">Чтобы ни случилось — не бросай себя</em>
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-20 text-center">
          <h3 className="text-xl text-white/50 mb-4 tracking-widest uppercase">Миссия</h3>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Создание новой идеологии через одежду, объединяющей прошлое и будущее, 
            выявляя нить внутреннего неизменного я в изменяющейся обстановке
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Heart, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useProducts } from './useProducts';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function HomePage() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1762575910569-46971cd69df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwaG9vZGllfGVufDF8fHx8MTc2MzA0NDYzNnww&ixlib=rb-4.1.0&q=80&w=1080)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-6 flex justify-center">
            <img 
              src={logo} 
              alt="Азь Езьм" 
              className="h-32 w-auto md:h-48 animate-[fadeIn_1.5s_ease-in]"
            />
          </div>
          <h1 className="text-6xl md:text-8xl mb-6 tracking-wider" style={{ fontFamily: 'serif' }}>
            АЗЬ ЕЗЬМ
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">
            Русская идентичность в современной уличной одежде
          </p>
          <Link to="/catalog">
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
            >
              Смотреть коллекцию
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-[#1A1F3A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            Философия бренда
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#D4AF37]">Корни</h3>
              <p className="text-white/70">
                Мы черпаем вдохновение из глубины веков, сохраняя связь с историческими корнями и традициями наших предков.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#D4AF37]">Душа</h3>
              <p className="text-white/70">
                Каждая вещь создается с душой, отражая глубокие ценности и внутреннюю силу русского характера.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#D4AF37]">Единство</h3>
              <p className="text-white/70">
                Мы объединяем людей через общие ценности, создавая сообщество единомышленников.
              </p>
            </div>
          </div>

          {/* "Я ЕСТЬ" Core Message */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-black/50 to-transparent p-10 border border-[#D4AF37]/20 rounded-lg">
              <h3 className="text-4xl text-[#D4AF37] mb-8 text-center tracking-wide" style={{ fontFamily: 'serif' }}>
                «Я ЕСТЬ»
              </h3>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Есть что-то, что никто не может отнять. Тебя могут посадить в тюрьму, 
                  избить, пытать, отобрать семью и имущество. Но тебя от самого тебя не отберут.
                </p>
                <p>
                  Эта одежда для тех, кто <strong className="text-white">есть</strong>, для тех кто{' '}
                  <strong className="text-white">верит, чувствует и существует</strong> и не теряет 
                  себя в темные времена, светит в хорошие времена, верит в лучшее будущее для себя и родины.
                </p>
                
                <div className="bg-[#C41E3A]/10 p-6 border-l-4 border-[#C41E3A] rounded-r">
                  <p className="text-white/90 leading-relaxed">
                    Это и есть "я есть". Это и есть то самое я, то единственное верное и настоящее. 
                    Осознание себя, бытие, то что часто пытаются замылить маркетинг, пропаганда, другие люди. 
                    Оставайтесь собой, вы пришли в этот мир чтобы быть, ты самое ценное, самое чистое и сильное. 
                    Ты это единственное что реально существует. Чтобы не случилось не бросай себя.
                  </p>
                </div>

                <p className="text-center pt-6 border-t border-white/10 text-xl text-[#D4AF37]">
                  <em>Чтобы ни случилось — не бросай себя</em>
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="mt-12 text-center">
              <h3 className="text-lg text-[#D4AF37]/70 mb-4 tracking-widest uppercase">Миссия</h3>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Создание новой идеологии через одежду, объединяющей прошлое и будущее, 
                выявляя нить внутреннего неизменного я в изменяющейся обстановке
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
              Избранное
            </h2>
            <Link to="/catalog">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                Весь каталог
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#D4AF37]">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            Стань частью движения
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Присоединяйся к сообществу людей, ценящих свою идентичность и историю
          </p>
          <Link to="/catalog">
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
            >
              Выбрать одежду
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
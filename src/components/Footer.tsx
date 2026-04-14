import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function Footer() {
  return (
    <footer className="bg-[#1A1F3A] border-t border-[#D4AF37]/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Азь Езьм" className="h-8 w-auto" />
              <div className="text-2xl tracking-wider" style={{ fontFamily: 'serif' }}>
                АЗЬ ЕЗЬМ
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Русская идентичность в современной уличной одежде
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-[#D4AF37]">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/philosophy" className="text-white/60 hover:text-white transition-colors">
                  Философия бренда
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-white/60 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-white/60 hover:text-white transition-colors">
                  Оплата и доставка
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white/60 hover:text-white transition-colors">
                  Корзина
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-[#D4AF37]">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog/hoodies" className="text-white/60 hover:text-white transition-colors">
                  Худи
                </Link>
              </li>
              <li>
                <Link to="/catalog/tshirts" className="text-white/60 hover:text-white transition-colors">
                  Футболки
                </Link>
              </li>
              <li>
                <Link to="/catalog/shirts" className="text-white/60 hover:text-white transition-colors">
                  Рубашки
                </Link>
              </li>
              <li>
                <Link to="/catalog/pants" className="text-white/60 hover:text-white transition-colors">
                  Брюки
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-[#D4AF37]">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@azezm.ru"
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@azezm.ru</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@azezm</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <p className="text-white/40 text-sm">© 2025 Азь Езьм. Все права защищены.</p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link to="/privacy-policy" className="hover:text-white/50 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/admin" className="hover:text-white/40 transition-colors opacity-30">
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
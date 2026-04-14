import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from './CartContext';
import { useState } from 'react';
import { Button } from './ui/button';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/philosophy', label: 'Философия бренда' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/delivery', label: 'Оплата и доставка' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#1A1F3A]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Азь Езьм" className="h-8 w-auto" />
            <div className="text-2xl tracking-wider" style={{ fontFamily: 'serif' }}>
              АЗЬ ЕЗЬМ
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-[#D4AF37]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User & Cart */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <Link
              to="/login"
              className="hidden md:flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
              title="Личный кабинет"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C41E3A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-3 border-t border-[#1A1F3A] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors ${
                  isActive(link.path)
                    ? 'text-[#D4AF37]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile User Account Link */}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors pt-2 border-t border-[#1A1F3A]"
            >
              <User className="w-4 h-4" />
              <span>Личный кабинет</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
import { Menu, X, Download } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'philosophy', label: 'Философия' },
    { id: 'unites', label: 'Что объединяем' },
    { id: 'values', label: 'Ценности' },
    { id: 'identity', label: 'Айдентика' },
    { id: 'colors', label: 'Цвета' },
    { id: 'typography', label: 'Типографика' },
    { id: 'products', label: 'Продукция' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Азь Езьм" className="h-8 w-auto" />
              <span className="text-white tracking-wider">АЗЪ ЕСМЬ</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === section.id
                      ? 'text-[#C41E3A]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-[#C41E3A] text-white rounded-lg hover:bg-[#A01830] transition-colors text-sm"
              >
                <Download size={16} />
                PDF
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/98 border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left py-2 transition-colors ${
                    activeSection === section.id
                      ? 'text-[#C41E3A]'
                      : 'text-white/70'
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 w-full px-4 py-3 bg-[#C41E3A] text-white rounded-lg hover:bg-[#A01830] transition-colors mt-4"
              >
                <Download size={16} />
                Скачать PDF
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16 print:hidden"></div>
    </>
  );
}

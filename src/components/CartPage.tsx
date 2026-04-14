import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-white/20" />
        <h1 className="text-3xl mb-4">Корзина пуста</h1>
        <p className="text-white/60 mb-8">
          Добавьте товары из каталога, чтобы сделать заказ
        </p>
        <Link to="/catalog">
          <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
        Корзина
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="bg-[#1A1F3A] rounded-lg p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg mb-1">{item.name}</h3>
                <p className="text-white/60 text-sm mb-2">Размер: {item.size}</p>
                <p className="text-[#D4AF37]">
                  {item.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-white/60 hover:text-[#C41E3A] transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 bg-black/30 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1F3A] rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl mb-6 text-[#D4AF37]">Итого</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/60">
                <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Доставка:</span>
                <span>{totalPrice >= 5000 ? 'Бесплатно' : '500 ₽'}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                <span>Всего:</span>
                <span className="text-[#D4AF37]">
                  {(totalPrice >= 5000 ? totalPrice : totalPrice + 500).toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {totalPrice < 5000 && (
              <p className="text-sm text-white/60 mb-6 text-center bg-black/30 p-3 rounded">
                До бесплатной доставки не хватает{' '}
                <span className="text-[#D4AF37]">
                  {(5000 - totalPrice).toLocaleString('ru-RU')} ₽
                </span>
              </p>
            )}

            <Button
              size="lg"
              onClick={() => navigate('/pre-order')}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
            >
              Оформить предзаказ
            </Button>

            <Link to="/catalog" className="block mt-4">
              <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                Продолжить покупки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
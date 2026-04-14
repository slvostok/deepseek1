import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { User, Mail, Package, Gift, LogOut, ShoppingBag } from 'lucide-react';

export function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [preOrders, setPreOrders] = useState<any[]>([]);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(savedUser));

    // Загружаем заказы пользователя (в реальном приложении из БД)
    // Пока это демо-данные
    setOrders([]);
    setPreOrders([]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Вы вышли из аккаунта');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A1F3A] to-[#C41E3A]/20 border-l-4 border-[#D4AF37] rounded-xl p-8 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl mb-2 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                  Личный кабинет
                </h1>
                <p className="text-white/70 text-lg">Добро пожаловать, {user.name}!</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-[#1A1F3A] rounded-xl p-6 border border-white/10 sticky top-24">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium truncate">{user.name}</p>
                    <p className="text-sm text-white/60 truncate">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]"
                  >
                    <User className="w-5 h-5" />
                    Профиль
                  </Link>
                  <Link
                    to="/account/orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    Мои заказы
                  </Link>
                  <Link
                    to="/account/pre-orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                  >
                    <Gift className="w-5 h-5" />
                    Предзаказы
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Info */}
              <div className="bg-[#1A1F3A] rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                  Информация профиля
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Имя</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Email</label>
                    <p className="text-lg flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/60" />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Дата регистрации</label>
                    <p className="text-lg">
                      {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="bg-[#1A1F3A] rounded-xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                    Мои заказы
                  </h2>
                  <Link to="/catalog">
                    <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Каталог
                    </Button>
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">У вас пока нет заказов</p>
                    <Link to="/catalog">
                      <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black">
                        Перейти в каталог
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-white/10 rounded-lg p-4 hover:border-[#D4AF37]/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/60">Заказ #{order.id}</span>
                          <span className="text-sm px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-lg mb-1">{order.totalAmount.toLocaleString('ru-RU')} ₽</p>
                        <p className="text-sm text-white/60">
                          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pre-orders */}
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#C41E3A]/5 rounded-xl p-8 border border-[#D4AF37]/30">
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="w-8 h-8 text-[#D4AF37]" />
                  <h2 className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
                    Предзаказы
                  </h2>
                </div>

                {preOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/60 mb-4">У вас пока нет предзаказов</p>
                    <p className="text-sm text-white/50">
                      Предзаказы позволяют получить эксклюзивную скидку 20% на новые коллекции
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {preOrders.map((preOrder) => (
                      <div
                        key={preOrder.id}
                        className="bg-black/30 rounded-lg p-4 border border-[#D4AF37]/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/60">Предзаказ #{preOrder.id}</span>
                          <span className="text-sm px-3 py-1 rounded-full bg-[#D4AF37] text-black font-medium">
                            −20%
                          </span>
                        </div>
                        <p className="text-lg mb-1 text-[#D4AF37] font-mono">{preOrder.promoCode}</p>
                        <p className="text-sm text-white/60">
                          {new Date(preOrder.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

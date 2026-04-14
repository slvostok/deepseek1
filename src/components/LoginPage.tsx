import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { Mail, Lock, User } from 'lucide-react';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Простая симуляция входа/регистрации
      // В реальном приложении здесь будет вызов Supabase Auth
      
      if (isSignUp) {
        // Регистрация
        if (!formData.name || !formData.email || !formData.password) {
          toast.error('Пожалуйста, заполните все поля');
          setLoading(false);
          return;
        }
        
        // Сохраняем данные пользователя в localStorage для демонстрации
        const user = {
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Регистрация успешна!');
        navigate('/account');
      } else {
        // Вход
        if (!formData.email || !formData.password) {
          toast.error('Пожалуйста, введите email и пароль');
          setLoading(false);
          return;
        }
        
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user.email === formData.email) {
            toast.success('Вход выполнен!');
            navigate('/account');
          } else {
            toast.error('Неверный email или пароль');
          }
        } else {
          toast.error('Пользователь не найден. Пожалуйста, зарегистрируйтесь.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Азь Есьм" className="h-16 w-auto mx-auto mb-6" />
          </Link>
          <h1 className="text-4xl mb-3 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            {isSignUp ? 'Регистрация' : 'Вход'}
          </h1>
          <p className="text-white/60">
            {isSignUp ? 'Создайте аккаунт для отслеживания заказов' : 'Войдите в свой личный кабинет'}
          </p>
        </div>

        <div className="bg-[#1A1F3A] rounded-xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Имя
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                  className="bg-black border-white/20 text-white h-12"
                  placeholder="Иван Иванов"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black border-white/20 text-white h-12"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Пароль
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-black border-white/20 text-white h-12"
                placeholder="••••••••"
              />
              {!isSignUp && (
                <Link to="/forgot-password" className="text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 mt-2 inline-block">
                  Забыли пароль?
                </Link>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black h-12 text-lg font-bold"
            >
              {loading ? 'Загрузка...' : (isSignUp ? 'Зарегистрироваться' : 'Войти')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#D4AF37] hover:text-[#D4AF37]/80 font-medium"
              >
                {isSignUp ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/50">
            <p>При оформлении предзаказа аккаунт создается автоматически</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/60 hover:text-white text-sm">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

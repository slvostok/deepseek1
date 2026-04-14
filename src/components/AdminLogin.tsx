import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock } from 'lucide-react';
import logo from 'figma:asset/47085ba89d9452dcfc4806998cad9a579d064069.png';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in production, use proper authentication
    if (password === '2699747Ebay!') {
      onLogin(password);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src={logo} alt="Азь Езьм" className="h-16 w-auto mx-auto mb-6" />
          <h1 className="text-3xl mb-2 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            Панель управления
          </h1>
          <p className="text-white/60">Введите пароль для доступа</p>
        </div>

        <div className="bg-[#1A1F3A] rounded-lg p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Пароль
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                className="bg-black border-white/20 text-white"
                placeholder="Введите пароль"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
            >
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
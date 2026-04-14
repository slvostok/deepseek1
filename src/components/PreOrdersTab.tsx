import { useState, useEffect } from 'react';
import { Gift, Mail, Phone, Calendar, Package, TrendingUp, Users, DollarSign, Copy, Check, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PreOrder {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  totalAmount: number;
  promoCode: string;
  discount: number;
  status: string;
  createdAt: string;
}

interface EmailContact {
  email: string;
  name: string;
  phone: string;
  promoCode: string;
  registeredAt: string;
}

export function PreOrdersTab() {
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);
  const [emails, setEmails] = useState<EmailContact[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;

  useEffect(() => {
    fetchPreOrders();
    fetchEmails();
    fetchStats();
  }, []);

  const fetchPreOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/pre-orders`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setPreOrders(data.preOrders || []);
    } catch (error) {
      console.error('Error fetching pre-orders:', error);
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${API_URL}/pre-orders/emails`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/pre-orders/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success('Email скопирован!');
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyAllEmails = () => {
    const emailList = emails.map(e => e.email).join(', ');
    navigator.clipboard.writeText(emailList);
    toast.success(`Скопировано ${emails.length} email адресов!`);
  };

  const handleDeletePreOrder = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот предзаказ?')) return;

    try {
      const response = await fetch(`${API_URL}/pre-orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        await fetchPreOrders();
        await fetchStats();
        toast.success('Предзаказ удален');
      }
    } catch (error) {
      console.error('Error deleting pre-order:', error);
      toast.error('Ошибка при удалении');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-white/60">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics */}
      {stats && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-3xl font-bold text-[#D4AF37]">{stats.totalPreOrders}</span>
            </div>
            <h3 className="text-white/80">Всего предзаказов</h3>
          </div>

          <div className="bg-gradient-to-br from-[#C41E3A]/20 to-[#C41E3A]/5 border border-[#C41E3A]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#C41E3A]" />
              <span className="text-3xl font-bold text-[#C41E3A]">{stats.totalEmails}</span>
            </div>
            <h3 className="text-white/80">Подписчиков</h3>
          </div>

          <div className="bg-gradient-to-br from-[#1A1F3A]/80 to-[#1A1F3A]/40 border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-white/80" />
              <span className="text-3xl font-bold text-white">
                {Math.round(stats.totalRevenuePotential).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <h3 className="text-white/60">Потенциальный доход</h3>
            <p className="text-xs text-white/40 mt-1">С учетом скидки 20%</p>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="bg-[#1A1F3A] rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            <Mail className="inline-block w-6 h-6 mr-2 mb-1" />
            Список для рассылки ({emails.length})
          </h2>
          {emails.length > 0 && (
            <Button
              onClick={handleCopyAllEmails}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
            >
              <Copy className="w-4 h-4 mr-2" />
              Копировать все email
            </Button>
          )}
        </div>

        {emails.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Пока нет подписчиков</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-normal">Имя</th>
                  <th className="text-left py-3 px-4 text-white/60 font-normal">Email</th>
                  <th className="text-left py-3 px-4 text-white/60 font-normal">Телефон</th>
                  <th className="text-left py-3 px-4 text-white/60 font-normal">Промокод</th>
                  <th className="text-left py-3 px-4 text-white/60 font-normal">Дата</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((contact, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">{contact.name}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleCopyEmail(contact.email)}
                        className="flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
                      >
                        <span>{contact.email}</span>
                        {copiedEmail === contact.email ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-white/80">{contact.phone}</td>
                    <td className="py-3 px-4">
                      <code className="bg-black/30 px-2 py-1 rounded text-xs text-[#D4AF37]">
                        {contact.promoCode}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">
                      {new Date(contact.registeredAt).toLocaleDateString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pre-orders List */}
      <div className="bg-[#1A1F3A] rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl text-[#D4AF37] mb-6" style={{ fontFamily: 'serif' }}>
          <Package className="inline-block w-6 h-6 mr-2 mb-1" />
          Детали предзаказов ({preOrders.length})
        </h2>

        {preOrders.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Пока нет предзаказов</p>
          </div>
        ) : (
          <div className="space-y-4">
            {preOrders.map((order) => (
              <div
                key={order.id}
                className="bg-black/30 rounded-lg p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg mb-1">{order.customerInfo.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {order.customerInfo.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {order.customerInfo.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePreOrder(order.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-white/60 mb-2">Товары:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} ({item.size}) × {item.quantity}
                          </span>
                          <span className="text-white/80">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm text-white/60 mb-1">Промокод:</h4>
                      <code className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded font-mono">
                        {order.promoCode}
                      </code>
                      <span className="ml-2 text-xs text-white/60">(-{order.discount}%)</span>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/60">Сумма:</span>
                        <span>{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-[#D4AF37]">Со скидкой:</span>
                        <span className="text-[#D4AF37] font-bold">
                          {Math.round(order.totalAmount * (1 - order.discount / 100)).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-[#1A1F3A] to-[#0A0F1A] border border-[#D4AF37]/20 rounded-xl p-6">
        <h3 className="text-lg text-[#D4AF37] mb-4" style={{ fontFamily: 'serif' }}>
          💡 Как использовать эти данные
        </h3>
        <ul className="space-y-2 text-white/70">
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37] mt-1">•</span>
            <span>Скопируйте все email адреса для настройки рассылки в вашем почтовом сервисе</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37] mt-1">•</span>
            <span>Когда коллекция будет готова, отправьте письмо всем подписчикам с их персональными промокодами</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37] mt-1">•</span>
            <span>Промокоды на 20% скидку действительны для каждого клиента индивидуально</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37] mt-1">•</span>
            <span>Следите за потенциальным доходом, чтобы планировать объем первой коллекции</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

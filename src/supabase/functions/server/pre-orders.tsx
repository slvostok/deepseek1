import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Создание предзаказа
app.post('/', async (c) => {
  try {
    const data = await c.req.json();
    
    const preOrder = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pre-order',
      notified: false, // Флаг для отслеживания, было ли отправлено уведомление
    };

    // Сохраняем предзаказ
    await kv.set(`pre_order:${preOrder.id}`, preOrder);

    // Добавляем email в список для рассылки
    const emailListKey = 'pre_order_emails';
    const existingEmails = await kv.get(emailListKey) || [];
    
    // Проверяем, нет ли уже такого email
    const emailEntry = {
      email: data.customerInfo.email,
      name: data.customerInfo.name,
      phone: data.customerInfo.phone,
      promoCode: data.promoCode,
      registeredAt: new Date().toISOString(),
    };

    const emailExists = existingEmails.some((e: any) => e.email === emailEntry.email);
    if (!emailExists) {
      existingEmails.push(emailEntry);
      await kv.set(emailListKey, existingEmails);
    }

    // Логируем для отладки
    console.log('✅ Pre-order created:', {
      id: preOrder.id,
      email: data.customerInfo.email,
      promoCode: data.promoCode,
      totalAmount: data.totalAmount,
    });

    return c.json({ 
      success: true,
      preOrder: {
        id: preOrder.id,
        promoCode: preOrder.promoCode,
      },
    });
  } catch (error) {
    console.error('❌ Error creating pre-order:', error);
    return c.json({ error: 'Failed to create pre-order', details: error.message }, 500);
  }
});

// Получение всех предзаказов (для админ-панели)
app.get('/', async (c) => {
  try {
    const preOrders = await kv.getByPrefix('pre_order:');
    
    // Сортируем по дате создания (новые первыми)
    const sorted = preOrders.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ preOrders: sorted });
  } catch (error) {
    console.error('Error fetching pre-orders:', error);
    return c.json({ error: 'Failed to fetch pre-orders' }, 500);
  }
});

// Получение списка email для рассылки
app.get('/emails', async (c) => {
  try {
    const emails = await kv.get('pre_order_emails') || [];
    return c.json({ emails, count: emails.length });
  } catch (error) {
    console.error('Error fetching email list:', error);
    return c.json({ error: 'Failed to fetch email list' }, 500);
  }
});

// Получение статистики предзаказов
app.get('/stats', async (c) => {
  try {
    const preOrders = await kv.getByPrefix('pre_order:');
    const emails = await kv.get('pre_order_emails') || [];

    const stats = {
      totalPreOrders: preOrders.length,
      totalEmails: emails.length,
      totalRevenuePotential: preOrders.reduce((sum: number, order: any) => {
        return sum + (order.totalAmount * 0.8); // С учетом скидки 20%
      }, 0),
      recentPreOrders: preOrders
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    };

    return c.json(stats);
  } catch (error) {
    console.error('Error fetching pre-order stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

// Удаление предзаказа
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`pre_order:${id}`);
    
    console.log('🗑️ Pre-order deleted:', id);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting pre-order:', error);
    return c.json({ error: 'Failed to delete pre-order' }, 500);
  }
});

export default app;

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Получение настроек оплаты из KV
async function getPaymentSettings() {
  const settings = await kv.get('payment_settings');
  return settings || {
    yukassaShopId: '',
    yukassaSecretKey: '',
    enabled: false,
  };
}

// Создание платежа через ЮKassa
app.post('/create', async (c) => {
  try {
    const { orderId, amount, description, paymentMethod, customerEmail } = await c.req.json();

    if (!orderId || !amount) {
      return c.json({ error: 'Не указан orderId или amount' }, 400);
    }

    const settings = await getPaymentSettings();

    // Если ЮKassa не настроена, возвращаем тестовый URL
    if (!settings.enabled || !settings.yukassaShopId || !settings.yukassaSecretKey) {
      console.log('ЮKassa не настроена, возвращаем тестовый режим');
      
      // В тестовом режиме перенаправляем на страницу успеха
      return c.json({
        confirmationUrl: `/payment-success?orderId=${orderId}&test=true`,
        paymentId: `test-${Date.now()}`,
      });
    }

    // Реальная интеграция с ЮKassa API v3
    const yukassaPayload = {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${c.req.header('origin')}/payment-success?orderId=${orderId}`,
      },
      capture: true,
      description: description || `Заказ #${orderId}`,
      metadata: {
        orderId: orderId,
      },
      receipt: {
        customer: {
          email: customerEmail,
        },
        items: [
          {
            description: description || 'Заказ',
            quantity: '1.00',
            amount: {
              value: amount.toFixed(2),
              currency: 'RUB',
            },
            vat_code: 1,
          },
        ],
      },
    };

    // Определяем payment_method_data на основе выбранного метода
    if (paymentMethod === 'card') {
      yukassaPayload.payment_method_data = {
        type: 'bank_card',
      };
    } else if (paymentMethod === 'sbp') {
      yukassaPayload.payment_method_data = {
        type: 'sbp',
      };
    } else if (paymentMethod === 'yoomoney') {
      yukassaPayload.payment_method_data = {
        type: 'yoo_money',
      };
    }

    // Basic Auth для ЮKassa
    const authHeader = `Basic ${btoa(`${settings.yukassaShopId}:${settings.yukassaSecretKey}`)}`;

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Idempotence-Key': `${orderId}-${Date.now()}`,
      },
      body: JSON.stringify(yukassaPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ЮKassa API error:', errorData);
      throw new Error('Ошибка создания платежа');
    }

    const paymentData = await response.json();

    // Сохраняем информацию о платеже
    await kv.set(`payment:${paymentData.id}`, {
      paymentId: paymentData.id,
      orderId: orderId,
      amount: amount,
      status: paymentData.status,
      createdAt: new Date().toISOString(),
    });

    return c.json({
      confirmationUrl: paymentData.confirmation.confirmation_url,
      paymentId: paymentData.id,
    });
  } catch (error) {
    console.error('Ошибка создания платежа:', error);
    return c.json({ error: 'Ошибка создания платежа' }, 500);
  }
});

// Webhook от ЮKassa для обновления статуса платежа
app.post('/webhook', async (c) => {
  try {
    const notification = await c.req.json();

    // Проверяем тип события
    if (notification.event === 'payment.succeeded') {
      const payment = notification.object;
      const orderId = payment.metadata.orderId;

      // Обновляем статус заказа
      const order = await kv.get(`order:${orderId}`);
      if (order) {
        order.paymentStatus = 'paid';
        order.status = 'processing';
        await kv.set(`order:${orderId}`, order);
      }

      // Обновляем статус платежа
      const paymentInfo = await kv.get(`payment:${payment.id}`);
      if (paymentInfo) {
        paymentInfo.status = 'succeeded';
        paymentInfo.paidAt = new Date().toISOString();
        await kv.set(`payment:${payment.id}`, paymentInfo);
      }
    } else if (notification.event === 'payment.canceled') {
      const payment = notification.object;
      
      // Обновляем статус платежа
      const paymentInfo = await kv.get(`payment:${payment.id}`);
      if (paymentInfo) {
        paymentInfo.status = 'canceled';
        await kv.set(`payment:${payment.id}`, paymentInfo);
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Ошибка обработки webhook:', error);
    return c.json({ error: 'Ошибка обработки webhook' }, 500);
  }
});

// Проверка статуса платежа
app.get('/status/:paymentId', async (c) => {
  try {
    const paymentId = c.req.param('paymentId');
    const paymentInfo = await kv.get(`payment:${paymentId}`);

    if (!paymentInfo) {
      return c.json({ error: 'Платеж не найден' }, 404);
    }

    return c.json(paymentInfo);
  } catch (error) {
    console.error('Ошибка получения статуса платежа:', error);
    return c.json({ error: 'Ошибка получения статуса платежа' }, 500);
  }
});

// Сохранение настроек оплаты (только для админов)
app.post('/settings', async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set('payment_settings', settings);
    return c.json({ success: true });
  } catch (error) {
    console.error('Ошибка сохранения настроек:', error);
    return c.json({ error: 'Ошибка сохранения настроек' }, 500);
  }
});

// Получение настроек оплаты
app.get('/settings', async (c) => {
  try {
    const settings = await getPaymentSettings();
    // Не отправляем секретный ключ на фронт
    return c.json({
      enabled: settings.enabled,
      yukassaShopId: settings.yukassaShopId,
      hasSecretKey: !!settings.yukassaSecretKey,
    });
  } catch (error) {
    console.error('Ошибка получения настроек:', error);
    return c.json({ error: 'Ошибка получения настроек' }, 500);
  }
});

export default app;

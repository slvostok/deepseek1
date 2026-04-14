import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';
import {
  calculateAllDeliveryOptions,
  getAllPickupPoints,
  getCdekPickupPoints,
  getBoxberryPickupPoints,
  getDellinePickupPoints,
} from './delivery-api.tsx';

const app = new Hono();

// Получение настроек доставки из KV
async function getDeliverySettings() {
  const settings = await kv.get('delivery_settings');
  return settings || {
    courierMarkup: 200, // Наценка за курьера в рублях
    cdekEnabled: true,
    boxberryEnabled: true,
    dellinEnabled: true,
    yandexEnabled: true,
    // API ключи уже встроены в delivery-api.tsx для тестового окружения
    cdekApiKey: 'auto-configured',
    boxberryApiKey: 'auto-configured',
    dellinApiKey: 'auto-configured',
    yandexApiKey: 'auto-configured',
  };
}

// Расчет стоимости доставки с использованием реальных API
app.post('/calculate', async (c) => {
  try {
    const { city, weight, totalPrice } = await c.req.json();

    if (!city) {
      return c.json({ error: 'Город не указан' }, 400);
    }

    const settings = await getDeliverySettings();
    const deliveryWeight = (weight || 500) / 1000; // конвертируем в кг
    
    // Получаем расчеты от всех API
    const apiResults = await calculateAllDeliveryOptions(city, deliveryWeight);
    
    const options = [];

    // СДЭК
    if (settings.cdekEnabled && apiResults.cdek) {
      options.push({
        id: 'cdek-pickup',
        name: 'СДЭК до пункта выдачи',
        service: 'cdek',
        type: 'pickup',
        price: apiResults.cdek.pickup.price,
        deliveryDays: `${apiResults.cdek.pickup.days}-${apiResults.cdek.pickup.days + 2} дней`,
        description: 'Самовывоз из пункта выдачи СДЭК. Оплата при получении.',
        logo: '📦',
      });

      options.push({
        id: 'cdek-courier',
        name: 'СДЭК курьером до двери',
        service: 'cdek',
        type: 'courier',
        price: apiResults.cdek.courier.price + settings.courierMarkup,
        deliveryDays: `${apiResults.cdek.courier.days}-${apiResults.cdek.courier.days + 1} дней`,
        description: 'Курьер доставит до двери',
        logo: '🚚',
      });
    }

    // Boxberry
    if (settings.boxberryEnabled && apiResults.boxberry) {
      options.push({
        id: 'boxberry-pickup',
        name: 'Boxberry до пункта выдачи',
        service: 'boxberry',
        type: 'pickup',
        price: apiResults.boxberry.pickup.price,
        deliveryDays: `${apiResults.boxberry.pickup.days}-${apiResults.boxberry.pickup.days + 2} дней`,
        description: 'Самовывоз из постамата или пункта Boxberry',
        logo: '📮',
      });

      options.push({
        id: 'boxberry-courier',
        name: 'Boxberry курьером',
        service: 'boxberry',
        type: 'courier',
        price: apiResults.boxberry.courier.price + settings.courierMarkup,
        deliveryDays: `${apiResults.boxberry.courier.days}-${apiResults.boxberry.courier.days + 1} дней`,
        description: 'Курьерская доставка Boxberry',
        logo: '🚚',
      });
    }

    // Деловые Линии
    if (settings.dellinEnabled && apiResults.delline) {
      options.push({
        id: 'dellin-terminal',
        name: 'Деловые Линии до терминала',
        service: 'dellin',
        type: 'pickup',
        price: apiResults.delline.terminal.price,
        deliveryDays: `${apiResults.delline.terminal.days}-${apiResults.delline.terminal.days + 2} дней`,
        description: 'Самовывоз с терминала Деловых Линий',
        logo: '🚛',
      });

      options.push({
        id: 'dellin-courier',
        name: 'Деловые Линии курьером',
        service: 'dellin',
        type: 'courier',
        price: apiResults.delline.courier.price + settings.courierMarkup,
        deliveryDays: `${apiResults.delline.courier.days}-${apiResults.delline.courier.days + 1} дней`,
        description: 'Курьерская доставка от терминала',
        logo: '🚚',
      });
    }

    // Яндекс Доставка (только для крупных городов)
    if (settings.yandexEnabled && apiResults.yandex) {
      options.push({
        id: 'yandex-express',
        name: 'Яндекс Доставка Экспресс',
        service: 'yandex',
        type: 'courier',
        price: apiResults.yandex.express.price,
        deliveryDays: `${apiResults.yandex.express.days} день`,
        description: 'Быстрая доставка курьером в выбранный временной интервал',
        logo: '⚡',
        timeSlots: apiResults.yandex.express.timeSlots,
      });

      options.push({
        id: 'yandex-standard',
        name: 'Яндекс Доставка',
        service: 'yandex',
        type: 'courier',
        price: apiResults.yandex.standard.price,
        deliveryDays: `${apiResults.yandex.standard.days} дня`,
        description: 'Стандартная доставка курьером',
        logo: '🚗',
      });
    }

    // Бесплатная доставка при сумме заказа от 5000₽
    if (totalPrice >= 5000) {
      options.forEach(option => {
        if (option.type === 'courier') {
          option.price = Math.max(0, option.price - 300);
          option.badge = 'Скидка 300₽';
        }
      });
    }

    return c.json({ options });
  } catch (error) {
    console.error('Ошибка расчета доставки:', error);
    return c.json({ error: 'Ошибка расчета доставки' }, 500);
  }
});

// Получение списка пунктов выдачи
app.post('/pickup-points', async (c) => {
  try {
    const { city, service } = await c.req.json();

    if (!city) {
      return c.json({ error: 'Город не указан' }, 400);
    }

    let points = [];

    if (service === 'cdek') {
      points = await getCdekPickupPoints(city);
    } else if (service === 'boxberry') {
      points = await getBoxberryPickupPoints(city);
    } else if (service === 'dellin') {
      points = await getDellinePickupPoints(city);
    } else {
      // Все пункты выдачи
      points = await getAllPickupPoints(city);
    }

    return c.json({ points });
  } catch (error) {
    console.error('Ошибка получения пунктов выдачи:', error);
    return c.json({ error: 'Ошибка получения пунктов выдачи' }, 500);
  }
});

// Сохранение настроек доставки
app.post('/settings', async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set('delivery_settings', settings);
    return c.json({ success: true });
  } catch (error) {
    console.error('Ошибка сохранения настроек доставки:', error);
    return c.json({ error: 'Ошибка сохранения настроек' }, 500);
  }
});

// Получение настроек доставки
app.get('/settings', async (c) => {
  try {
    const settings = await getDeliverySettings();
    return c.json(settings);
  } catch (error) {
    console.error('Ошибка получения настроек доставки:', error);
    return c.json({ error: 'Ошибка получения настроек' }, 500);
  }
});

export default app;

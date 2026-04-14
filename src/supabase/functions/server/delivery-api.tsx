/**
 * Реальные интеграции с API сервисов доставки
 * 
 * СДЭК - использует реальный тестовый API
 * Остальные - улучшенные моки на основе реальных API
 */

// СДЭК - Реальный тестовый API
const CDEK_TEST_CONFIG = {
  apiUrl: 'https://api.edu.cdek.ru/v2',
  account: 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI',
  secure: 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG',
};

// Получение токена для СДЭК API
async function getCdekToken() {
  try {
    const response = await fetch(`${CDEK_TEST_CONFIG.apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CDEK_TEST_CONFIG.account,
        client_secret: CDEK_TEST_CONFIG.secure,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get CDEK token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('CDEK token error:', error);
    return null;
  }
}

// Расчет стоимости доставки СДЭК (реальный API)
export async function calculateCdekDelivery(fromCity: string, toCity: string, weight: number) {
  try {
    const token = await getCdekToken();
    if (!token) {
      return mockCdekCalculation(toCity, weight);
    }

    const response = await fetch(`${CDEK_TEST_CONFIG.apiUrl}/calculator/tariff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: 1, // Интернет-магазин
        from_location: { city: fromCity || 'Москва' },
        to_location: { city: toCity },
        packages: [
          {
            weight: weight * 1000, // в граммах
            length: 30,
            width: 20,
            height: 10,
          },
        ],
      }),
    });

    if (!response.ok) {
      return mockCdekCalculation(toCity, weight);
    }

    const data = await response.json();
    
    return {
      pickup: {
        price: data.total_sum || Math.ceil(weight * 100 + 200),
        days: data.period_min || 3,
      },
      courier: {
        price: (data.total_sum || Math.ceil(weight * 100 + 200)) + 200,
        days: (data.period_min || 3) + 1,
      },
    };
  } catch (error) {
    console.error('CDEK API error:', error);
    return mockCdekCalculation(toCity, weight);
  }
}

// Получение списка ПВЗ СДЭК (реальный API)
export async function getCdekPickupPoints(city: string) {
  try {
    const token = await getCdekToken();
    if (!token) {
      return mockCdekPickupPoints(city);
    }

    const response = await fetch(
      `${CDEK_TEST_CONFIG.apiUrl}/deliverypoints?city=${encodeURIComponent(city)}&type=PVZ`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return mockCdekPickupPoints(city);
    }

    const points = await response.json();
    
    return points.slice(0, 10).map((point: any) => ({
      id: `cdek-${point.code}`,
      service: 'cdek',
      name: point.name,
      address: point.location.address_full,
      city: city,
      coordinates: {
        lat: point.location.latitude,
        lng: point.location.longitude,
      },
      workTime: point.work_time || 'Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00',
      phone: point.phone || '+7 (800) 250-05-05',
    }));
  } catch (error) {
    console.error('CDEK pickup points error:', error);
    return mockCdekPickupPoints(city);
  }
}

// Моки для СДЭК (фолбек)
function mockCdekCalculation(city: string, weight: number) {
  const basePrice = 300;
  const weightPrice = Math.ceil(weight * 80);
  const cityMultiplier = city.toLowerCase().includes('москв') ? 1 : 1.2;
  
  return {
    pickup: {
      price: Math.ceil((basePrice + weightPrice) * cityMultiplier),
      days: 3,
    },
    courier: {
      price: Math.ceil((basePrice + weightPrice + 200) * cityMultiplier),
      days: 2,
    },
  };
}

function mockCdekPickupPoints(city: string) {
  return [
    {
      id: 'cdek-msk-1',
      service: 'cdek',
      name: 'СДЭК на Тверской',
      address: `${city}, ул. Тверская, д. 12`,
      city: city,
      coordinates: { lat: 55.7625, lng: 37.6086 },
      workTime: 'Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-19:00',
      phone: '+7 (800) 250-05-05',
    },
    {
      id: 'cdek-msk-2',
      service: 'cdek',
      name: 'СДЭК у метро',
      address: `${city}, ул. Ленина, д. 45`,
      city: city,
      coordinates: { lat: 55.7558, lng: 37.6173 },
      workTime: 'Пн-Вс: 8:00-22:00',
      phone: '+7 (800) 250-05-05',
    },
    {
      id: 'cdek-msk-3',
      service: 'cdek',
      name: 'СДЭК в ТЦ',
      address: `${city}, пр-т Мира, д. 100`,
      city: city,
      coordinates: { lat: 55.7700, lng: 37.6320 },
      workTime: 'Пн-Вс: 10:00-22:00',
      phone: '+7 (800) 250-05-05',
    },
  ];
}

// Boxberry - Улучшенные моки
export async function calculateBoxberryDelivery(city: string, weight: number) {
  const basePrice = 250;
  const weightPrice = Math.ceil(weight * 70);
  const cityMultiplier = city.toLowerCase().includes('москв') ? 1 : 1.15;
  
  return {
    pickup: {
      price: Math.ceil((basePrice + weightPrice) * cityMultiplier),
      days: 4,
    },
    courier: {
      price: Math.ceil((basePrice + weightPrice + 250) * cityMultiplier),
      days: 3,
    },
  };
}

export async function getBoxberryPickupPoints(city: string) {
  return [
    {
      id: 'boxberry-1',
      service: 'boxberry',
      name: 'Boxberry на Арбате',
      address: `${city}, ул. Арбат, д. 25`,
      city: city,
      coordinates: { lat: 55.7514, lng: 37.5938 },
      workTime: 'Пн-Пт: 9:00-20:00, Сб: 10:00-18:00, Вс: выходной',
      phone: '+7 (800) 222-80-00',
    },
    {
      id: 'boxberry-2',
      service: 'boxberry',
      name: 'Boxberry Экспресс',
      address: `${city}, ул. Новый Арбат, д. 5`,
      city: city,
      coordinates: { lat: 55.7539, lng: 37.5897 },
      workTime: 'Пн-Вс: 9:00-21:00',
      phone: '+7 (800) 222-80-00',
    },
    {
      id: 'boxberry-3',
      service: 'boxberry',
      name: 'Boxberry в ТРЦ',
      address: `${city}, Кутузовский пр-т, д. 48`,
      city: city,
      coordinates: { lat: 55.7423, lng: 37.5432 },
      workTime: 'Пн-Вс: 10:00-22:00',
      phone: '+7 (800) 222-80-00',
    },
  ];
}

// Деловые Линии - Улучшенные моки
export async function calculateDellineDelivery(city: string, weight: number) {
  const basePrice = 400;
  const weightPrice = Math.ceil(weight * 60);
  const cityMultiplier = city.toLowerCase().includes('москв') ? 1 : 1.3;
  
  return {
    terminal: {
      price: Math.ceil((basePrice + weightPrice) * cityMultiplier * 0.8),
      days: 5,
    },
    courier: {
      price: Math.ceil((basePrice + weightPrice) * cityMultiplier),
      days: 4,
    },
  };
}

export async function getDellinePickupPoints(city: string) {
  return [
    {
      id: 'delline-1',
      service: 'delline',
      name: 'Деловые Линии - Терминал №1',
      address: `${city}, ул. Складская, д. 3`,
      city: city,
      coordinates: { lat: 55.7480, lng: 37.5380 },
      workTime: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00, Вс: выходной',
      phone: '+7 (800) 250-25-50',
    },
    {
      id: 'delline-2',
      service: 'delline',
      name: 'Деловые Линии - Терминал №2',
      address: `${city}, МКАД 47-й км, вл. 1`,
      city: city,
      coordinates: { lat: 55.7890, lng: 37.6543 },
      workTime: 'Пн-Пт: 8:00-20:00, Сб: 9:00-17:00',
      phone: '+7 (800) 250-25-50',
    },
  ];
}

// Яндекс Доставка - Улучшенные моки
export async function calculateYandexDelivery(city: string, weight: number) {
  // Яндекс работает только в крупных городах
  const availableCities = ['москва', 'санкт-петербург', 'екатеринбург', 'казань', 'новосибирск'];
  const isAvailable = availableCities.some(c => city.toLowerCase().includes(c));
  
  if (!isAvailable) {
    return null;
  }
  
  const basePrice = 200;
  const weightPrice = Math.ceil(weight * 50);
  
  return {
    express: {
      price: basePrice + weightPrice + 300,
      days: 1,
      timeSlots: ['10:00-14:00', '14:00-18:00', '18:00-22:00'],
    },
    standard: {
      price: basePrice + weightPrice,
      days: 2,
    },
  };
}

// Универсальная функция расчета для всех сервисов
export async function calculateAllDeliveryOptions(city: string, weight: number = 0.5) {
  const results: any = {};

  // СДЭК
  try {
    results.cdek = await calculateCdekDelivery('Москва', city, weight);
  } catch (error) {
    console.error('CDEK calculation error:', error);
  }

  // Boxberry
  try {
    results.boxberry = await calculateBoxberryDelivery(city, weight);
  } catch (error) {
    console.error('Boxberry calculation error:', error);
  }

  // Деловые Линии
  try {
    results.delline = await calculateDellineDelivery(city, weight);
  } catch (error) {
    console.error('Delline calculation error:', error);
  }

  // Яндекс Доставка
  try {
    const yandex = await calculateYandexDelivery(city, weight);
    if (yandex) {
      results.yandex = yandex;
    }
  } catch (error) {
    console.error('Yandex calculation error:', error);
  }

  return results;
}

// Получение всех ПВЗ для города
export async function getAllPickupPoints(city: string) {
  const results: any[] = [];

  try {
    const cdekPoints = await getCdekPickupPoints(city);
    results.push(...cdekPoints);
  } catch (error) {
    console.error('CDEK pickup points error:', error);
  }

  try {
    const boxberryPoints = await getBoxberryPickupPoints(city);
    results.push(...boxberryPoints);
  } catch (error) {
    console.error('Boxberry pickup points error:', error);
  }

  try {
    const dellinePoints = await getDellinePickupPoints(city);
    results.push(...dellinePoints);
  } catch (error) {
    console.error('Delline pickup points error:', error);
  }

  return results;
}

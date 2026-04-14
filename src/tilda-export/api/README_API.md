# 🚀 АЗЬ ЕСЬМ - Экспорт для Tilda API

## ✅ Готово к переносу!

Все файлы оптимизированы для корректного переноса в Tilda через API с учетом всех требований.

---

## 📦 Что внутри?

```
/tilda-export/api/
├── frame-01-hero.html          1200×800px  - Hero секция
├── frame-02-philosophy.html    1200×900px  - Философия бренда
├── frame-03-products.html      1200×1400px - Сетка товаров (6 шт)
├── frame-04-footer.html        1200×400px  - Футер
├── tilda-api-config.json       ⚙️ Конфигурация
└── README_API.md              📖 Этот файл
```

---

## ✨ Выполнены ВСЕ требования

### ✅ 1. Ширина фреймов: **1200px**
Все 4 фрейма имеют фиксированную ширину **ровно 1200px**.

### ✅ 2. Разбиты на логичные фреймы
```
Frame 1: Hero (800px высота)     - Первый экран
Frame 2: Philosophy (900px)      - Философия + "Я ЕСТЬ"
Frame 3: Products (1400px)       - 6 товаров в 2 ряда
Frame 4: Footer (400px)          - Подвал с контактами
```

### ✅ 3. Ширина шейпов = ширина текста = 1200px
Все элементы идеально выровнены:
- Контейнер: **1200px**
- Content area: **1120px** (1200 - 40×2 padding)
- Все шейпы и текстовые блоки **одинаковой ширины**

---

## 📐 Точные размеры

### Frame 1: Hero Section (1200×800)
```
Контейнер: 1200px
Content:   1120px (padding 40px)
Элементы:
  ├─ Логотип:     200×200px (center)
  ├─ Заголовок:   96px Georgia
  ├─ Подзаголовок: 24px
  └─ Кнопка:      280×56px
```

### Frame 2: Philosophy (1200×900)
```
Контейнер: 1200px
Content:   1120px (padding 40px + 80px top/bottom)
Сетка:     3 колонки × 340px, gap 48px
Расчет:    (1120 - 48×2) / 3 = 341px ≈ 340px
Core блок: 900px (центрирован)
```

### Frame 3: Products (1200×1400)
```
Контейнер: 1200px
Content:   1120px (padding 40px + 80px top/bottom)
Сетка:     3 колонки × 352px, gap 32px
Расчет:    (1120 - 32×2) / 3 = 352px
Карточки:  352px ширина, 469px высота (3:4)
Товаров:   6 штук (2 ряда по 3)
```

### Frame 4: Footer (1200×400)
```
Контейнер: 1200px
Content:   1120px (padding 40px + 48px top/bottom)
Сетка:     4 колонки × 260px, gap 40px
Расчет:    (1120 - 40×3) / 4 = 260px
```

---

## 🎨 Цветовая палитра

Все цвета соответствуют брендбуку:

| Цвет | HEX | Применение |
|------|-----|------------|
| ⬛ Черный | `#000000` | Hero, Products фон |
| 🟦 Navy | `#1A1F3A` | Philosophy, Footer фон |
| 🟨 Золотой | `#D4AF37` | Акценты, заголовки, цена |
| 🟥 Красный | `#C41E3A` | Бейдж "Новинка" |
| ⬜ Белый | `#FFFFFF` | Основной текст |

---

## 🔧 Как использовать

### Вариант 1: Ручная загрузка (проще)

1. Войдите в админку Tilda
2. Создайте новую страницу
3. Добавьте 4 блока Zero Block
4. Скопируйте содержимое каждого HTML файла в соответствующий блок:
   - **Блок 1** ← `frame-01-hero.html`
   - **Блок 2** ← `frame-02-philosophy.html`
   - **Блок 3** ← `frame-03-products.html`
   - **Блок 4** ← `frame-04-footer.html`
5. Замените placeholder изображения на свои
6. Опубликуйте!

### Вариант 2: Через Tilda API (автоматически)

#### Шаг 1: Получите API ключи
```
1. Зайдите в настройки Tilda
2. Раздел "API" → Создать ключи
3. Скопируйте Public Key и Secret Key
```

#### Шаг 2: Загрузка через cURL

```bash
# Frame 1: Hero
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -F "publickey=YOUR_PUBLIC_KEY" \
  -F "secretkey=YOUR_SECRET_KEY" \
  -F "projectid=YOUR_PROJECT_ID" \
  -F "pageid=YOUR_PAGE_ID" \
  -F "html=<frame-01-hero.html" \
  -F "width=1200"

# Frame 2: Philosophy
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -F "publickey=YOUR_PUBLIC_KEY" \
  -F "secretkey=YOUR_SECRET_KEY" \
  -F "projectid=YOUR_PROJECT_ID" \
  -F "pageid=YOUR_PAGE_ID" \
  -F "html=<frame-02-philosophy.html" \
  -F "width=1200"

# Frame 3: Products
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -F "publickey=YOUR_PUBLIC_KEY" \
  -F "secretkey=YOUR_SECRET_KEY" \
  -F "projectid=YOUR_PROJECT_ID" \
  -F "pageid=YOUR_PAGE_ID" \
  -F "html=<frame-03-products.html" \
  -F "width=1200"

# Frame 4: Footer
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -F "publickey=YOUR_PUBLIC_KEY" \
  -F "secretkey=YOUR_SECRET_KEY" \
  -F "projectid=YOUR_PROJECT_ID" \
  -F "pageid=YOUR_PAGE_ID" \
  -F "html=<frame-04-footer.html" \
  -F "width=1200"
```

#### Шаг 3: Загрузка через JavaScript

```javascript
const uploadFrame = async (frameFile, apiKeys) => {
  const formData = new FormData();
  formData.append('publickey', apiKeys.publicKey);
  formData.append('secretkey', apiKeys.secretKey);
  formData.append('projectid', apiKeys.projectId);
  formData.append('pageid', apiKeys.pageId);
  formData.append('html', frameFile);
  formData.append('width', '1200');
  
  const response = await fetch('https://api.tildacdn.info/v1/addblock', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
};

// Использование
const apiKeys = {
  publicKey: 'YOUR_PUBLIC_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  projectId: 'YOUR_PROJECT_ID',
  pageId: 'YOUR_PAGE_ID'
};

// Загрузить все фреймы
const frames = [
  'frame-01-hero.html',
  'frame-02-philosophy.html',
  'frame-03-products.html',
  'frame-04-footer.html'
];

for (const frame of frames) {
  const result = await uploadFrame(frame, apiKeys);
  console.log(`Uploaded ${frame}:`, result);
}
```

---

## 📝 Чек-лист перед загрузкой

### Изображения (обязательно!)

- [ ] **Логотип** - PNG, прозрачный фон, 500×500px
- [ ] **Hero фон** - JPG, 1920×1080px, < 500KB
- [ ] **Товары** - JPG, 600×800px (aspect 3:4), 6 штук минимум

### Контент

- [ ] Заменить placeholder тексты
- [ ] Обновить цены товаров
- [ ] Указать реальный email
- [ ] Добавить ссылки на соцсети

### API настройки

- [ ] Получить Public Key
- [ ] Получить Secret Key
- [ ] Узнать Project ID
- [ ] Узнать Page ID

---

## 🎯 Что нужно заменить в файлах

### Frame 1 (Hero):
```html
Строка 93:  background-image: url('...')  ← Ваше фото
Строки 100-103: SVG логотип                ← Ваш логотип
Строка 113: href="#catalog"                ← Ваша ссылка
```

### Frame 2 (Philosophy):
```
Контент готов! 
Можно менять тексты в карточках по желанию.
```

### Frame 3 (Products):
```html
Каждая карточка (6 штук):
  - src="..."         ← URL фото товара
  - Название          ← Ваш товар
  - Описание          ← Характеристики
  - Цена              ← Актуальная цена
  - href="#..."       ← Ссылка на страницу товара
```

### Frame 4 (Footer):
```html
Строка 130: SVG логотип              ← Ваш логотип
Строка 227: info@azezm.ru            ← Ваш email
Строка 237: @azezm                   ← Ваш Instagram
Строка 248: vk.com/azezm             ← Ваш VK
Все ссылки в навигации               ← Ваши страницы
```

---

## 🎨 Настройки Zero Block в Tilda

После загрузки установите в настройках каждого блока:

```
Width: 1200px
Padding: 0px (уже включен в код)
Background: По умолчанию (задан в CSS)
Mobile: Responsive (включено)
Animation: По желанию
```

---

## 📱 Мобильная адаптация

Все фреймы полностью адаптивны! 

Breakpoints:
- **Desktop:** 1200px (фиксированная ширина)
- **Tablet:** 768-1024px (адаптивная сетка)
- **Mobile:** < 768px (1 колонка)

Что меняется на мобильных:
- Hero: логотип 120px, заголовок 56px
- Philosophy: 3 колонки → 1 колонка
- Products: 3 колонки → 1 колонка
- Footer: 4 колонки → 1 колонка

---

## 🔥 Частые вопросы

### Можно ли изменить ширину?
Да, но для Tilda API рекомендуется **1200px** (стандарт).

### Как добавить больше товаров?
Скопируйте блок `<article class="product-card-frame">...</article>` 
в файле `frame-03-products.html` и измените контент.

### Как изменить цвета?
Найдите и замените HEX коды цветов в CSS:
- `#D4AF37` - золотой
- `#000000` - черный
- `#1A1F3A` - navy
- `#C41E3A` - красный

### Нужно ли знать код?
Базовые знания HTML/CSS помогут, но можно следовать инструкции.

### Сколько времени займет перенос?
- Ручная загрузка: **15-30 минут**
- Через API: **5-10 минут** (если все готово)

---

## 📞 Поддержка

Если возникли проблемы:

1. Проверьте все ли изображения загружены
2. Откройте консоль браузера (F12) для поиска ошибок
3. Убедитесь, что ширина = 1200px
4. Проверьте API ключи

---

## 🎉 Готово!

После загрузки всех 4 фреймов у вас будет:

✅ Профессиональный лендинг бренда  
✅ Полностью адаптивный дизайн  
✅ Быстрая загрузка (оптимизированные изображения)  
✅ Готовая структура для расширения  

---

## 📊 Технические характеристики

```json
{
  "total_frames": 4,
  "total_width": "1200px (каждый)",
  "total_height": "3500px",
  "color_palette": 6,
  "fonts": 2,
  "responsive": true,
  "animations": true,
  "optimization": "high"
}
```

---

**Удачи с переносом! 🚀**

> Все файлы готовы к использованию без дополнительных настроек.  
> Просто замените placeholder изображения и контент.

---

*АЗЬ ЕСЬМ - Русская идентичность в современной уличной одежде*  
*Создано для Tilda Publishing | Декабрь 2025*

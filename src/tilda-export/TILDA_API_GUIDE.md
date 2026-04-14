# 🔌 АЗЬ ЕСЬМ - Гайд по переносу через Tilda API

## 📋 Требования к макету для Tilda API

### 1. Ширина фреймов: **1200px**
Все компоненты адаптированы под стандартную ширину контейнера Tilda.

### 2. Логичные фреймы (секции):
```
Frame 1: Hero Section (1200x800px)
Frame 2: Philosophy Section (1200x900px)
Frame 3: Products Grid (1200x1400px)
Frame 4: Footer (1200x400px)
```

### 3. Выравнивание:
- Все шейпы и текстовые блоки имеют одинаковую ширину: **1200px**
- Внутренние отступы: **40px** с каждой стороны
- Рабочая область контента: **1120px** (1200 - 80px)

---

## 📦 Структура экспорта

### Новые файлы для API:
```
/tilda-export/api/
├── frame-01-hero.html          ← Hero секция (1200x800)
├── frame-02-philosophy.html    ← Философия (1200x900)
├── frame-03-products.html      ← Товары (1200x1400)
├── frame-04-footer.html        ← Футер (1200x400)
└── tilda-api-config.json       ← Конфигурация для API
```

---

## 🎨 Параметры фреймов

### Frame 1: Hero Section
```json
{
  "width": 1200,
  "height": 800,
  "background": "#000000",
  "elements": [
    {
      "type": "image",
      "src": "logo.png",
      "width": 200,
      "height": 200,
      "x": 500,
      "y": 150
    },
    {
      "type": "text",
      "content": "АЗЬ ЕСЬМ",
      "fontSize": 96,
      "fontFamily": "Georgia",
      "color": "#FFFFFF",
      "letterSpacing": 0.2,
      "textAlign": "center",
      "width": 1200,
      "x": 0,
      "y": 380
    },
    {
      "type": "text",
      "content": "Русская идентичность в современной уличной одежде",
      "fontSize": 24,
      "color": "#FFFFFF",
      "opacity": 0.8,
      "textAlign": "center",
      "width": 1200,
      "x": 0,
      "y": 500
    },
    {
      "type": "button",
      "text": "Смотреть коллекцию",
      "width": 280,
      "height": 56,
      "x": 460,
      "y": 600,
      "background": "#D4AF37",
      "color": "#000000",
      "borderRadius": 8
    }
  ]
}
```

### Frame 2: Philosophy Section
```json
{
  "width": 1200,
  "height": 900,
  "background": "#1A1F3A",
  "padding": {
    "top": 80,
    "bottom": 80,
    "left": 40,
    "right": 40
  }
}
```

### Frame 3: Products Grid
```json
{
  "width": 1200,
  "height": 1400,
  "background": "#000000",
  "grid": {
    "columns": 3,
    "gap": 32,
    "itemWidth": 376,
    "itemHeight": 550
  }
}
```

### Frame 4: Footer
```json
{
  "width": 1200,
  "height": 400,
  "background": "#1A1F3A",
  "columns": 4,
  "columnWidth": 270
}
```

---

## 🚀 Быстрый старт

### Шаг 1: Подготовка
1. Установите размеры фреймов в Figma: **1200px ширина**
2. Убедитесь, что все элементы выровнены по сетке
3. Проверьте, что ширина контента = ширина шейпов = 1200px

### Шаг 2: Экспорт через API
```javascript
// Пример запроса к Tilda API
const createZeroBlock = async (frameData) => {
  const response = await fetch('https://api.tildacdn.info/v1/addblock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      publickey: 'YOUR_PUBLIC_KEY',
      secretkey: 'YOUR_SECRET_KEY',
      projectid: 'YOUR_PROJECT_ID',
      pageid: 'YOUR_PAGE_ID',
      html: frameData.html,
      width: 1200
    })
  });
  
  return response.json();
};
```

### Шаг 3: Загрузка фреймов
```bash
# 1. Hero
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -d "publickey=YOUR_KEY" \
  -d "html=@frame-01-hero.html" \
  -d "width=1200"

# 2. Philosophy
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -d "publickey=YOUR_KEY" \
  -d "html=@frame-02-philosophy.html" \
  -d "width=1200"

# 3. Products
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -d "publickey=YOUR_KEY" \
  -d "html=@frame-03-products.html" \
  -d "width=1200"

# 4. Footer
curl -X POST "https://api.tildacdn.info/v1/addblock" \
  -d "publickey=YOUR_KEY" \
  -d "html=@frame-04-footer.html" \
  -d "width=1200"
```

---

## 📐 Сетка для Figma

### Auto Layout параметры:
```
Horizontal padding: 40px
Vertical padding: 80px
Item spacing: 32px
Fixed width: 1200px
Height: Auto
```

### Колонки (для Philosophy и Footer):
```
Columns: 3 или 4
Gap: 32px
Column width: 
  - 3 колонки: 360px (1120 - 64) / 3
  - 4 колонки: 264px (1120 - 96) / 4
```

### Карточки товаров:
```
3 колонки по 360px
Gap: 32px
Aspect ratio: 3:4
Height: 480px
```

---

## ⚙️ Настройки для Zero Block

### Базовые параметры:
- **Container width:** 1200px
- **Padding horizontal:** 40px
- **Padding vertical:** 80px
- **Responsive:** Auto (для мобильных)

### Breakpoints:
```css
Desktop:  1200px (фиксированная ширина)
Tablet:   768px  (адаптивная)
Mobile:   320px  (адаптивная)
```

---

## 🎯 Чек-лист перед экспортом

### Размеры:
- [ ] Ширина фрейма = 1200px
- [ ] Все элементы внутри контейнера 1200px
- [ ] Внутренние отступы 40px

### Выравнивание:
- [ ] Текст и шейпы имеют одинаковую ширину
- [ ] Все элементы выровнены по центру
- [ ] Отступы между элементами кратны 8px

### Контент:
- [ ] Изображения оптимизированы (< 500KB)
- [ ] SVG иконки встроены inline
- [ ] Шрифты подключены (Georgia для заголовков)

### Стили:
- [ ] Цвета из бренд-палитры
- [ ] Hover эффекты добавлены
- [ ] Анимации настроены

---

## 🔧 Troubleshooting

### Проблема: Элементы не выравниваются
**Решение:** Убедитесь, что:
1. Контейнер ровно 1200px
2. Padding слева = Padding справа = 40px
3. Используется Auto Layout с Fixed Width

### Проблема: Текст выходит за границы
**Решение:** 
1. Установите `max-width: 1120px` для текстовых блоков
2. Добавьте `word-wrap: break-word`
3. Проверьте `letter-spacing`

### Проблема: Карточки не помещаются в сетку
**Решение:**
```
Ширина карточки = (1120 - gap × (n-1)) / n
Где n = количество колонок

Для 3 колонок:
(1120 - 32×2) / 3 = 352px ≈ 360px (с учетом округления)
```

---

## 📚 Полезные ссылки

- [Tilda API Документация](https://help.tilda.cc/api)
- [Zero Block Guide](https://help.tilda.cc/zero)
- [Figma Auto Layout](https://help.figma.com/hc/en-us/articles/360040451373)

---

**Готово к экспорту? Используйте файлы из `/tilda-export/api/`**

> Все HTML файлы уже оптимизированы для ширины 1200px и готовы к загрузке через Tilda API

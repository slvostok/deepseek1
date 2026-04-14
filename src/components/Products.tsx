import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, X, Upload, Edit2, Save, Trash2, Images } from 'lucide-react';

interface Product {
  id: string;
  name?: string;
  description?: string;
  details?: string;
  price?: string;
  image: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
    price: '',
    image: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('brandbook-products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading products:', e);
      }
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      try {
        localStorage.setItem('brandbook-products', JSON.stringify(products));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          alert('❌ Хранилище браузера переполнено!\n\nУдалите несколько карточек кнопкой "Очистить все" или используйте ссылки на изображения (URL) вместо загрузки файлов.\n\nСовет: ссылки занимают в 100+ раз меньше места чем загруженные файлы.');
          console.error('LocalStorage quota exceeded');
          // Try to rollback to previous state
          const saved = localStorage.getItem('brandbook-products');
          if (saved) {
            try {
              const prevProducts = JSON.parse(saved);
              setProducts(prevProducts);
            } catch (rollbackError) {
              console.error('Error rolling back:', rollbackError);
            }
          }
        } else {
          console.error('Error saving to localStorage:', e);
        }
      }
    } else {
      localStorage.removeItem('brandbook-products');
    }
  }, [products]);

  const phrases = [
    { text: 'Я есть', description: 'Основной слоган бренда' },
    { text: 'Не бросай себя', description: 'Напоминание о верности себе' },
    { text: 'Любовь как сопротивление', description: 'Философская позиция' },
    { text: 'Тихий свет', description: 'Метафора внутренней силы' },
    { text: 'Этот след остался', description: 'О памяти и наследии' },
  ];

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', description: '', details: '', price: '', image: '' });
    setImageUrl('');
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setIsAdding(false);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      details: product.details || '',
      price: product.price || '',
      image: product.image,
    });
    setImageUrl('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту карточку?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.image) {
      alert('Добавьте изображение');
      return;
    }

    // Clean up empty string fields - only include fields with actual values
    const cleanedData: Partial<Product> = {
      image: formData.image,
    };
    
    if (formData.name?.trim()) cleanedData.name = formData.name.trim();
    if (formData.description?.trim()) cleanedData.description = formData.description.trim();
    if (formData.details?.trim()) cleanedData.details = formData.details.trim();
    if (formData.price?.trim()) cleanedData.price = formData.price.trim();

    if (editingId) {
      // Update existing
      setProducts(products.map(p => 
        p.id === editingId 
          ? { ...cleanedData, id: editingId } as Product
          : p
      ));
      setEditingId(null);
    } else {
      // Add new
      const newProduct: Product = {
        ...cleanedData,
        id: Date.now().toString(),
      } as Product;
      setProducts([...products, newProduct]);
      setIsAdding(false);
    }

    setFormData({ name: '', description: '', details: '', price: '', image: '' });
    setImageUrl('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', description: '', details: '', price: '', image: '' });
    setImageUrl('');
  };

  const handleImageAdd = (url: string) => {
    setFormData({ ...formData, image: url });
    setImageUrl('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
      handleImageAdd(url);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size (warn if > 1MB)
      if (file.size > 1024 * 1024) {
        if (!confirm('Файл больше 1MB. Это может привести к переполнению хранилища браузера. Продолжить?')) {
          e.target.value = '';
          return;
        }
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleImageAdd(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultiFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check total size
    const totalSize = Array.from(files).reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(1);
    
    if (totalSize > 5 * 1024 * 1024) {
      if (!confirm(`Общий размер файлов: ${totalSizeMB}MB. Это может переполнить хранилище браузера. Продолжить?`)) {
        e.target.value = '';
        return;
      }
    }

    // Read all files and create products
    const newProducts: Product[] = [];
    let filesProcessed = 0;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newProducts.push({
            id: `${Date.now()}-${index}`,
            image: event.target.result as string,
          });
          
          filesProcessed++;
          
          // When all files are processed, add them to products
          if (filesProcessed === files.length) {
            try {
              const updatedProducts = [...products, ...newProducts];
              // Test if we can save before updating state
              localStorage.setItem('brandbook-products-test', JSON.stringify(updatedProducts));
              localStorage.removeItem('brandbook-products-test');
              
              setProducts(updatedProducts);
              alert(`✅ Успешно загружено ${newProducts.length} изображений!`);
            } catch (error) {
              if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                alert(`❌ Не удалось сохранить изображения - хранилище переполнено!\n\nУдалите старые карточки кнопкой "Очистить все" или используйте ссылки на изображения (URL).\n\nТекущее количество карточек: ${products.length}`);
              } else {
                alert('❌ Ошибка при сохранении изображений');
              }
            }
            e.target.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ПРОДУКЦИЯ
          </h2>
          <div className="h-px w-24 bg-[#C41E3A] mx-auto mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto mb-4">
            Первая капсульная коллекция объединяет минимализм, философию и русский культурный код
          </p>
          <p className="text-white/50 text-sm italic">
            Совет: используйте изображения размером до 1MB для стабильной работы ({products.length} карточек загружено)
          </p>
        </div>

        {/* Add New Buttons */}
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-[#C41E3A] hover:bg-[#C41E3A]/80 text-white rounded transition-all"
          >
            <Plus className="w-5 h-5" />
            Добавить карточку
          </button>
          
          <label className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black rounded cursor-pointer transition-all">
            <Images className="w-5 h-5" />
            <span>Мультизагрузка фото</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiFileSelect}
              className="hidden"
            />
          </label>
          
          {products.length > 0 && (
            <button
              onClick={() => {
                if (confirm(`Удалить все ${products.length} карточек? Это действие необратимо и освободит место в хранилище!`)) {
                  setProducts([]);
                  localStorage.removeItem('brandbook-products');
                  alert('✅ Все карточки удалены. Хранилище очищено.');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Очистить все ({products.length})
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="mb-12 bg-black/50 border border-[#C41E3A]/30 rounded-sm p-8">
            <h3 className="text-2xl text-white mb-6 tracking-wide">
              {editingId ? 'Редактировать карточку' : 'Новая карточка'}
            </h3>

            {/* Image Upload */}
            {!formData.image ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`border-2 border-dashed rounded-sm p-8 mb-6 text-center transition-all ${
                  isDragging
                    ? 'border-[#C41E3A] bg-[#C41E3A]/10'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-white/50" />
                <p className="text-white/70 mb-2">
                  Перетащите изображение сюда или используйте один из способов ниже
                </p>
                <p className="text-yellow-500/70 text-xs mb-4">
                  ⚠️ Рекомендуется использовать URL изображений вместо загрузки файлов для экономии памяти
                </p>
                
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Вставьте ссылку на изображение..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#C41E3A]"
                  />
                  <button
                    onClick={() => imageUrl && handleImageAdd(imageUrl)}
                    className="px-6 py-2 bg-[#C41E3A] hover:bg-[#C41E3A]/80 rounded transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <label className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded cursor-pointer transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  Выбрать файл с компьютера
                </label>
              </div>
            ) : (
              <div className="mb-6 relative">
                <div className="aspect-[3/4] max-w-sm mx-auto bg-black rounded-sm overflow-hidden">
                  <ImageWithFallback
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Form Fields - All Optional */}
            <div className="space-y-4">
              <p className="text-white/50 text-sm italic mb-4">
                Все текстовые поля опциональны — можете загрузить только изображение
              </p>
              
              <div>
                <label className="block text-white/70 mb-2 text-sm">Название (опционально)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='Например: Худи "Монах"'
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 text-sm">Описание (опционально)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание товара..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 text-sm">Детали (опционально)</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Дополнительные детали и особенно��ти..."
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 text-sm">Цена (опционально)</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Например: 8 990 ₽"
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#C41E3A] hover:bg-[#C41E3A]/80 text-white rounded transition-all"
              >
                <Save className="w-5 h-5" />
                Сохранить
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-black/50 border border-white/10 rounded-sm overflow-hidden hover:border-[#C41E3A]/50 transition-all group"
              >
                <div className="aspect-[3/4] bg-black overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name || 'Товар'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ display: 'block', maxWidth: '100%', height: '100%' }}
                  />
                  
                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {(product.name || product.description || product.details || product.price) && (
                  <div className="p-6">
                    {product.name && (
                      <h3 className="text-xl text-white mb-3 tracking-wide">
                        {product.name}
                      </h3>
                    )}
                    {product.description && (
                      <p className="text-white/70 mb-3 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    {product.details && (
                      <p className="text-white/50 text-xs italic mb-2">
                        {product.details}
                      </p>
                    )}
                    {product.price && (
                      <p className="text-[#D4AF37]">
                        {product.price}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-20">
            <p className="text-white/50 text-lg mb-4">Карточки продуктов пока не добавлены</p>
            <p className="text-white/30 text-sm">Нажмите "Добавить карточку" чтобы создать первую карточку</p>
          </div>
        )}

        {/* Phrases Section */}
        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 border border-white/10 rounded-sm mb-20">
          <h3 className="text-2xl text-white mb-8 tracking-wide text-center">
            Философские надписи
          </h3>
          <p className="text-white/60 text-center mb-10 max-w-2xl mx-auto">
            Короткие фразы на одежде — не просто принты, а напоминания о ценностях бренда
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className="bg-black/30 p-6 border-l-2 border-[#D4AF37] rounded-r-sm"
              >
                <p className="text-xl text-white mb-2 tracking-wide">
                  «{phrase.text}»
                </p>
                <p className="text-white/50 text-sm italic">
                  {phrase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Principles */}
        <div>
          <h3 className="text-2xl text-white mb-8 tracking-wide text-center">
            Принципы производства
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
              <div className="w-16 h-16 bg-[#C41E3A]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C41E3A]/50">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="text-white mb-3 tracking-wide">Натуральные материалы</h4>
              <p className="text-white/60 text-sm">
                Только натуральные ткани: хлопок, лён, шерсть
              </p>
            </div>

            <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/50">
                <span className="text-2xl">✂️</span>
              </div>
              <h4 className="text-white mb-3 tracking-wide">Ручная работа</h4>
              <p className="text-white/60 text-sm">
                Неровные строчки, детали ручной работы
              </p>
            </div>

            <div className="bg-black/50 p-8 border border-white/10 rounded-sm text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/50">
                <span className="text-2xl">🇷🇺</span>
              </div>
              <h4 className="text-white mb-3 tracking-wide">Локальное производство</h4>
              <p className="text-white/60 text-sm">
                Поддержка российских производителей
              </p>
            </div>
          </div>
        </div>

        {/* Design Inspiration */}
        <div className="mt-16 bg-gradient-to-br from-[#C41E3A]/10 to-transparent p-10 border border-[#C41E3A]/20 rounded-sm">
          <h3 className="text-2xl text-white mb-6 tracking-wide">Источники вдохновения</h3>
          <div className="grid md:grid-cols-2 gap-6 text-white/70">
            <div>
              <h4 className="text-white mb-3">Исторические элементы:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Гусарская военная форма</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Одежда монахов и священнослужителей</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Царские и боярские одежды</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">Визуальные мотивы:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Рисунки с фресок</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Узоры в русском стиле</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Исторические эпизоды</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

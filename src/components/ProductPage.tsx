import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useCart } from './CartContext';
import { Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useProducts } from './useProducts';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { products, loading } = useProducts();

  const product = products.find((p) => p.id === id);

  // Set default values for optional fields
  const productImages = product?.images || [];
  const productSizes = product?.sizes || [];
  const productFeatures = product?.features || [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-white/60">Загрузка...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl mb-4">Товар не найден</h1>
        <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Выберите размер');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: productImages[0] || '', // Use first image or empty string if no images
    });

    toast.success('Товар добавлен в корзину');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-8 text-white/60 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[#1A1F3A]">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-[#D4AF37]'
                      : 'border-transparent hover:border-[#D4AF37]/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            {product.name}
          </h1>
          
          <p className="text-3xl mb-6 text-white">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>

          <p className="text-white/70 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg">Выберите размер:</h3>
            <div className="flex flex-wrap gap-3">
              {productSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-16 rounded-lg border-2 transition-all ${
                    selectedSize === size
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                      : 'border-[#D4AF37]/30 hover:border-[#D4AF37] text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            onClick={handleAddToCart}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black mb-8"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Добавить в корзину
          </Button>

          {/* Features */}
          {productFeatures.length > 0 && (
            <div className="border-t border-white/10 pt-8">
              <h3 className="mb-4 text-lg text-[#D4AF37]">Характеристики:</h3>
              <ul className="space-y-3">
                {productFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-[#1A1F3A] rounded-lg">
            <h3 className="mb-3 text-[#D4AF37]">Доставка и возврат</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>• Бесплатная доставка по России от 5000 ₽</li>
              <li>• Возврат в течение 14 дней</li>
              <li>• Гарантия качества на все изделия</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
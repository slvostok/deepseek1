import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './ui/button';
import { useProducts } from './useProducts';

const categories = {
  all: 'Все товары',
  hoodies: 'Худи',
  tshirts: 'Футболки',
  shirts: 'Рубашки',
  pants: 'Брюки',
};

export function CatalogPage() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const { products, loading } = useProducts();

  const currentCategory = category || 'all';
  
  let filteredProducts = currentCategory === 'all'
    ? products
    : products.filter((p) => p.category === currentCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-white/60">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
          {categories[currentCategory as keyof typeof categories]}
        </h1>
        <p className="text-white/60">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'товар' : 'товаров'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(categories).map(([key, label]) => (
          <Link key={key} to={key === 'all' ? '/catalog' : `/catalog/${key}`}>
            <Button
              variant={currentCategory === key ? 'default' : 'outline'}
              className={
                currentCategory === key
                  ? 'bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90'
                  : 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
              }
            >
              {label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Sort Options */}
      <div className="mb-8 flex items-center gap-4">
        <span className="text-white/60">Сортировать:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-[#1A1F3A] border border-[#D4AF37]/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="name">По названию</option>
          <option value="price-low">По цене (возрастание)</option>
          <option value="price-high">По цене (убывание)</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4] bg-[#1A1F3A]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white bg-[#D4AF37] px-6 py-2 rounded-full">
                  Подробнее
                </span>
              </div>
            </div>
            <h3 className="text-lg mb-2 group-hover:text-[#D4AF37] transition-colors">
              {product.name}
            </h3>
            <p className="text-[#D4AF37]">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/60 text-xl">
            Товары в этой категории скоро появятся
          </p>
        </div>
      )}
    </div>
  );
}
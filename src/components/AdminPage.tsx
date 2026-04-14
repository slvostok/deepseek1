import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Package, ShoppingBag, LogOut, LayoutGrid, List, Truck, CreditCard, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { AdminLogin } from './AdminLogin';
import { ImageUpload } from './ImageUpload';
import { OrderKanban } from './OrderKanban';
import { DeliverySettings } from './DeliverySettings';
import { PaymentSettings } from './PaymentSettings';
import { PreOrdersTab } from './PreOrdersTab';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  features?: string[]; // Optional product features
}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'pre-orders' | 'delivery' | 'payment'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;

  useEffect(() => {
    // Check if user is authenticated in session storage
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Update images when editing product changes
    setProductImages(editingProduct?.images || []);
  }, [editingProduct]);

  const handleLogin = (password: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      images: productImages, // Use images from state instead of form field
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()),
      inStock: formData.get('inStock') === 'true',
      features: formData.get('features') ? (formData.get('features') as string).split(',').map(f => f.trim()) : [],
    };

    try {
      const url = editingProduct
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;
      
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await fetchProducts();
        setIsDialogOpen(false);
        setEditingProduct(null);
        setProductImages([]); // Reset images
      } else {
        throw new Error('Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Не удалось сохранить товар');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        await fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Не удалось удалить товар');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Не удалось обновить статус заказа');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mb-8 text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
          Панель управления
        </h1>

        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-900">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 transition-colors ${
              activeTab === 'products'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Package className="inline-block mr-2 w-5 h-5" />
            Товары ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ShoppingBag className="inline-block mr-2 w-5 h-5" />
            Заказы ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('pre-orders')}
            className={`pb-4 px-4 transition-colors ${
              activeTab === 'pre-orders'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Gift className="inline-block mr-2 w-5 h-5" />
            Предзаказы
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-4 px-4 transition-colors ${
              activeTab === 'delivery'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Truck className="inline-block mr-2 w-5 h-5" />
            Доставка
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`pb-4 px-4 transition-colors ${
              activeTab === 'payment'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <CreditCard className="inline-block mr-2 w-5 h-5" />
            Оплата
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingProduct(null)}
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Добавить товар
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1A1F3A] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-[#D4AF37]">
                      {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Название</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingProduct?.name}
                        required
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена (₽)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={editingProduct?.price}
                        required
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select name="category" defaultValue={editingProduct?.category || 'hoodies'}>
                        <SelectTrigger className="bg-black border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1F3A] text-white border-white/20">
                          <SelectItem value="hoodies">Худи</SelectItem>
                          <SelectItem value="tshirts">Футболки</SelectItem>
                          <SelectItem value="shirts">Рубашки</SelectItem>
                          <SelectItem value="pants">Брюки</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProduct?.description}
                        className="bg-black border-white/20 text-white"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label>Изображения</Label>
                      <ImageUpload
                        onImagesChange={setProductImages}
                        initialImages={productImages}
                        maxImages={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sizes">Размеры (через запятую)</Label>
                      <Input
                        id="sizes"
                        name="sizes"
                        defaultValue={editingProduct?.sizes.join(', ') || 'S, M, L, XL'}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inStock">В наличии</Label>
                      <Select name="inStock" defaultValue={editingProduct?.inStock !== false ? 'true' : 'false'}>
                        <SelectTrigger className="bg-black border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1F3A] text-white border-white/20">
                          <SelectItem value="true">Да</SelectItem>
                          <SelectItem value="false">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="features">Особенности (через запятую)</Label>
                      <Input
                        id="features"
                        name="features"
                        defaultValue={editingProduct?.features?.join(', ') || ''}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setEditingProduct(null);
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                      >
                        Сохранить
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-[#1A1F3A] rounded-lg overflow-hidden border border-white/10">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl mb-2">{product.name}</h3>
                    <p className="text-[#D4AF37] mb-2">{product.price.toLocaleString('ru-RU')} ₽</p>
                    <p className="text-white/60 text-sm mb-2">{product.category}</p>
                    <p className="text-white/60 text-sm mb-4">
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsDialogOpen(true);
                        }}
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Изменить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12 text-white/60">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Товары еще не добавлены</p>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <OrderKanban orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        )}

        {/* Pre-Orders Tab */}
        {activeTab === 'pre-orders' && (
          <PreOrdersTab />
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <DeliverySettings />
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <PaymentSettings />
        )}

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="border-red-500 text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
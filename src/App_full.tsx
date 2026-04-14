// ПОЛНАЯ ВЕРСИЯ САЙТА - Сохранено для восстановления
// Чтобы вернуть сайт: скопируйте этот код обратно в App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DeliveryPage } from './components/DeliveryPage';
import { PhilosophyPage } from './components/PhilosophyPage';
import { AdminPage } from './components/AdminPage';
import { CartProvider } from './components/CartContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <CartProvider>
      <Router basename="/">
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="*" element={<HomePage />} />
              <Route path="/philosophy" element={<PhilosophyPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </CartProvider>
  );
}

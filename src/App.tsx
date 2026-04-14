import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./styles/globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { CatalogPage } from "./components/CatalogPage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { PreOrderPage } from "./components/PreOrderPage";
import { DeliveryPage } from "./components/DeliveryPage";
import { PhilosophyPage } from "./components/PhilosophyPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { LoginPage } from "./components/LoginPage";
import { AccountPage } from "./components/AccountPage";
import { AdminPage } from "./components/AdminPage";
import { PaymentSuccessPage } from "./components/PaymentSuccessPage";
import { CartProvider } from "./components/CartContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <CartProvider>
      <Router basename="/">
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/philosophy"
                element={<PhilosophyPage />}
              />
              <Route
                path="/catalog"
                element={<CatalogPage />}
              />
              <Route
                path="/catalog/:category"
                element={<CatalogPage />}
              />
              <Route
                path="/product/:id"
                element={<ProductPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/pre-order"
                element={<PreOrderPage />}
              />
              <Route
                path="/delivery"
                element={<DeliveryPage />}
              />
              <Route
                path="/payment-success"
                element={<PaymentSuccessPage />}
              />
              <Route
                path="/privacy-policy"
                element={<PrivacyPolicyPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/account"
                element={<AccountPage />}
              />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </CartProvider>
  );
}
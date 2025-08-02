import { Routes, Route, Navigate } from 'react-router-dom';
import Login  from './pages/Login';
import { Home } from "./pages/Home";
import { SellerProductsPage } from './pages/SellerProductsPage';
import { useAuth } from "./context/AuthContext";
import SellersPage from './pages/SellersPage';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage';
import { RegisterForm } from "./components/RegisterForm";
import "keen-slider/keen-slider.min.css"
import { VendorDashboard } from './components/VendorDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { PaypalRedirectPage } from './components/PaypalRedirectPage';
import { InactiveProductsPage } from './pages/InactiveProductsPage';
import {SearchResultsPage} from './pages/SearchResultsPage';
import { ForgotPasswordForm } from "./pages/ForgotPasswordForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer />


function App() {
  const { isAuthenticated, isLoading } = useAuth();
  if(isLoading) return null;

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/seller/:sellerId" element={<SellerProductsPage />} />
        <Route path="/sellers" element={<SellersPage />} />
        <Route path="/products" element={<ProductsByCategoryPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/vendedor/dashboard" element={<VendorDashboard />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/categoria/:categoryId" element={<CategoryDetailPage/>}/>
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/paypal-redirect" element={<PaypalRedirectPage />} />
        <Route path="/vendedor/productos-inactivos" element={<InactiveProductsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
 
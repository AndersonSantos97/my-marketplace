import { Routes, Route, Navigate } from 'react-router-dom';
import Login  from './pages/Login';
import { Home } from "./pages/Home";
import { SellerProductsPage } from './pages/SellerProductsPage';
import { useAuth } from "./context/AuthContext";
import SellersPage from './pages/SellersPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/seller/:sellerId" element={<SellerProductsPage />} />
        <Route path="/sellers" element={<SellersPage />} />
      </Routes>
    </>
  );
}

export default App;
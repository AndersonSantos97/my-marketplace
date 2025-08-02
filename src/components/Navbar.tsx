import { useState } from "react";
import { CartIcon } from "../widgets/CartIcon";
import { CartModal } from "./CartModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
    const [isCartOpen, setCartOpen] = useState(false)
    const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate('/')
    // }

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [isOpen, setIsOpen] = useState(false);

  const isBuyer = user?.role === 1;

  return (
    <nav className="absolute top-0 left-0 w-full z-20 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/logo_b.png" className="h-10 w-auto" alt="Logo" />
          <span className="text-2xl font-heading font-bold text-white">Cibermarket</span>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Ítems de navegación en escritorio */}
        <div className="hidden md:flex items-center space-x-6">
          {user?.role === 1 && (
            <>
              <a onClick={() => navigate("/")} className="cursor-pointer hover:text-gray-400 transition">
                Inicio
              </a>
              <Link to="/sellers" className="hover:text-gray-400 transition">Vendedores</Link>
              <Link to="/products" className="hover:text-gray-400 transition">Productos</Link>
            </>
          )}

          {user?.role === 2 && (
            <>
              <Link to="/vendedor/dashboard" className="hover:text-gray-400 transition">Panel Vendedor</Link>
              <Link to="/vendedor/productos-inactivos" className="hover:text-gray-400 transition">Productos inactivos</Link>
            </>
          )}

          <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400 transition">
            <LogOut />
          </button>
          <button onClick={() => navigate("/perfil")} className="hover:text-gray-400 transition">
            <User />
          </button>

          {isBuyer && (
            <div onClick={() => setCartOpen(true)} className="cursor-pointer relative">
              <CartIcon />
            </div>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-black/80 backdrop-blur rounded p-4">
          {user?.role === 1 && (
            <>
              <a onClick={() => navigate("/")} className="block hover:text-gray-400 cursor-pointer">
                Inicio
              </a>
              <Link to="/sellers" className="block hover:text-gray-400">Vendedores</Link>
              <Link to="/products" className="block hover:text-gray-400">Productos</Link>
            </>
          )}

          {user?.role === 2 && (
            <>
              <Link to="/vendedor/dashboard" className="block hover:text-gray-400">Panel Vendedor</Link>
              <Link to="/vendedor/productos-inactivos" className="block hover:text-gray-400">Productos inactivos</Link>
            </>
          )}

          <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400">
            <LogOut />
            <span>Cerrar sesión</span>
          </button>
          <button onClick={() => navigate("/perfil")} className="block hover:text-gray-400">Perfil</button>

          {isBuyer && (
            <div onClick={() => setCartOpen(true)} className="cursor-pointer relative">
              <CartIcon />
            </div>
          )}
        </div>
      )}

      {/* CartModal fuera del menú para que no se pierda al cerrar */}
      {isBuyer && (
        <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      )}

      <SearchBar />
    </nav>
  );
};
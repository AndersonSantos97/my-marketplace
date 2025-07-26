import { useState } from "react";
import { CartIcon } from "../widgets/CartIcon";
import { CartModal } from "./CartModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
    const [isCartOpen, setCartOpen] = useState(false)
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

  const isBuyer = user?.role === 1;

  return (
    <nav className="absolute top-0 left-0 w-full z-20 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center space-x-3">
                <img src="/logo.svg" className="h-8" alt="Logo" />
                <span className="text-2xl font-heading font-bold text-white">
                    Cibermarket
                </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <a onClick={handleClick}  className="text-white hover:text-yellow-300 transition" aria-current="page">Inicio</a>
                <Link to="/sellers" className="text-white hover:text-yellow-300 transition">
                    Vendedores
                </Link>
                <Link to="/products" className="text-white hover:text-yellow-300 transition">
                    Productos
                </Link>
                {user?.role === 2 && (
                    <Link to="/vendedor/dashboard" className="text-white hover:text-yellow-300 transition">
                    Panel Vendedor
                    </Link>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-white hover:text-red-400 transition"
                >
                    <LogOut />
                </button>
                <button
                    onClick={() => navigate("/perfil")}
                    className="text-white hover:text-yellow-300 transition"
                >
                    <User />
                </button>
                {isBuyer && (
                    <div className="">
                        <div onClick={() => setCartOpen(true)} className="cursor-pointer">
                            <CartIcon />
                        </div>
                        <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    </nav>
  );
};
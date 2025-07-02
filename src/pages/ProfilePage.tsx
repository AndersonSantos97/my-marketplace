import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { Navbar } from "../components/Navbar";


export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "", password: "" });
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`/users/${user?.id}`, {
            name: formData.name,
            email: formData.email,
            ...(formData.password && { password: formData.password }),
            });
            alert("Perfil actualizado correctamente");
        } catch (err) {
            console.error(err);
            alert("Hubo un error al actualizar el perfil.");
        }
    };

  return (
    <>
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-15">
          <Navbar />
        </div>
      </header>
      <main className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="input w-full"
            value={formData.name}
            onChange={handleChange}
            />
            <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input w-full"
            value={formData.email}
            onChange={handleChange}
            />
            <input
            type="password"
            name="password"
            placeholder="Nueva contraseña (opcional)"
            className="input w-full"
            value={formData.password}
            onChange={handleChange}
            />
            <div className="flex justify-end gap-2">
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Guardar cambios
            </button>
            <button
                type="button"
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Cerrar sesión
            </button>
            </div>
        </form>
      </main>
    
    </>
  );
};
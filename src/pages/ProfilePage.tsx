import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { Navbar } from "../components/Navbar";
import toast from 'react-hot-toast'


export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    avatar_url: "",
  } );

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        bio: user.bio || "",
        avatar_url: user.avatar_url || "",
      });
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
          if (formData.password && formData.password !== formData.confirmPassword) {
          toast.error("Las contraseñas no coinciden.");
          return;
        }
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
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Navbar />
        </div>
      </header>

      <main className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow space-y-6">
        <h2 className="text-3xl font-heading text-dark">Mi perfil</h2>

        {/* Mensaje de error si las contraseñas no coinciden */}
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <div className="text-red-500 text-sm">
            Las contraseñas no coinciden.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Biografía */}
          <textarea
            name="bio"
            placeholder="Biografía"
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.bio}
            onChange={handleChange}
          />
          {/* Avatar URL */}
          <input
            type="url"
            name="avatar_url"
            placeholder="URL del avatar"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.avatar_url}
            onChange={handleChange}
          />
          {/* Contraseña */}
          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña (opcional)"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Confirmar Contraseña */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-700 transition"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </form>
      </main>
    </>
  );
};
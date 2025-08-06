import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token, refresh_token, user } = await loginUser(email, password);

      if (!access_token || typeof access_token !== "string" || !refresh_token) {
        throw new Error("Token inválido");
      }

      login(access_token, refresh_token, user);

      if (user.role === 2) {
        navigate("/vendedor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Imagen en el lado izquierdo */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="/images/login.png"
          alt="Iniciar sesión"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Formulario centrado */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <img src="/icono.png" alt="logo" className="w-30 md:w-34 lg:w-48 h-auto mx-auto mb-1"/>
          <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </a>
          </p>
          <p className="text-sm mt-2 text-center">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

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
      const { access_token, user } = await loginUser(email, password);

      if (!access_token || typeof access_token !== "string") {
        throw new Error("Token inválido");
      }

      login(access_token, user); // Asegúrate de que tu contexto de Auth guarde ambos

      alert("Login exitoso");

      // Redirigir según el rol
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
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p className="text-sm mt-4">
                ¿No tienes cuenta?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                    Regístrate aquí
                </a>
            </p>
        </>
    );
};
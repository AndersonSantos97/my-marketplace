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
            const token = await loginUser(email, password);
            if (!token || typeof token !== "string") {
            throw new Error("Token inválido");
            }
            login(token);
            alert("Login Exitoso");
            navigate("/");
        } catch (error: any) {
            console.error("Login error:", error.message);
            alert("Error al iniciar sesión: " + error.message);
        }
        };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};
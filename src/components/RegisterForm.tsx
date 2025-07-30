import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../api/users"

export const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState(1) // 1 = Comprador, 2 = Vendedor
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUser({
        name,
        email,
        role,
        bio,
        avatar_url: avatarUrl,
        password,
      })
      alert("Registro exitoso. Ahora puedes iniciar sesión.")
      navigate("/login")
    } catch (err: any) {
      console.error(err)
      alert("Error al registrar usuario: " + err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(parseInt(e.target.value))}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        >
          <option value={1}>Comprador</option>
          <option value={2}>Vendedor</option>
        </select>
        <textarea
          placeholder="Biografía"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          rows={3}
        />
        <input
          type="url"
          placeholder="URL del avatar"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}
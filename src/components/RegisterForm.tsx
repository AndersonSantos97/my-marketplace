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
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow-md"
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
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
        className="w-full mb-3 p-2 border border-gray-300 rounded"
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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Registrarse
      </button>
    </form>
  )
}
import axios from "./axiosInstance";

interface NewUser {
  name: string
  email: string
  role: number
  bio: string
  avatar_url: string
  password: string
}

export const createUser = async (data: NewUser) => {
  const response = await axios.post("/users/", data)
  return response.data
}
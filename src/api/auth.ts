//import axios from "axios";

const API = "http://127.0.0.1:8000";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: number;
    bio: string;
    avatar_url: string;
    created_at: string;
  };
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data; // asegúrate que esto sea string
};
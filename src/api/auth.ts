//import axios from "axios";

const API = "http://127.0.0.1:8000";


export const loginUser = async (email: string, password: string): Promise<string> => {
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
  return data.access_token; // asegúrate que esto sea string
};
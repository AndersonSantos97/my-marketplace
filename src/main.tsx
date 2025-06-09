import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; 
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter> 
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

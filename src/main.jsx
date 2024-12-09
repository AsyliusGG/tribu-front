import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App.jsx'
import './index.css'
import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

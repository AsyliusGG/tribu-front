import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App.jsx'
import './index.css'
import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

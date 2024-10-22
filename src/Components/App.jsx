import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StickyNavbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import LogIn from "./LogIn/LogIn.jsx";
import Joinus from "./Joinus/Joinus.jsx";
import Nosotras from "./Nosotras/Nosotras.jsx";
import Historia from "./NuestraHistoria/Historia.jsx";
import Tribu from "./Tribu/Tribu.jsx";
import Alianzas from "./Alianzas/Alianzas.jsx";
import PrivateRoute from "./PrivateRoute";
import Eventos from "./Eventos/Eventos.jsx";
import Home from "./Home";  // Importamos el nuevo componente Home
import CrearEvento from "./Eventos/CrearEvento.jsx";
import ModificarEvento from "./Eventos/ModificarEvento.jsx";
import EventosAdmin from "./Eventos/EventosAdmin.jsx";
import VerEvento from "./Eventos/VerEvento.jsx";
import AlianzasAdmin from "./Alianzas/AlianzasAdmin.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <StickyNavbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route path="/Tribu" element={<Tribu />} />
          <Route path="/Nosotras" element={<Nosotras />} />
          <Route
            path="/Historia"
            element={
              <PrivateRoute>
                <Historia />
              </PrivateRoute>
            }
          />
          <Route
            path="/Alianzas"
            element={
              <PrivateRoute>
                <Alianzas />
              </PrivateRoute>
            }
          />
          <Route
            path="/Eventos"
            element={
              <PrivateRoute>
                <Eventos />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route path="/joinus" element={<Joinus />} />
          <Route path="/Eventos" element={<Eventos />} />
          <Route path="/Eventos/EventosAdmin" element={<EventosAdmin />} />
          <Route path="/Eventos/CrearEvento" element={<CrearEvento />} />
          <Route path="/Components/eventos/CrearEvento" element={<CrearEvento />} />
          <Route path="/components/eventos/ModificarEvento" element={<ModificarEvento />} />
          <Route path="/Eventos/ModificarEvento/:id" element={<ModificarEvento />} />
          <Route path="/verevento/:id" element={<VerEvento />} />
          <Route path="/Alianzas/AlianzasAdmin" element={<AlianzasAdmin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

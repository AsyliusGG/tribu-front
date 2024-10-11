import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StickyNavbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import Joinus from "./Joinus/Joinus.jsx";
import Nosotras from "./Nosotras/Nosotras.jsx";
import Historia from "./NuestraHistoria/Historia.jsx";
import Tribu from "./Tribu/Tribu.jsx";
import Alianzas from "./Navbar/Alianzas/Alianzas.jsx";
import PrivateRoute from "./PrivateRoute";
import Eventos from "./Navbar/Eventos/Eventos.jsx";
import Home from "./Home";  // Importamos el nuevo componente Home

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
          <Route path="/SignIn" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/Joinus" element={<Joinus />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

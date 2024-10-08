import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StickyNavbar from "./Navbar/Navbar.jsx";
import RecentPosts from "./RecentPost/RecentPosts.jsx";
import JoinSection from "./JoinSection/JoinSection.jsx";
import Footer from "./Footer/Footer.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import Joinus from "./Joinus/Joinus.jsx";
import Nosotras from "./Nosotras/Nosotras.jsx";
import Historia from "./NuestraHistoria/Historia.jsx";
import Tribu from "./Tribu/Tribu.jsx";
import Eventos from "./Navbar/Eventos/Eventos.jsx";
import Alianzas from "./Navbar/Alianzas/Alianzas.jsx";
import Carousel from "./Carousel/Carousel.jsx";

function App() {
  return (
    <Router>
      <div>
        <StickyNavbar /> {/* Barra de navegación */}
        <Routes>
          {/* La ruta "/" apuntará a este mismo componente como Home */}
          <Route
            path="/"
            element={
              <div>
                {/* Aquí va el contenido de Home */}
                {/* Otros componentes o secciones que quieras en la Página principal */}
                <Carousel />
                <Eventos />
                <RecentPosts />
                <JoinSection />
                
              </div>
            }
          />
          {/* Otras rutas, como el SignIn */}
          <Route path="/Historia" element={<Historia />} /> {/* Página de Nosotras */}
          <Route path="/Tribu" element={<Tribu />} /> {/* Página de Nosotras */}
          <Route path="/Nosotras" element={<Nosotras />} /> {/* Página de Nosotras */}
          <Route path="/Alianzas" element={<Alianzas />} /> {/* Página de Nosotras */}
          <Route path="/Eventos" element={<Eventos />} /> {/* Página de Nosotras */}
          <Route path="/SignIn" element={<SignIn />} /> {/* Página de SignIn */}
          <Route path="/Joinus" element={<Joinus />} /> {/* Página de JoinUs */}

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StickyNavbar from "./Navbar/Navbar.jsx";
import RecentPosts from "./RecentPost/RecentPosts.jsx";
import JoinSection from "./JoinSection/JoinSection.jsx";
import Footer from "./Footer/Footer.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import Joinus from "./JoinUs/Joinus.jsx";

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
                <RecentPosts />
                <JoinSection />
                <Footer />
              </div>
            }
          />
          {/* Otras rutas, como el SignIn */}
          <Route path="/SignIn" element={<SignIn />} /> {/* Página de SignIn */}
          <Route path="/Joinus" element={<Joinus />} /> {/* Página de JoinUs */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

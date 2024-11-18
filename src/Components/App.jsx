// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../Components/store/store.js";
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
import Home from "./Home";
import CrearEvento from "./Eventos/CrearEvento.jsx";
import ModificarEvento from "./Eventos/ModificarEvento.jsx";
import EventosAdmin from "./Eventos/EventosAdmin.jsx";
import VerEvento from "./Eventos/VerEvento.jsx";
import AlianzasAdmin from "./Alianzas/AlianzasAdmin.jsx";
import CarritoCompra from "./Compra/CarritoCompra.jsx";
import CrearAlianza from "./Alianzas/CrearAlianza.jsx";
import ModificarAlianza from "./Alianzas/ModificarAlianza.jsx";
import VerAlianza from "./Alianzas/VerAlianza.jsx";
import UsarAlianza from "./Alianzas/UsarAlianza.jsx";
import Contacto from "./Contacto/Contacto.jsx";
import AdminSettings from "./Dashboard/AdminSettings.jsx";
import ConfirmacionCompra from "./Compra/ConfirmarCompra.jsx";
import ErrorPago from "./Compra/ErrorPago.jsx";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tribu" element={<Tribu />} />
          <Route path="/Nosotras" element={<Nosotras />} />
          <Route path="/Historia" element={<Historia />} />
          <Route path="/confirmacion-pago" element={<ConfirmacionCompra />} />
          <Route path="/error-pago" element={<ErrorPago />} />
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
          <Route path="/login" element={<LogIn />} />
          <Route path="/joinus" element={<Joinus />} />
          <Route path="/Eventos" element={<Eventos />} />
          <Route path="/Eventos/EventosAdmin" element={<EventosAdmin />} />
          <Route path="/Eventos/CrearEvento" element={<CrearEvento />} />
          <Route
            path="/Components/eventos/CrearEvento"
            element={<CrearEvento />}
          />
          <Route
            path="/Eventos/ModificarEvento/:id"
            element={<ModificarEvento />}
          />
          <Route path="/verevento/:id" element={<VerEvento />} />
          <Route path="/Alianzas/AlianzasAdmin" element={<AlianzasAdmin />} />
          <Route path="/CarritoCompra" element={<CarritoCompra />} />
          <Route path="/Alianzas/VerAlianza/:id" element={<VerAlianza />} />
          <Route path="/Alianzas/CrearAlianza" element={<CrearAlianza />} />
          <Route
            path="/Alianzas/ModificarAlianza/:id"
            element={<ModificarAlianza />}
          />
          <Route path="/Alianzas/UsarAlianza/:id" element={<UsarAlianza />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/AdminSettings" element={<AdminSettings />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

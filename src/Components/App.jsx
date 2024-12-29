// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../Components/store/store.js";
import StickyNavbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import LogIn from "./LogIn/LogIn.jsx";
import Joinus from "./Joinus/Joinus.jsx";
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
import { CarritoProvider } from "./Compra/CarritoContext.jsx";
import ActivatePage from "./ActivatePage/ActivatePage.jsx";
import Perfil from "./Perfil/Perfil.jsx";
import ComprobarMembresia from "./Alianzas/ComprobarUsuario.jsx";
import Membresia from "./Membresia/Membresia.jsx";
import ConfirmarCorreoAviso from "./ActivatePage/ConfirmarCorreoAviso.jsx";
import AddSector from "./Dashboard/AddSector.jsx";
import ConfirmarCompraEvento from "./Compra/ConfirmarCompraEvento.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CarritoProvider>
          <StickyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Tribu" element={<Tribu />} />
            <Route path="/Historia" element={<Historia />} />
            <Route path="/confirmacion-pago" element={<ConfirmacionCompra />} />
            <Route path="/error-pago" element={<ErrorPago />} />
            <Route path="/activate/:uid/:token" element={<ActivatePage />} />
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
            <Route
              path="/Eventos/EventosAdmin"
              element={
                <PrivateRoute>
                  <EventosAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/Eventos/CrearEvento"
              element={
                <PrivateRoute>
                  <CrearEvento />
                </PrivateRoute>
              }
            />
            <Route
              path="/Perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route
              path="/Components/eventos/CrearEvento"
              element={<CrearEvento />}
            />
            <Route
              path="/Eventos/ModificarEvento/:id"
              element={<ModificarEvento />}
            />
            <Route
              path="Eventos/verEvento/:id"
              element={
                <PrivateRoute>
                  <VerEvento />
                </PrivateRoute>
              }
            />
            <Route
              path="/Alianzas/ComprobarUsuario/"
              element={
                
                  <ComprobarMembresia/>
                
              }
            />
            <Route
              path="/Alianzas/AlianzasAdmin"
              element={
                <PrivateRoute>
                  <AlianzasAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/CarritoCompra"
              element={
                <PrivateRoute>
                  <CarritoCompra />
                </PrivateRoute>
              }
            />
            <Route
              path="/Alianzas/VerAlianza/:id"
              element={
                <PrivateRoute>
                  <VerAlianza />
                </PrivateRoute>
              }
            />
            <Route
              path="/Alianzas/CrearAlianza"
              element={
                <PrivateRoute>
                  <CrearAlianza />
                </PrivateRoute>
              }
            />
            <Route
              path="/Alianzas/ModificarAlianza/:id"
              element={
                <PrivateRoute>
                  <ModificarAlianza />
                </PrivateRoute>
              }
            />
            <Route
              path="/Alianzas/UsarAlianza/:id"
              element={
                <PrivateRoute>
                  <UsarAlianza />
                </PrivateRoute>
              }
            />
            <Route path="/Contacto" element={<Contacto />} />
            <Route
              path="/AdminSettings"
              element={
                <PrivateRoute>
                  <AdminSettings />
                </PrivateRoute>
              }
            />
                        <Route
              path="/Dashboard/AddSector"
              element={
                <PrivateRoute>
                  <AddSector />
                </PrivateRoute>
              }
            />
            <Route path="/confirmar_pago" element={<ConfirmacionCompra />} />
            <Route path="/confirmar_pago_evento" element={<ConfirmarCompraEvento />} />
            <Route path="/error_pago" element={<ErrorPago />} />
            <Route path="/membership/:uuid" element ={<ComprobarMembresia />} />
            <Route path="/Membresia" element={<Membresia />} />
            <Route path="/confirmarCorreo" element={<ConfirmarCorreoAviso />} />
          </Routes>
          <Footer />
        </CarritoProvider>
      </Router>
    </Provider>
  );
}

export default App;

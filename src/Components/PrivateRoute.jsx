import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // Si no está autenticado, redirige al inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si está autenticado, muestra el contenido de la ruta
  return children;
};

export default PrivateRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth); // Obtener `token` y `user` desde el estado de Redux

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  if (user && !user.is_active) {
    // Si el usuario está autenticado pero su cuenta no está activada
    return <Navigate to="/confirmarCorreo" />;
  }

  if (user && user.is_active && !user.memberships_active) {
    // Si el usuario está autenticado y su cuenta está activada pero no tiene membresía activa
    return <Navigate to="/membresia" />;
  }

  return children; // Si todo está bien, renderizar el componente hijo
};

export default PrivateRoute;

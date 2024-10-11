import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Eventos from "./Navbar/Eventos/Eventos";
import RecentPosts from "./RecentPost/RecentPosts";
import JoinSection from "./JoinSection/JoinSection";
import { Alert } from "@material-tailwind/react";

// Reutilizamos el componente AlertCustomStyles con estilos personalizados para la posición
function AlertCustomStyles({ message }) {
  return (
    <Alert
      color="green"
      className="fixed top-20 right-4 z-50"  // Posicionamos la alerta a la derecha y cerca de la parte superior
      style={{ width: "auto", minWidth: "200px" }}  // Ajuste opcional para el tamaño
    >
      {message}
    </Alert>
  );
}

const Home = ({ isAuthenticated }) => {
  const location = useLocation();  // Hook para obtener el estado pasado con navigate
  const navigate = useNavigate();  // Para navegar y limpiar el estado
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");

  // Usamos useEffect para eliminar el mensaje después de unos segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");  // Elimina el mensaje después de 3 segundos
        // Limpiamos el estado de location para evitar que el mensaje persista tras la recarga
        navigate("/", { replace: true });
      }, 3000);  // 3000ms = 3 segundos

      return () => clearTimeout(timer);  // Limpiamos el timeout si el componente se desmonta
    }
  }, [successMessage, navigate]);

  return (
    <div>
      {/* Mostrar el mensaje de éxito de inicio de sesión usando AlertCustomStyles */}
      {successMessage && <AlertCustomStyles message={successMessage} />}
      
      <Carousel />
      {isAuthenticated && (
        <>
          <Eventos />
          <RecentPosts />
        </>
      )}
      <JoinSection />
    </div>
  );
};

export default Home;

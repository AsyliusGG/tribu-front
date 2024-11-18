import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "./Carousel/Carousel";
import JoinSection from "./JoinSection/JoinSection";
import { Alert } from "@material-tailwind/react";
import ProximosEventos from "./Eventos/ProximosEventos";
import { getUserInfo } from "../slices/authSlice";
import { useLocation } from "react-router-dom";

function AlertCustomStyles({ message }) {
  return (
    <Alert
      color="green"
      className="fixed top-20 right-4 z-50"
      style={{ width: "auto", minWidth: "200px" }}
    >
      {message}
    </Alert>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const message = location.state?.message;

  // Recuperar datos del usuario al montar si está autenticado
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserInfo());
    }
  }, [isAuthenticated, user, dispatch]);

  // Temporizador para mostrar mensajes de éxito
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div>
      {message && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {message}
        </div>
      )}
      {successMessage && <AlertCustomStyles message={successMessage} />}
      <Carousel />
      {!isAuthenticated && <JoinSection />}
      {isAuthenticated && (
        <div className="mt-10">
          <ProximosEventos />
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserInfo } from "../slices/authSlice";
import Carousel from "./Carousel/Carousel";
import JoinSection from "./JoinSection/JoinSection";
import ProximosEventos from "./Eventos/ProximosEventos";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [successMessage, setSuccessMessage] = useState("");
  const [membershipActive, setMembershipActive] = useState(false);
  const location = useLocation();
  const message = location.state?.message;

  // Recuperar datos del usuario al montar si está autenticado
  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (isAuthenticated && !user) {
      dispatch(getUserInfo());
    }
  }, [isAuthenticated, user, dispatch]);

  // Verificar si el usuario tiene una membresía activa
  useEffect(() => {
    const token = Cookies.get("auth_token");

    const checkMembership = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/memberships/${user.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const isActive = data.active && (!data.end_date || new Date(data.end_date) > new Date());
          setMembershipActive(isActive);
          if (!isActive) {
            navigate("/membresia");
          }
        } else if (response.status === 404) {
          navigate("/membresia");
        } else {
          console.error("Error al verificar la membresía del usuario");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    if (isAuthenticated && user) {
      checkMembership();
    }
  }, [isAuthenticated, user, navigate]);

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
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      <Carousel />
      {!isAuthenticated && <JoinSection />}
      {isAuthenticated && (
        <div className="mt-10">
          <ProximosEventos />
          {membershipActive ? (
            <div className="bg-green-100 text-green-800 p-4 rounded mt-4">
              Tienes una membresía activa.
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded mt-4">
              No tienes una membresía activa.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetearCarrito, extenderTiempo } from "../../slices/carritoSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirección
  const { items, expirationTime } = useSelector((state) => state.carrito); // Agregar items para verificar si el carrito tiene contenido
  const [timeLeft, setTimeLeft] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (items.length > 0 && expirationTime) {
      // Solo activa el temporizador si hay elementos en el carrito
      const interval = setInterval(() => {
        const remainingTime = expirationTime - Date.now();
        setTimeLeft(Math.max(remainingTime, 0));

        if (remainingTime <= 30000 && remainingTime > 0) {
          setShowWarning(true);
        }

        if (remainingTime <= 0) {
          clearInterval(interval);
          dispatch(resetearCarrito());
          setShowWarning(false);
          navigate("/"); // Redirigir al usuario a la página principal
          alert("Se acabó el tiempo");
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Si el carrito está vacío, reinicia los estados relacionados
      setTimeLeft(0);
      setShowWarning(false);
    }
  }, [items, expirationTime, dispatch, navigate]);

  // Detectar actividad del usuario y resetear el temporizador
  useEffect(() => {
    const resetActivityTimer = () => {
      if (items.length > 0) {
        dispatch(extenderTiempo());
      }
    };

    window.addEventListener("mousemove", resetActivityTimer);
    window.addEventListener("click", resetActivityTimer);
    window.addEventListener("keydown", resetActivityTimer);

    return () => {
      window.removeEventListener("mousemove", resetActivityTimer);
      window.removeEventListener("click", resetActivityTimer);
      window.removeEventListener("keydown", resetActivityTimer);
    };
  }, [dispatch, items]);

  const handleContinuar = () => {
    dispatch(extenderTiempo());
    setShowWarning(false);
  };

  const handleCancelar = () => {
    dispatch(resetearCarrito());
    setShowWarning(false);
  };

  return (
    <CarritoContext.Provider
      value={{ timeLeft, showWarning, handleContinuar, handleCancelar }}
    >
      {children}
      {items.length > 0 && showWarning && ( // Mostrar el mensaje solo si hay artículos en el carrito
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded shadow-lg">
          <p>El carrito está por vencerse. ¿Desea continuar?</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleContinuar}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Continuar
            </button>
            <button
              onClick={handleCancelar}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </CarritoContext.Provider>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetearCarrito, extenderTiempo } from "../../slices/carritoSlice";
import { useNavigate } from "react-router-dom";

const CarritoCompra = () => {
  const { items, expirationTime } = useSelector((state) => state.carrito);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (expirationTime) {
      const interval = setInterval(() => {
        const remainingTime = expirationTime - Date.now();
        setTimeLeft(Math.max(remainingTime, 0));

        if (remainingTime <= 30000 && remainingTime > 0) {
          setShowWarning(true);
        }

        if (remainingTime <= 0) {
          clearInterval(interval);
          alert("El tiempo de reserva ha expirado.");
          dispatch(resetearCarrito());
          navigate("/"); // Redirigir a la página principal
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expirationTime, dispatch, navigate]);

  const handleContinuar = () => {
    dispatch(extenderTiempo());
    setShowWarning(false);
  };

  const handleCancelar = () => {
    dispatch(resetearCarrito());
    navigate("/");
  };

  const handlePagarConWebpay = async () => {
    const eventoId = items[0]?.eventoId; // Asume que todos los items son del mismo evento
    const cantidadAdultos = items.reduce((acc, item) => acc + item.cantidadAdulto, 0);
    const cantidadNinos = items.reduce((acc, item) => acc + item.cantidadNino, 0);
  
    if (!user || !user.id) {
      console.error("Error: Usuario no autenticado o ID no definido");
      alert("Debes estar autenticado para realizar el pago.");
      return;
    }
  
    if (!eventoId || (cantidadAdultos === 0 && cantidadNinos === 0)) {
      alert("Los datos del carrito están incompletos.");
      return;
    }
  
    const data = {
      buy_order: `orden_evento`,
      session_id: user.id, // Asegúrate de que user.id está definido
      cantidad_adultos: cantidadAdultos,
      cantidad_ninos: cantidadNinos,
      evento_id: eventoId,
    };
  
    console.log("Datos enviados al backend:", data);
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/iniciar_pago/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el token si es necesario
        },
        body: JSON.stringify(data),
      });
  
      console.log("Estado de la respuesta:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al iniciar el pago:", errorData);
        alert("Error al iniciar el pago: " + errorData.error);
        return;
      }
  
      const result = await response.json();
      console.log("Respuesta de la API:", result);
  
      // Concatenar el token a la URL
      if (result.url && result.token) {
        const redirectUrl = `${result.url}?token_ws=${result.token}`;
        console.log("Redirigiendo a URL:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.error("Datos de redirección incompletos:", result);
        alert("Error al obtener la URL de redirección.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago.");
    }
  };
  
      
  

  if (items.length === 0) {
    return <p className="text-center text-gray-500">Aún no has agregado nada a tu carrito.</p>;
  }

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Carrito de Compras</h2>

      {showWarning && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow mb-4">
          <p>El carrito está por vencerse. ¿Desea continuar comprando o cancelar la compra?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={handleContinuar} className="bg-green-500 text-white px-4 py-2 rounded">
              Continuar
            </button>
            <button onClick={handleCancelar} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{item.nombreEvento}</h3>
              <p>Niños: {item.cantidadNino} | Adultos: {item.cantidadAdulto}</p>
            </div>
            <p className="font-bold">${item.subtotal.toLocaleString("es-CL")}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Total: ${total.toLocaleString("es-CL")}</h3>
        <button
          onClick={handlePagarConWebpay}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Pagar con Webpay
        </button>
      </div>
    </div>
  );
};

export default CarritoCompra;

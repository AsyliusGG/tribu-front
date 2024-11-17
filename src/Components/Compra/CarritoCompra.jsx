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
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
          Pagar con Webpay
        </button>
      </div>
    </div>
  );
};

export default CarritoCompra;

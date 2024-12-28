import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetearCarrito } from "../../slices/carritoSlice";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "./CarritoContext";
import Cookies from "js-cookie";
import { iniciarPago } from "../../api/api";
const token = Cookies.get("auth_token");

const CarritoCompra = () => {
  const { items } = useSelector((state) => state.carrito);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { timeLeft, showWarning, handleContinuar, handleCancelar } = useCarrito(); // Usa el contexto

  const handlePagarConWebpay = async () => {
    const eventoId = items[0]?.eventoId;
    const cantidadAdultos = items.reduce((acc, item) => acc + item.cantidadAdulto, 0);
    const cantidadNinos = items.reduce((acc, item) => acc + item.cantidadNino, 0);
  
    if (!user || !user.id) {
      alert("Debes estar autenticado para realizar el pago.");
      return;
    }
  
    if (!eventoId || (cantidadAdultos === 0 && cantidadNinos === 0)) {
      alert("Los datos del carrito están incompletos.");
      return;
    }
  
    const data = {
      buy_order: "orden_evento",
      session_id: user.id,
      cantidad_adultos: cantidadAdultos,
      cantidad_ninos: cantidadNinos,
      evento_id: eventoId,
    };
  
    try {
      const response = await iniciarPago(data, token);
      const result = response.data;
  
      if (result.frontend_url) {
        window.location.href = result.frontend_url;
      } else if (result.url && result.token) {
        window.location.href = `${result.url}?token_ws=${result.token}`;
      } else {
        alert("Error al obtener la URL de redirección.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago.");
    }
  };
  

  if (items.length === 0) {
    return (
      <div className="w-3/5 mx-auto my-8">
        <img src="carrito.png" alt="Carrito vacío" className="w-[40%] mx-auto mt-4" />
        <p className="text-center text-gray-700 text-xl pb-[10%]">Aún no has agregado nada a tu carrito.</p>

      </div>
    );
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
        <p className="text-sm text-gray-500 mb-4">
          Tiempo restante para finalizar la compra: <strong>{Math.ceil(timeLeft / 1000)}</strong> segundos
        </p>
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

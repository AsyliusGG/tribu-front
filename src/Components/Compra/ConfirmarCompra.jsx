// src/components/ConfirmacionCompra.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ConfirmacionCompra = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Obtener parámetros de la URL
  const status = searchParams.get("status");
  const buyOrder = searchParams.get("buy_order");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!status || !buyOrder || !amount) {
      // Si faltan parámetros, redirigir a la página principal o mostrar error
      navigate("/");
    }
  }, [status, buyOrder, amount, navigate]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Confirmación de Compra
      </h1>
      {status === "AUTHORIZED" ? (
        <div className="text-center">
          <p className="text-lg">¡Tu pago ha sido aprobado con éxito!</p>
          <p>
            <strong>Orden de Compra:</strong> {buyOrder}
          </p>
          <p>
            <strong>Monto Pagado:</strong> ${parseFloat(amount).toLocaleString("es-CL")}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Volver al Inicio
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-red-500">Hubo un problema con tu compra.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Volver al Inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmacionCompra;

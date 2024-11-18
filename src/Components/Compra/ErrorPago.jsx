import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPago = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/carritoCompra");
  };

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">¡Error en el Pago!</h1>
      <p className="text-gray-700 mb-6">
        Ocurrió un problema al procesar el pago. Por favor, intente nuevamente.
      </p>
      <button
        onClick={handleRetry}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Volver al Carrito
      </button>
    </div>
  );
};

export default ErrorPago;

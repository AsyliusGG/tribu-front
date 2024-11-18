import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmacionCompra = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const status = params.get("status");
  const buyOrder = params.get("buy_order");
  const amount = params.get("amount");

  if (!status || !buyOrder || !amount) {
    return <p>Error: Información incompleta de la transacción.</p>;
  }

  return (
    <div className="container mx-auto text-center py-10">
      <h1 className={`text-3xl font-bold ${status === "AUTHORIZED" ? "text-green-500" : "text-red-500"} mb-4`}>
        {status === "AUTHORIZED" ? "¡Pago Confirmado!" : "Error en el Pago"}
      </h1>
      <p className="text-gray-700">Orden: {buyOrder}</p>
      <p className="text-gray-700">Monto: ${amount}</p>
    </div>
  );
};

export default ConfirmacionCompra;

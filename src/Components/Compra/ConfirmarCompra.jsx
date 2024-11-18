import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmacionCompra = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get('status');
  const buy_order = queryParams.get('buy_order');
  const amount = queryParams.get('amount');
  console.log({ status, buyOrder, amount }); // Agrega esto para depuración

  return (
    <div>
      <h1>Confirmación de Compra</h1>
      <p>Status: {status}</p>
      <p>Buy Order: {buy_order}</p>
      <p>Amount: {amount}</p>
    </div>
  );
};

export default ConfirmacionCompra;
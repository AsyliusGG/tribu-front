import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPago = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get('status');
  const buyOrder = queryParams.get('buy_order');
  const amount = queryParams.get('amount');

  return (
    <div>
      <h1>Error en el Pago</h1>
      <p>Status: {status}</p>
      <p>Buy Order: {buyOrder}</p>
      <p>Amount: {amount}</p>
    </div>
  );
};

export default ErrorPago;
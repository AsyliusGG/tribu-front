import React, { useState } from 'react';

const CarritoCompra = () => {
  const [paymentMethod, setPaymentMethod] = useState('webpay');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sección izquierda (Datos, Detalle de la compra, Método de pago, Términos y condiciones) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tus datos */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tus datos</h2>
            <div className="space-y-2">
              <p><strong>Nelly Becerra</strong></p>
              <p>nelly.becerrag@gmail.com</p>
              <p>+56985320825</p>
            </div>
          </div>

          {/* Detalle de la compra */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Detalle de la compra</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Peluquería Perritos de 5 Kg a 9.9 Kg</p>
                <p className="text-gray-500">Lunes 28 de octubre 09:00 hrs. | 120 min | Diamond Pets</p>
              </div>
              <p className="font-bold">$11.500</p>
            </div>
          </div>

          {/* Método de pago */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Método de pago</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="webpay"
                  checked={paymentMethod === 'webpay'}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label>Webpay</label>
                <img src="https://cdn.example.com/webpay-logo.png" alt="Webpay" className="ml-2 h-6" />
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label>Tarjeta de Crédito o Débito con CVV</label>
                <div className="ml-2 flex space-x-2">
                  <img src="https://cdn.example.com/visa-logo.png" alt="Visa" className="h-6" />
                  <img src="https://cdn.example.com/mastercard-logo.png" alt="Mastercard" className="h-6" />
                  <img src="https://cdn.example.com/amex-logo.png" alt="Amex" className="h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Términos y condiciones */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Términos y condiciones</h2>
            <p className="text-gray-600">
              Por favor revisa con atención la siguiente información:
            </p>
            <p className="text-gray-500 text-sm">
              Se pueden hacer cambios a la reserva hasta 24 horas antes del horario programado.
              No se puede cancelar reservas pagadas en línea.
            </p>
          </div>
        </div>

        {/* Sección derecha (Confirmación de la compra) */}
        <div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirmación de la compra</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$11.500</p>
              </div>
              <div className="flex justify-between">
                <p>Descuentos</p>
                <p>$0</p>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>$11.500</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Al realizar el pago, declaro que acepto los términos y condiciones de la empresa.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCompra;

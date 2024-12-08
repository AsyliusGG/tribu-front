import React from "react";

const Membresia = () => {
  return (
    <div className="my-8 p-8 bg-pink-100 opacity-95 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4 text-pink-900">
        ¡Elige tu Membresía en La Tribu!
      </h2>
      <p className="mb-4">
        Únete a nuestra comunidad y accede a beneficios exclusivos para ti y tu familia.
      </p>

      {/* Opción de Membresía Mensual */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto my-8 text-center">
        <h3 className="text-2xl font-bold text-pink-900 mb-4">Membresía Mensual</h3>
        <p className="text-pink-900 mb-4">Solo $5.000 al mes</p>
        <ul className="text-left text-pink-900 mb-4">
          <li className="mb-2">✅ Acceso a nuestro grupo de Whatsapp</li>
          <li className="mb-2">✅ Juntas con mamás e hijos</li>
          <li className="mb-2">✅ Acceso a descuentos exclusivos</li>
          <li className="mb-2">✅ Actividades familiares y exclusivas</li>
        </ul>
        <button className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300">
          ¡Únete ahora!
        </button>
      </div>

      {/* Opción de Membresía Anual */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto my-8 text-center">
        <h3 className="text-2xl font-bold text-pink-900 mb-4">Membresía Anual</h3>
        <p className="text-pink-900 mb-4">
          Antes <span className="line-through">$60.000</span>, ahora solo <span className="font-bold text-green-500">$50.000</span> al año
        </p>
        <ul className="text-left text-pink-900 mb-4">
          <li className="mb-2">✅ Acceso a nuestro grupo de Whatsapp</li>
          <li className="mb-2">✅ Juntas con mamás e hijos</li>
          <li className="mb-2">✅ Acceso a descuentos exclusivos</li>
          <li className="mb-2">✅ Actividades familiares y exclusivas</li>
          <li className="mb-2">✅ ¡Ahorra $10.000 con este plan!</li>
        </ul>
        <button className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300">
          ¡Únete ahora!
        </button>
      </div>
    </div>
  );
};

export default Membresia;

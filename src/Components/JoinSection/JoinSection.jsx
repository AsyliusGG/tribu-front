import React, { useState } from "react";
import { Link } from "react-router-dom";

const JoinSection = () => {
  const [clicked, setClicked] = useState(false);


  return (
    <div className="my-8 p-8 bg-pink-100 opacity-95 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4 text-pink-900">
        ¡Quiero ser parte de La Tribu!
      </h2>
      <p className="mb-4">
        Si sientes que necesitas apoyo extra en tu embarazo y maternidad,
        <br />
        no dudes en unirte a nuestra tribu. Encontrarás actividades para tí y
        tus hijos, <br />
        descuentos y promociones en diversas áreas que necesites para esta
        etapa.
      </p>

      {/* Card de Membresía */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto my-8 text-center">
        <h2 className="text-2xl font-bold text-pink-900 mb-4">¿Qué te espera en Tribu de Mamás?</h2>
        <ul className="text-left text-pink-900 mb-4">
          <li className="mb-2">✅ Acceso a nuestro grupo de Whatsapp</li>
          <li className="mb-2">✅ Información de juntas con mamás e hijos</li>
          <li className="mb-2">✅ Infórmate y disfruta de las Mum's Night</li>
          <li className="mb-2">
            ✅ Encuentra productos y servicios en nuestro grupo de compra y venta
          </li>
          <li className="mb-2">✅ Accede a descuentos exclusivos</li>
          <li className="mb-2">
            ✅ Participa en actividades familiares de La Tribu
          </li>
          <li className="mb-2">
            ✅ Participa en actividades exclusivas de La Tribu
          </li>
        </ul>
        <div className="text-pink-900 font-bold text-xl mb-4">
          Desde <span className="text-pink-600">$5.000</span> mensual
        </div>
        <button className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300">
          <Link to="/joinus">¡Únete ahora!</Link>
        </button>
      </div>
    </div>
  );
};

export default JoinSection;

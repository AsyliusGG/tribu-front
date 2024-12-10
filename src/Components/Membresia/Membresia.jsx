import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Membresia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("auth_token");
  const user = useSelector((state) => state.auth.user);

  const handlePayment = async (membershipPlan) => {
    const data = {
      buy_order: "orden_membresia",
      session_id: user.id,
      membership_plan: membershipPlan,
    };

    try {
      const response = await fetch("http://20.51.120.81:8000/api/v1/iniciar_pago/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Pago iniciado con éxito");

        // Redirigir al usuario a la URL proporcionada con el token como un parámetro en la URL
        window.location.href = `${responseData.url}?token_ws=${responseData.token}`;
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.detail || response.statusText}`);
      }
    } catch (error) {
      toast.error(`Error al conectar con el servidor: ${error.message}`);
    }
  };

  return (
    <div className="my-8 p-8 bg-pink-100 opacity-95 rounded-lg text-center">
      {/* Tarjeta principal que contiene beneficios y membresías */}
      <div className="bg-white rounded-lg p-8 shadow-xl max-w-4xl mx-auto">
        {/* Beneficios */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-pink-900 mb-4">¡Elige tu Membresía en La Tribu!</h3>
          <p className="mb-6">
            Únete a nuestra comunidad y accede a beneficios exclusivos para ti y tu familia.
          </p>
          <ul className="text-left text-pink-900 mx-auto max-w-md">
            <li className="mb-2">✅ Acceso a nuestro grupo de Whatsapp</li>
            <li className="mb-2">✅ Información de juntas con mamás e hijos</li>
            <li className="mb-2">✅ Infórmate y disfruta de las Mum's Night</li>
            <li className="mb-2">✅ Encuentra productos y servicios en nuestro grupo de compra y venta</li>
            <li className="mb-2">✅ Accede a descuentos exclusivos</li>
            <li className="mb-2">✅ Participa en actividades familiares de La Tribu</li>
            <li className="mb-2">✅ Participa en actividades exclusivas de La Tribu</li>
          </ul>
        </div>

        {/* Contenedor de las tarjetas de membresía */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Membresía Mensual */}
          <div className="bg-pink-50 rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
            <h3 className="text-2xl font-bold text-pink-900 mb-4">Membresía Mensual</h3>
            <p className="text-pink-900 mb-4">Solo $5.000 al mes</p>
            <button
              className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
              onClick={() => handlePayment("MENSUAL")}
            >
              ¡Únete ahora!
            </button>
          </div>

          {/* Membresía Anual */}
          <div className="bg-green-50 rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
            <h3 className="text-2xl font-bold text-pink-900 mb-4">Membresía Anual</h3>
            <p className="text-pink-900 mb-4">
              Antes <span className="line-through">$60.000</span>, ahora solo{" "}
              <span className="font-bold text-green-500">$50.000</span> al año
            </p>
            <button
              className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
              onClick={() => handlePayment("ANUAL")}
            >
              ¡Únete ahora!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membresia;
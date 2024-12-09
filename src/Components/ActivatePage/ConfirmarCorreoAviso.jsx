import React from "react";

const ConfirmarCorreoAviso = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg text-center border border-gray-200">
        {/* Mensaje principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Revisa tu correo
        </h1>
        <p className="text-gray-600 text-lg">
          Debes tener un correo de activación para continuar el proceso.
        </p>
      </div>
    </div>
  );
};

export default ConfirmarCorreoAviso;

import React, { useState } from 'react';

const Unete = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="form-group">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
            <input type="text" id="rut" name="rut" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input type="text" id="apellidos" name="apellidos" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono móvil</label>
            <input type="text" id="telefono" name="telefono" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar-email" className="block text-sm font-medium text-gray-700">Confirmar E-mail</label>
            <input type="email" id="confirmar-email" name="confirmar-email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar-contrasena" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input type="password" id="confirmar-contrasena" name="confirmar-contrasena" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Unete;
import React, { useState } from 'react';

const Joinus = () => {
  const [numHijos, setNumHijos] = useState(0);

  const ciudadesQuintaRegion = [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Quintero', 
    'Concón', 'San Antonio', 'Los Andes', 'San Felipe', 'La Ligua', 
    'Quillota', 'Limache', 'Olmué', 'Putaendo', 'Santa María'
  ];

  const comunasQuintaRegionYMetropolitana = [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Quintero', 
    'Concón', 'San Antonio', 'Los Andes', 'San Felipe', 'La Ligua', 
    'Quillota', 'Limache', 'Olmué', 'Putaendo', 'Santa María',
    'Santiago', 'Providencia', 'Las Condes', 'La Florida', 'Puente Alto', 
    'Maipú', 'Ñuñoa', 'San Bernardo', 'La Reina', 'Peñalolén'
  ];

  const handleNumHijosChange = (e) => {
    setNumHijos(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="form-group">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
            <input type="text" id="rut" name="rut" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input type="text" id="apellidos" name="apellidos" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono móvil</label>
            <input type="text" id="telefono" name="telefono" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
        </div>
        <hr className="my-6 border-gray-800" />
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar-email" className="block text-sm font-medium text-gray-700">Confirmar E-mail</label>
            <input type="email" id="confirmar-email" name="confirmar-email" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar-contrasena" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input type="password" id="confirmar-contrasena" name="confirmar-contrasena" className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" required />
          </div>
        </div>

        <hr className="my-6 border-gray-800" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
            <select id="ciudad" name="ciudad" className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {ciudadesQuintaRegion.map((ciudad, index) => (
                <option key={index} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="comuna" className="block text-sm font-medium text-gray-700">Comuna</label>
            <select id="comuna" name="comuna" className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {comunasQuintaRegionYMetropolitana.map((comuna, index) => (
                <option key={index} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>
        </div>

        <hr className="my-6 border-gray-800" />

        <div className="mb-6">
          <label htmlFor="numHijos" className="block text-sm font-medium text-gray-700">¿Cuántos hijos tiene?</label>
          <input 
            type="number" 
            id="numHijos" 
            name="numHijos" 
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" 
            value={numHijos} 
            onChange={handleNumHijosChange} 
            min="0" 
            max="20" 
          />
        </div>

        {Array.from({ length: numHijos }).map((_, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Edad del hijo {index + 1}</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`meses-${index}`} className="block text-sm font-medium text-gray-700">Meses</label>
                <input 
                  type="number" 
                  id={`meses-${index}`} 
                  name={`meses-${index}`} 
                  className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" 
                  min="1" 
                  max="12"
                />
              </div>
              <div>
                <label htmlFor={`años-${index}`} className="block text-sm font-medium text-gray-700">Años</label>
                <input 
                  type="number" 
                  id={`años-${index}`} 
                  name={`años-${index}`} 
                  className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" 
                  min="1" 
                  max="10"
                />
              </div>
            </div>
          </div>
        ))}

        <hr className="my-6 border-gray-800" />

        <div className="mb-6">
          <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">¿Algo que nos quieras contar?</label>
          <textarea 
            id="comentarios" 
            name="comentarios" 
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" 
            rows="4"
          ></textarea>
        </div>
        
      </form>
    </div>
  );
};

export default Joinus;
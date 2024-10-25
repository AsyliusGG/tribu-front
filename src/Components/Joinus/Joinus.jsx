import React, { useState } from 'react';

const Joinus = () => {
  const [numHijos, setNumHijos] = useState(0);
  const [fechasNacimiento, setFechasNacimiento] = useState([]);

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

  const handleNumHijosChange = (increment) => {
    setNumHijos((prevNumHijos) => {
      const newNumHijos = prevNumHijos + increment;
      if (newNumHijos < 0 || newNumHijos > 20) return prevNumHijos;
      const nuevasFechas = [...fechasNacimiento];
      if (increment > 0) {
        nuevasFechas.push('');
      } else {
        nuevasFechas.pop();
      }
      setFechasNacimiento(nuevasFechas);
      return newNumHijos;
    });
  };

  const handleFechaNacimientoChange = (index, value) => {
    const nuevasFechas = [...fechasNacimiento];
    nuevasFechas[index] = value;
    setFechasNacimiento(nuevasFechas);
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return '';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edadAnios = hoy.getFullYear() - nacimiento.getFullYear();
    let edadMeses = hoy.getMonth() - nacimiento.getMonth();
    let edadDias = hoy.getDate() - nacimiento.getDate();

    if (edadDias < 0) {
      edadMeses--;
      const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
      edadDias += ultimoDiaMesAnterior;
    }

    if (edadMeses < 0) {
      edadAnios--;
      edadMeses += 12;
    }

    return `${edadAnios} años, ${edadMeses} meses y ${edadDias} días`;
  };

  const obtenerTextoEdadHijo = (index) => {
    const sufijos = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
    return `La edad del ${sufijos[index] || (index + 1) + 'º'} hijo es:`;
  };
    
  return (
    <div className="min-h-screen bg-gray-100 py-8 overflow-auto">
      <div className="flex justify-center items-center">
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
            <div className="flex items-center">
              <button type="button" onClick={() => handleNumHijosChange(-1)} className="px-3 py-1 border border-gray-500 rounded-md shadow-sm">-</button>
              <input 
                type="number" 
                id="numHijos" 
                name="numHijos" 
                className="mx-2 w-16 text-center border border-gray-500 rounded-md shadow-sm p-2" 
                value={numHijos} 
                readOnly 
              />
              <button type="button" onClick={() => handleNumHijosChange(1)} className="px-3 py-1 border border-gray-500 rounded-md shadow-sm">+</button>
            </div>
          </div>

        {Array.from({ length: numHijos }).map((_, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor={`fecha-nacimiento-${index}`} className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  id={`fecha-nacimiento-${index}`} 
                  name={`fecha-nacimiento-${index}`} 
                  className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2" 
                  value={fechasNacimiento[index] || ''} 
                  onChange={(e) => handleFechaNacimientoChange(index, e.target.value)} 
                />
                <p className="mt-2 text-sm text-gray-900">{obtenerTextoEdadHijo(index)} {calcularEdad(fechasNacimiento[index])}</p>
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
    </div>
  );
};

export default Joinus;
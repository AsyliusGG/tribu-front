import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Perfil = () => {
  const user = useSelector((state) => state.auth.user); // Obtén el usuario desde Redux
  const [addingChild, setAddingChild] = useState(false);
  const [children, setChildren] = useState([]);
  const [childData, setChildData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };

  const handleAddChild = () => {
    setChildren([...children, childData]);
    setChildData({ nombre: "", apellido: "", fecha_nacimiento: "" });
  };

  const handleSaveChildren = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/hijos/", // URL correcta del endpoint
        { hijos: children },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al guardar los hijos:", error.response || error.message);
      if (error.response?.status === 401) {
        alert("Autenticación requerida. Por favor inicia sesión nuevamente.");
      } else if (error.response?.status === 404) {
        alert("Ruta no encontrada. Verifica la URL del backend.");
      } else {
        alert("Ocurrió un error inesperado al guardar los hijos.");
      }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Mi Perfil</h1>
        {user ? (
          <div>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Nombre: </span>
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-700 text-lg mt-2">
              <span className="font-semibold">Correo electrónico: </span>
              {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No hay información de usuario disponible.</p>
        )}

        {/* Botón para agregar hijos */}
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={() => setAddingChild(true)}
          >
            Agregar Hijo
          </button>
        </div>

        {/* Panel para agregar hijos */}
        {addingChild && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Agregar Información de Hijos</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={childData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nombre del hijo"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={childData.apellido}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Apellido del hijo"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={childData.fecha_nacimiento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              onClick={handleAddChild}
            >
              Agregar Hijo a la Lista
            </button>

            {/* Lista de hijos agregados */}
            {children.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-800">Hijos Agregados:</h3>
                <ul className="list-disc pl-6">
                  {children.map((child, index) => (
                    <li key={index} className="text-gray-700">
                      {child.nombre} {child.apellido} - {child.fecha_nacimiento}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleSaveChildren}
            >
              Guardar Hijos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;

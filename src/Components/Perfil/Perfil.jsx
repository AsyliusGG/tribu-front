import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Perfil = () => {
  const user = useSelector((state) => state.auth.user); // Obtén el usuario desde Redux
  const token = useSelector((state) => state.auth.token); // Obtén el token desde Redux
  const [addingChild, setAddingChild] = useState(false);
  const [children, setChildren] = useState([]);
  const [childData, setChildData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    }
  }, [user]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData({ 
      ...childData, 
      [name]: value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://20.51.120.81:8000//api/v1/auth/users/me/', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Actualiza el usuario en el estado de Redux si es necesario
      setEditing(false);
      alert('Información actualizada correctamente.');
    } catch (error) {
      console.error("Error al actualizar la información:", error.response || error.message);
      if (error.response?.status === 404) {
        alert("Ruta no encontrada. Verifica la URL del backend.");
      } else {
        alert("Ocurrió un error inesperado al actualizar la información.");
      }
    }
  };

  const handleChildInputChange = (e) => {
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
        "http://20.51.120.81:8000/api/v1/hijo/", // URL correcta del endpoint
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
            {editing ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Apellido:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Correo electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Nombre: </span>
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Correo electrónico: </span>
                  {user.email}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mt-4"
                  onClick={handleEdit}
                >
                  Editar
                </button>
              </div>
            )}
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
      </div>
    </div>
  );
};
export default Perfil;

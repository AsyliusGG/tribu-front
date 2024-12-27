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
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    run: user?.run || '',
    birthday: user?.birthday || '',
    job: user?.job || '',
    sector: user?.sector || '',
    know_source: user?.know_source || '',
  });
  const [sectors, setSectors] = useState([]);
  const [knowSources, setKnowSources] = useState([]);
  const [wspSector, setWspSector] = useState('');
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        run: user.run,
        birthday: user.birthday,
        job: user.job,
        sector: user.sector,
        know_source: user.know_source,
      });
    }
  }, [user]);

  useEffect(() => {
    // Obtener los datos de SECTOR
    axios.get('http://20.51.120.81:8000/api/v1/sector/').then(response => {
      setSectors(response.data);
    });

    // Obtener los datos de KNOW SOURCE
    axios.get('http://20.51.120.81:8000/api/v1/knowsource/').then(response => {
      setKnowSources(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.sector) {
      const sector = sectors.find(sector => sector.id === formData.sector);
      if (sector) {
        setWspSector(sector.wsp_sector);
      }
    }
  }, [formData.sector, sectors]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    // Verificar campos requeridos
    if (!formData.first_name || !formData.last_name || !formData.email || 
        !formData.phone_number || !formData.run || !formData.birthday || 
        !formData.job || !formData.sector || !formData.know_source) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    try {
      // Actualizar usuario en el backend
      await axios.put(
        'http://20.51.120.81:8000/api/v1/auth/users/me/',
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          run: formData.run,
          birthday: formData.birthday,
          job: formData.job,
          sector: formData.sector,
          know_source: formData.know_source,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Obtener los datos actualizados del backend
      const response = await axios.get('http://20.51.120.81:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Actualizar estado con los datos del usuario actualizado
      setUpdatedUser(response.data);
      setEditing(false); // Salir del modo edición
      alert('Información actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la información:', error.response || error.message);
      if (error.response) {
        alert(`Error: ${error.response.data.detail || 'Ocurrió un error al actualizar la información'}`);
      } else {
        alert('Ocurrió un error inesperado al actualizar la información');
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí puedes agregar la lógica para enviar los datos actualizados al servidor
      console.log('Datos del formulario actualizados:', formData);
      // Actualizar los mapeos después de guardar los cambios
      const sector = sectors.find(sector => sector.id === formData.sector);
      const knowSource = knowSources.find(source => source.id === formData.know_source);
      setWspSector(sector ? sector.wsp_sector : '');
      setFormData({
        ...formData,
        sector: sector ? sector.sector_nombre : formData.sector,
        know_source: knowSource ? knowSource.source_name : formData.know_source,
      });

      // Volver a leer el endpoint user/me
      const response = await axios.get('http://20.51.120.81:8000/api/v1/auth/users/me');
      setUpdatedUser(response.data);
    } catch (error) {
      if (error.response) {
        // Mostrar mensaje de error específico del servidor
        alert(`Error: ${error.response.data.detail || 'Ocurrió un error al actualizar la información'}`);
      } else {
        alert('Ocurrió un error inesperado al actualizar la información');
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

  const getSectorName = (id) => {
    const sector = sectors.find(sector => sector.id === id);
    return sector ? sector.sector_nombre : '';
  };

  const getKnowSourceName = (id) => {
    const source = knowSources.find(source => source.id === id);
    return source ? source.source_name : '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
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
                <div className="mb-4">
                  <label className="block text-gray-700">Número de teléfono:</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">RUN:</label>
                  <input
                    type="text"
                    name="run"
                    value={formData.run}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Fecha de nacimiento:</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Trabajo:</label>
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Sector:</label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.sector_nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">¿Cómo nos conociste?</label>
                  <select
                    id="knowSource"
                    name="know_source"
                    value={formData.know_source}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {knowSources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.source_name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  onClick={async (e) => {
                    await handleSave(e);
                    const response = await axios.get('http://20.51.120.81:8000/api/v1/auth/users/me');
                    setUpdatedUser(response.data);
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Nombre: </span>
                  {updatedUser.first_name} {updatedUser.last_name}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Correo electrónico: </span>
                  {updatedUser.email}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Número de teléfono: </span>
                  {updatedUser.phone_number}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">RUN: </span>
                  {updatedUser.run}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Fecha de nacimiento: </span>
                  {updatedUser.birthday}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Trabajo: </span>
                  {updatedUser.job}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span onChange={handleInputChange} className="font-semibold">Sector: </span>
                  {getSectorName(updatedUser.sector)}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span onChange={handleInputChange} className="font-semibold">¿Cómo nos conociste? </span>
                  {getKnowSourceName(updatedUser.know_source)}
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  <span className="font-semibold">Grupo de WhatsApp: </span>
                  {wspSector}
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
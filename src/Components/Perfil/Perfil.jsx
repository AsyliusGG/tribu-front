import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {

      const token = localStorage.getItem('token'); // Obtén el token de autenticación desde el almacenamiento local
      console.log("Token:", token); // Mensaje de depuración

      if (!token) {
        toast.error("No se encontró el token de autenticación.");
        return;
      }



      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/user/", { 
          headers: {
            'Authorization': `Bearer ${token}` // Incluye el token en los encabezados de la solicitud
          }
        });
        console.log("Response status:", response.status); // Mensaje de depuración
        if (response.ok) {
          const data = await response.json();
          console.log("Datos del usuario:", data); // Mensaje de depuración
          setUser(data); // Guardar la información del usuario en el estado
        } else {
          const errorData = await response.json();
          console.log("Error data:", errorData); // Mensaje de depuración
          toast.error("Error al cargar la información del usuario.");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error); // Mensaje de depuración
        toast.error("Error al conectar con el servidor.");
      }
    }
    fetchUser();
  }, []);

  console.log("Estado del usuario:", user); // Mensaje de depuración

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Información del Usuario</h2>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Nombre:</h3>
          <p>{user.first_name}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Apellido:</h3>
          <p>{user.last_name}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Email:</h3>
          <p>{user.email}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Teléfono:</h3>
          <p>{user.phone_number}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">RUT:</h3>
          <p>{user.run}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Fecha de Nacimiento:</h3>
          <p>{user.birthday}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Trabajo:</h3>
          <p>{user.job}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Sector:</h3>
          <p>{user.sector}</p>
        </div>
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Fuente de Conocimiento:</h3>
          <p>{user.know_source}</p>
        </div>
      </div>
      <div className="w-3/4 p-4">
        {/* Aquí puedes agregar más contenido o funcionalidades para el perfil */}
      </div>
    </div>
  );
};

export default Perfil;
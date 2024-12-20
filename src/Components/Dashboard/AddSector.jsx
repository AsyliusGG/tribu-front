import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Input,
  Typography,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";
import ReactDOM from 'react-dom';

const AddSector = () => {
  const [nombre, setNombre] = useState('');
  const [sectores, setSectores] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState(null);
  const navigate = useNavigate();

  // Obtener el token desde el estado de Redux
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const response = await fetch("http://20.51.120.81:8000/api/v1/sector/");
        const data = await response.json();
        setSectores(data);
      } catch (error) {
        console.error("Error al obtener los sectores:", error);
      }
    };

    fetchSectores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sector_nombre", nombre);

    if (!token) {
      alert("No se encontró el token de autenticación");
      return;
    }

    try {
      const response = await fetch("http://20.51.120.81:8000/api/v1/sector/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newSector = await response.json();
        setSectores([...sectores, newSector]);
        setAlertMessage("Sector creado exitosamente");
        setNombre(''); // Limpiar el campo de entrada
      } else {
        const data = await response.json();
        console.error("Error en la respuesta:", data);
        alert("Error al crear el sector");
      }
    } catch (error) {
      alert("Hubo un error al enviar los datos");
      console.error(error);
    }
  };

  const openDeleteDialog = (sector) => {
    setSectorToDelete(sector);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSectorToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (sectorId) => {
    try {
      const response = await fetch(`http://20.51.120.81:8000/api/v1/sector/${sectorId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSectores(sectores.filter((sector) => sector.id !== sectorId));
        setDeleteDialogOpen(false);
        setAlertMessage("Sector eliminado correctamente.");
      } else {
        console.error("Error al eliminar el sector");
      }
    } catch (error) {
      console.error("Error al eliminar el sector:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Sectores
      </Typography>

      {alertMessage && (
        <Alert
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          }
          className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="flex justify-end mb-4">
        <Button
          variant="gradient"
          color="green"
          className="flex items-center"
          onClick={() => navigate("/Sectores/CrearSector")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Agregar Nuevo Sector
        </Button>
      </div>

      <Card className="p-6 w-full max-w-4xl">
        <Typography variant="h4" color="blue-gray" className="text-center mb-6">
          Crear Nuevo Sector
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Nombre del Sector
            </Typography>
            <Input
              type="text"
              size="lg"
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <Button type="submit" color="blue" fullWidth className="mt-4">
            Crear Sector
          </Button>
        </form>
      </Card>

      <h3 className="text-xl font-bold text-center mt-6">Sectores Existentes</h3>
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sectores.map((sector) => (
            <tr key={sector.id}>
              <td className="py-2 px-4 border-b">{sector.sector_nombre}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex justify-between space-x-2">
                  <Button
                    color="red"
                    className="flex items-center"
                    onClick={() => openDeleteDialog(sector.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteDialogOpen && ReactDOM.createPortal(
        <Dialog open={deleteDialogOpen} handler={closeDeleteDialog}>
          <DialogHeader>Confirmar eliminación</DialogHeader>
          <DialogBody>¿Desea realmente eliminar este sector?</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="blue-gray"
              onClick={closeDeleteDialog}
            >
              No
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleDelete(sectorToDelete)}
            >
              Sí
            </Button>
          </DialogFooter>
        </Dialog>,
        document.body
      )}
    </div>
  );
};

export default AddSector;
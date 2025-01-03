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
import { obtenerSectores, crearSector, actualizarSector, eliminarSector } from "../../api/api";


const AddSector = () => {
  const [sectores, setSectores] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [sectorToEdit, setSectorToEdit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  // Obtener el token desde el estado de Redux
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const data = await obtenerSectores();
        setSectores(data);
      } catch (error) {
        console.error("Error al obtener los sectores:", error);
      }
    };
  
    fetchSectores();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { sector_nombre: nombre };
  
    try {
      const newSector = await crearSector(formData, token);
      setSectores([...sectores, newSector.data]);
      setAlertMessage("Sector creado exitosamente");
      setNombre("");
    } catch (error) {
      console.error("Error al crear el sector:", error);
    }
  };
  
  const handleUpdate = async (updatedSector) => {
    try {
      const updatedSectorFromServer = await actualizarSector(
        updatedSector.id,
        { sector_nombre: updatedSector.sector_nombre },
        token
      );
      setSectores((prevSectores) =>
        prevSectores.map((sector) =>
          sector.id === updatedSectorFromServer.data.id ? updatedSectorFromServer.data : sector
        )
      );
      setAlertMessage("Sector actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el sector:", error);
    }
    closeEditDialog();
  };

  const openEditDialog = (sector) => {
    setSectorToEdit(sector);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSectorToEdit(null);
    setEditDialogOpen(false);
  };

  const openDeleteDialog = (sectorId) => {
    setSectorToDelete(sectorId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSectorToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (sectorId) => {
    try {
      await eliminarSector(sectorId, token);
      setSectores(sectores.filter((sector) => sector.id !== sectorId));
      setAlertMessage("Sector eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el sector:", error);
    }
    closeDeleteDialog();
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
                <div className="flex justify-center items-center space-x-5">
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
                  <Button
                    color="blue"
                    className="flex items-center"
                    onClick={() => handleModify(sector.id)}
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
                        d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-9.193 9.193a4.5 4.5 0 0 1-1.691 1.07l-3.25 1.083a.75.75 0 0 1-.95-.95l1.083-3.25a4.5 4.5 0 0 1 1.07-1.691l9.193-9.193z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12.75V19.5a2.25 2.25 0 0 1-2.25 2.25h-12A2.25 2.25 0 0 1 3 19.5v-12A2.25 2.25 0 0 1 5.25 5.25h6.75"
                      />
                    </svg>
                    Modificar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editDialogOpen && ReactDOM.createPortal(
        <Dialog open={editDialogOpen} handler={closeEditDialog}>
          <DialogHeader>Modificar Sector</DialogHeader>
          <DialogBody>
            <input
              type="text"
              value={sectorToEdit?.sector_nombre || ''}
              onChange={(e) => setSectorToEdit({ ...sectorToEdit, sector_nombre: e.target.value })}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="blue-gray"
              onClick={closeEditDialog}
            >
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => handleUpdate(sectorToEdit)}
            >
              Guardar
            </Button>
          </DialogFooter>
        </Dialog>,
        document.body
      )}

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
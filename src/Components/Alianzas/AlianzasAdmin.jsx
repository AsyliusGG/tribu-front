import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";

const ALIANZAS_API_URL = "http://localhost:8000/alianzas/api/v1/alianzas"; // Actualizar con la API correcta

const AlianzasAdmin = () => {
  const [alianzas, setAlianzas] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alianzaToDelete, setAlianzaToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Cargar alianzas desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(ALIANZAS_API_URL);

        if (response.ok) {
          const alianzasData = await response.json();
          setAlianzas(alianzasData);
        } else {
          console.error("Error al obtener las alianzas.");
        }
      } catch (error) {
        console.error("Error al obtener las alianzas:", error);
      }
    }

    fetchData();
  }, []);

  // Eliminar alianza
  const handleDelete = async (alianzaId) => {
    try {
      const response = await fetch(`${ALIANZAS_API_URL}/${alianzaId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAlianzas(alianzas.filter((alianza) => alianza.id !== alianzaId)); // Eliminar la alianza de la tabla
        setDeleteDialogOpen(false);
        setAlertMessage("Alianza eliminada correctamente.");
      } else {
        console.error("Error al eliminar la alianza");
      }
    } catch (error) {
      console.error("Error al eliminar la alianza:", error);
    }
  };

  // Mostrar el diálogo de eliminación
  const openDeleteDialog = (alianzaId) => {
    setAlianzaToDelete(alianzaId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAlianzaToDelete(null);
  };

  // Habilitar/Deshabilitar Alianza
  const toggleAlianza = async (alianzaId, estadoActual) => {
    try {
      const response = await fetch(`${ALIANZAS_API_URL}/${alianzaId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Estado: !estadoActual }), // Cambiar el estado al contrario
      });

      if (response.ok) {
        setAlianzas(
          alianzas.map((alianza) =>
            alianza.id === alianzaId ? { ...alianza, Estado: !estadoActual } : alianza
          )
        );
        setAlertMessage(
          `Alianza ${!estadoActual ? "desactivada" : "activada"} correctamente.`
        );
      } else {
        console.error("Error al cambiar el estado de la alianza");
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la alianza:", error);
    }
  };

  // Formatear fecha a 'dd/mm/yy'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Alianzas
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
          onClick={() => navigate("/Alianzas/CrearAlianza")}
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
          Agregar Nueva Alianza
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Empresa</th>
            <th className="py-2 px-4 border-b">Nombre Promo</th>
            <th className="py-2 px-4 border-b">Promoción</th>
            <th className="py-2 px-4 border-b">Fecha Inicio</th>
            <th className="py-2 px-4 border-b">Fecha Final</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alianzas.map((alianza) => (
            <tr key={alianza.id}>
              <td className="py-2 px-4 border-b">{alianza.alianza_empresa}</td>
              <td className="py-2 px-4 border-b">{alianza.alianza_nombre}</td>
              <td className="py-2 px-4 border-b">{alianza.Promocion}</td>
              <td className="py-2 px-4 border-b">{formatDate(alianza.Fecha_inicio)}</td>
              <td className="py-2 px-4 border-b">{formatDate(alianza.Fecha_final)}</td>
              <td className="py-2 px-4 border-b">
                {alianza.Estado ? "Activo" : "Desactivado"}
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex justify-between space-x-2">
                  <Button
                    color={alianza.Estado ? "gray" : "green"}
                    className="flex items-center"
                    onClick={() => toggleAlianza(alianza.id, alianza.Estado)}
                  >
                    {alianza.Estado ? "Desactivar" : "Activar"}
                  </Button>
                  <Button
                    color="blue"
                    className="flex items-center"
                    onClick={() => navigate(`/Alianzas/ModificarAlianza/${alianza.id}`)}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    Modificar
                  </Button>
                  <Button
                    color="red"
                    className="flex items-center"
                    onClick={() => openDeleteDialog(alianza.id)}
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

      {deleteDialogOpen && (
        <Dialog open={deleteDialogOpen} handler={closeDeleteDialog}>
          <DialogHeader>Confirmar eliminación</DialogHeader>
          <DialogBody>¿Desea realmente eliminar esta alianza?</DialogBody>
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
              onClick={() => handleDelete(alianzaToDelete)}
            >
              Sí
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default AlianzasAdmin;

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
import Cookies from "js-cookie";

const EVENTOS_API_URL = "http://20.51.120.81:8000/api/v1/evento";
const SECTOR_API_URL = "http://20.51.120.81:8000/api/v1/sector";

const EventosAdmin = () => {
  const [events, setEvents] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Cargar eventos y sectores desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsResponse, sectorsResponse] = await Promise.all([
          fetch(EVENTOS_API_URL),
          fetch(SECTOR_API_URL),
        ]);

        if (eventsResponse.ok && sectorsResponse.ok) {
          let eventsData = await eventsResponse.json();
          const sectorsData = await sectorsResponse.json();

          // Verificar si el evento fue ayer y desactivarlo si es necesario
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1); // Restar un día a la fecha actual
          eventsData.forEach(async (event) => {
            const eventDate = new Date(event.fecha);
            if (eventDate < currentDate && !event.disabled) {
              await desactivarEvento(event.id);
              event.disabled = true; // Marcar como desactivado
            }
          });

          setEvents(eventsData);
          setSectors(sectorsData);
        } else {
          console.error("Error al obtener los eventos o sectores.");
        }
      } catch (error) {
        console.error("Error al obtener los eventos o sectores:", error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await fetch(`${EVENTOS_API_URL}/${eventId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
        setAlertMessage("Evento eliminado con éxito");
      } else {
        console.error("Error al eliminar el evento");
        setAlertMessage("Error al eliminar el evento");
      }
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      setAlertMessage("Error al eliminar el evento");
    }
  };

  const handleActivateDeactivate = async (eventId, isActive) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await fetch(`${EVENTOS_API_URL}/${eventId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ disabled: !isActive }),
      });

      if (response.ok) {
        setEvents(events.map((event) => (event.id === eventId ? { ...event, disabled: !isActive } : event)));
        setAlertMessage(`Evento ${isActive ? "desactivado" : "activado"} con éxito`);
      } else {
        console.error(`Error al ${isActive ? "desactivar" : "activar"} el evento`);
        setAlertMessage(`Error al ${isActive ? "desactivar" : "activar"} el evento`);
      }
    } catch (error) {
      console.error(`Error al ${isActive ? "desactivar" : "activar"} el evento:`, error);
      setAlertMessage(`Error al ${isActive ? "desactivar" : "activar"} el evento`);
    }
  };

  const handleModify = (eventId) => {
    navigate(`/Eventos/ModificarEvento/${eventId}`);
  };

  const openDeleteDialog = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  };

  const getSectorName = (sectorId) => {
    const sector = sectors.find((sector) => sector.id === sectorId);
    return sector ? sector.sector_nombre : "Desconocido";
  };

  return (
    <div className="container mx-auto px-4">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Eventos
      </Typography>
      {alertMessage && (
        <Alert color="red" className="mb-4">
          {alertMessage}
        </Alert>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Hora</th>
            <th className="py-2 px-4 border-b">Sector</th>
            <th className="py-2 px-4 border-b">Cupos Totales</th>
            <th className="py-2 px-4 border-b">Cupos Disponibles</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="py-2 px-4 border-b">{event.nombre}</td>
              <td className="py-2 px-4 border-b">{formatDate(event.fecha)}</td>
              <td className="py-2 px-4 border-b">{formatTime(event.hora)}</td>
              <td className="py-2 px-4 border-b">{getSectorName(event.sector)}</td>
              <td className="py-2 px-4 border-b">{event.cupos_totales}</td>
              <td className="py-2 px-4 border-b">{event.cupos_disponibles}</td>
              <td className="py-2 px-4 border-b">{event.disabled ? "Desactivado" : "Activo"}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-2">
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={() => handleActivateDeactivate(event.id, !event.disabled)}
                  >
                    {event.disabled ? "Activar" : "Desactivar"}
                  </Button>
                  <Button
                    variant="gradient"
                    color="blue"
                    onClick={() => handleModify(event.id)}
                  >
                    Modificar
                  </Button>
                  <Button
                    variant="gradient"
                    color="red"
                    onClick={() => openDeleteDialog(event.id)}
                  >
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
          <DialogBody>¿Desea realmente eliminar este evento?</DialogBody>
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
              onClick={() => {
                handleDelete(eventToDelete);
                closeDeleteDialog();
              }}
            >
              Sí
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default EventosAdmin;

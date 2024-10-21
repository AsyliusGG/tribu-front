import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from '@material-tailwind/react';

const EVENTOS_API_URL = 'http://localhost:8000/eventos/api/v1/evento';
const SECTOR_API_URL = 'http://localhost:8000/eventos/api/v1/sector';

const EventosAdmin = () => {
  const [events, setEvents] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  // Cargar eventos y sectores desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsResponse, sectorsResponse] = await Promise.all([
          fetch(EVENTOS_API_URL),
          fetch(SECTOR_API_URL)
        ]);

        if (eventsResponse.ok && sectorsResponse.ok) {
          const eventsData = await eventsResponse.json();
          const sectorsData = await sectorsResponse.json();

          setEvents(eventsData);
          setSectors(sectorsData);
        } else {
          console.error('Error al obtener los eventos o sectores.');
        }
      } catch (error) {
        console.error('Error al obtener los eventos o sectores:', error);
      }
    }

    fetchData();
  }, []);

  const getSectorName = (sectorId) => {
    const sector = sectors.find((sector) => sector.sector_id === sectorId);
    return sector ? sector.sector_nombre : 'Desconocido';
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${EVENTOS_API_URL}/${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId)); // Eliminar el evento de la tabla
        setDeleteDialogOpen(false);
        setAlertMessage('Evento eliminado correctamente.');
      } else {
        console.error('Error al eliminar el evento');
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  };

  const openDeleteDialog = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  // Habilitar/Deshabilitar Evento
  const toggleEvento = async (eventId, estadoActual) => {
    try {
      const response = await fetch(`${EVENTOS_API_URL}/${eventId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activo: !estadoActual }), // Cambia el estado activo
      });

      if (response.ok) {
        setEvents(events.map(event => 
          event.id === eventId ? { ...event, activo: !estadoActual } : event
        ));
        setAlertMessage(`Evento ${!estadoActual ? 'activado' : 'desactivado'} correctamente.`);
      } else {
        console.error('Error al cambiar el estado del evento');
      }
    } catch (error) {
      console.error('Error al cambiar el estado del evento:', error);
    }
  };

  const getCuposDisponibles = (evento) => {
    return evento.cupo - (evento.cupos_comprados || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  };

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Eventos
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
          onClick={() => navigate('/Eventos/CrearEvento')}
        >
          Agregar Nuevo Evento
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
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
              <td className="py-2 px-4 border-b">{event.cupos}</td>
              <td className="py-2 px-4 border-b">{getCuposDisponibles(event)}</td>
              <td className="py-2 px-4 border-b">{event.activo ? 'Activo' : 'Desactivado'}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  color={event.activo ? 'gray' : 'green'}
                  className="mr-2"
                  onClick={() => toggleEvento(event.id, event.activo)}
                >
                  {event.activo ? 'Desactivar' : 'Activar'}
                </Button>
                <Button color="blue" className="mr-2" onClick={() => navigate(`/Eventos/ModificarEvento/${event.id}`)}>
                  Modificar
                </Button>
                <Button color="red" onClick={() => openDeleteDialog(event.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteDialogOpen && (
        <Dialog open={deleteDialogOpen} handler={closeDeleteDialog}>
          <DialogHeader>Confirmar eliminación</DialogHeader>
          <DialogBody>
            ¿Desea realmente eliminar este evento?
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="blue-gray" onClick={closeDeleteDialog}>
              No
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleDelete(eventToDelete)}
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

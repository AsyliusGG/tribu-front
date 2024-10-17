import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const EVENTOS_API_URL = 'http://localhost:8000/eventos/api/v1/evento';
const SECTOR_API_URL = 'http://localhost:8000/eventos/api/v1/sector';

const EventosAdmin = () => {
  const [events, setEvents] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
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
      const response = await fetch(`${EVENTOS_API_URL}${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId)); // Eliminar el evento de la tabla
        setDeleteDialogOpen(false);
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

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Eventos
      </Typography>

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
            <th className="py-2 px-4 border-b">Lugar</th>
            <th className="py-2 px-4 border-b">Sector</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="py-2 px-4 border-b">{event.nombre}</td>
              <td className="py-2 px-4 border-b">{event.fecha}</td>
              <td className="py-2 px-4 border-b">{event.hora}</td>
              <td className="py-2 px-4 border-b">{event.lugar}</td>
              <td className="py-2 px-4 border-b">{getSectorName(event.sector)}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  color="blue"
                  className="mr-2"
                  onClick={() => navigate(`/eventos/${event.id}/modificar`)}
                >
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

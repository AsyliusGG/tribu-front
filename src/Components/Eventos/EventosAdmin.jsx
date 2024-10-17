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

// URL del endpoint de eventos (modifícalo si es necesario)
const API_URL = 'http://localhost:8000/api/v1/evento/';

const EventosAdmin = () => {
  const [events, setEvents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  // Cargar eventos desde la API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Agregar el token de autenticación si es necesario
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    }

    fetchEvents();
  }, []);

  // Función para confirmar la eliminación de un evento
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${API_URL}${eventId}/`, {
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

  // Función para abrir el diálogo de confirmación de eliminación
  const openDeleteDialog = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  // Función para cerrar el diálogo
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Administrador de Eventos
      </Typography>

      {/* Botón para agregar un nuevo evento */}
      <div className="flex justify-end mb-4">
        <Button
          variant="gradient"
          color="green"
          onClick={() => navigate('/eventos/CrearEvento')}
        >
          Agregar Nuevo Evento
        </Button>
      </div>

      {/* Tabla de eventos */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Título</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="py-2 px-4 border-b">{event.id}</td>
              <td className="py-2 px-4 border-b">{event.titulo}</td>
              <td className="py-2 px-4 border-b">{event.descripcion}</td>
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

      {/* Diálogo de confirmación de eliminación */}
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

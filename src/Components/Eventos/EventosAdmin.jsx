import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardHeader, CardBody, CardFooter, Dialog, DialogHeader, DialogBody, DialogFooter, Alert } from "@material-tailwind/react";
import axios from 'axios';
import Cookies from "js-cookie";

const EVENTOS_API_URL = "http://20.51.120.81:8000/api/v1/evento";
const SECTOR_API_URL = "http://20.51.120.81:8000/api/v1/sector";

const Eventos = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Obtener el usuario desde el estado de Redux
  const [posts, setPosts] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const token = Cookies.get("auth_token");
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const eventosResponse = await axios.get("http://20.51.120.81:8000/api/v1/evento/", { headers });
        const sectoresResponse = await axios.get("http://20.51.120.81:8000/api/v1/sector/", { headers });
        const eventosActivos = eventosResponse.data.filter(evento => !evento.disabled);
        setPosts(eventosActivos);
        setSectores(sectoresResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

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
    const sector = sectores.find((sector) => sector.id === sectorId);
    return sector ? sector.sector_nombre : "Desconocido";
  };

  const goToAdmin = () => {
    navigate("/Eventos/EventosAdmin");
  };

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
        setPosts(posts.filter((event) => event.id !== eventId));
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ disabled: !isActive }),
      });

      if (response.ok) {
        setPosts(posts.map((event) => (event.id === eventId ? { ...event, disabled: !isActive } : event)));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Botón de Administrador de Eventos */}
        {user && user.is_staff && (
          <div className="flex justify-end mb-6">
            <Button variant="gradient" color="blue" onClick={goToAdmin}>
              Administrador de Eventos
            </Button>
          </div>
        )}
        
        <Typography variant="h2" color="blue-gray" className="text-center mb-10">
          Nuestros Eventos
        </Typography>
        
        {alertMessage && (
          <Alert color="red" className="mb-4">
            {alertMessage}
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="w-full h-full flex flex-col justify-between cursor-pointer">
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={post.foto} alt={post.descripcion} className="w-full h-full object-cover" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {post.nombre}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  {formatDate(post.fecha)} - {formatTime(post.hora)}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  Sector: {getSectorName(post.sector)}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  Lugar: {post.lugar}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-end">
                <Button variant="gradient" color="green" onClick={() => handleActivateDeactivate(post.id, !post.disabled)}>
                  {post.disabled ? "Activar" : "Desactivar"}
                </Button>
                <Button variant="gradient" color="blue" onClick={() => handleModify(post.id)}>
                  Modificar
                </Button>
                <Button variant="gradient" color="red" onClick={() => openDeleteDialog(post.id)}>
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {deleteDialogOpen && (
          <Dialog open={deleteDialogOpen} handler={closeDeleteDialog}>
            <DialogHeader>Confirmar eliminación</DialogHeader>
            <DialogBody>¿Desea realmente eliminar este evento?</DialogBody>
            <DialogFooter>
              <Button variant="text" color="blue-gray" onClick={closeDeleteDialog}>
                No
              </Button>
              <Button variant="gradient" color="red" onClick={() => {
                handleDelete(eventToDelete);
                closeDeleteDialog();
              }}>
                Sí
              </Button>
            </DialogFooter>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Eventos;
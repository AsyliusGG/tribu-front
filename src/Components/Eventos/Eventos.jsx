import { getallEventos } from '../../api/api.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Eventos = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEventos() {
      const response = await getallEventos();
      const eventosActivos = response.data
        .filter(evento => !evento.disabled) // Filtrar eventos activos
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar por fecha, de la más próxima a la más lejana

      setPosts(eventosActivos);
    }

    loadEventos();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/verevento/${postId}`); // Cambia la ruta para que coincida con VerEvento.jsx
  };

  const goToAdmin = () => {
    navigate("/Eventos/EventosAdmin");
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
    const sector = sectors.find((sector) => sector.sector_id === sectorId);
    return sector ? sector.sector_nombre : "Desconocido";
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Botón de Administrador de Eventos */}
        <div className="flex justify-end mb-6">
          <Button variant="gradient" color="blue" onClick={goToAdmin}>
            Administrador de Eventos
          </Button>
        </div>
        
        <Typography variant="h2" color="blue-gray" className="text-center mb-10">
          Nuestros Eventos
        </Typography>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="w-full h-full flex flex-col justify-between cursor-pointer"
            >
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={post.foto}
                  alt={post.descripcion}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex-grow">
                <Typography variant="h5" className="mb-2 text-center font-bold">
                  {post.nombre} {/* Mostrar nombre del evento en negrita */}
                </Typography>

                {/* Mostrar la fecha del evento */}
                <Typography className="text-center mb-2">
                  Fecha: {formatDate(post.fecha)} {/* Formatear la fecha */}
                </Typography>

                {/* Mostrar la hora del evento */}
                <Typography className="text-center mb-2">
                  Hora: {formatTime(post.hora)} {/* Formatear la hora */}
                </Typography>

                {/* Mostrar el sector */}
                <Typography className="text-center mb-2">
                  Sector: {post.sector?.sector_nombre || post.sector_nombre || 'N/A'} {/* Mostrar el nombre del sector si existe */}
                </Typography>

                {/* Mostrar la dirección */}
                <Typography className="text-center">
                  Dirección: {post.lugar || 'No especificada'} {/* Mostrar la dirección si existe */}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center pt-4">
                <Button onClick={() => handlePostClick(post.id)}>Ver Más</Button> {/* Manejar el clic */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;

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
      const eventosActivos = response.data.filter(evento => !evento.disabled); // Filtrar eventos activos
      setPosts(eventosActivos);
    }

    loadEventos();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const goToAdmin = () => {
    navigate("/Eventos/EventosAdmin");
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
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={post.foto}
                  alt={post.descripcion}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                  {post.titulo}
                </Typography>
                <Typography className="text-center">{post.descripcion}</Typography>
              </CardBody>
              <CardFooter className="flex justify-center pt-4">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;

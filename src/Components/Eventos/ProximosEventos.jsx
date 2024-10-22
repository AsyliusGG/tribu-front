import React, { useState, useEffect } from 'react';
import { getallEventos } from '../../api/api.js'; // Asegúrate de que esto esté correctamente importado
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const ProximosEventos = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEventos() {
      const response = await getallEventos();
      const eventosActivos = response.data.filter(evento => !evento.disabled); // Filtrar eventos activos
      const currentDate = new Date();

      // Ordenar eventos por fecha más próxima a la más lejana
      const eventosProximos = eventosActivos
        .filter(evento => new Date(evento.fecha) >= currentDate) // Filtrar eventos que no han pasado
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)) // Ordenar por fecha más cercana
        .slice(0, 3); // Mostrar solo los 3 primeros

      setPosts(eventosProximos);
    }

    loadEventos();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/verevento/${postId}`); // Navegar a la página del evento seleccionado
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Título de Próximos Eventos */}
        <Typography variant="h2" color="blue-gray" className="text-center mb-10 pb-5">
          Próximos Eventos
        </Typography>

        {/* Mostrar mensaje si no hay eventos programados */}
        {posts.length === 0 ? (
          <Typography variant="h6" color="blue-gray" className="text-center mt-10">
            Por el momento no tenemos eventos programados :( pronto tendremos novedades!
          </Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="w-full h-full flex flex-col justify-between cursor-pointer">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img src={post.foto} alt={post.descripcion} className="w-full h-full object-cover" />
                </CardHeader>
                <CardBody className="flex-grow">
                  <Typography variant="h5" className="mb-2 text-center font-bold">
                    {post.nombre} {/* Nombre del evento */}
                  </Typography>
                  <Typography className="text-center mb-2">
                    Fecha: {new Date(post.fecha).toLocaleDateString()} {/* Fecha del evento */}
                  </Typography>
                  <Typography className="text-center mb-2">
                    Sector: {post.sector?.sector_nombre || post.sector_nombre || 'N/A'} {/* Nombre del sector */}
                  </Typography>
                  <Typography className="text-center">
                    Dirección: {post.lugar || 'No especificada'} {/* Dirección del evento */}
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-center pt-4">
                  <Button onClick={() => handlePostClick(post.id)}>Ver más</Button> {/* Botón para ver más */}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProximosEventos;

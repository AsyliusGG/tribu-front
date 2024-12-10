import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import axios from 'axios';
import Cookies from "js-cookie";

const Eventos = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Obtener el usuario desde el estado de Redux
  const [posts, setPosts] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                <Button variant="gradient" color="blue" onClick={() => navigate(`/Eventos/VerEvento/${post.id}`)}>
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;

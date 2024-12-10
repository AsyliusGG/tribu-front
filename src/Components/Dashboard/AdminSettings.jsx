import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import axios from 'axios';
import Cookies from "js-cookie";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from 'recharts';

const AdminSettings = () => {
  const [eventos, setEventos] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [alianzas, setAlianzas] = useState([]);
  const [hijos, setHijos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("auth_token");
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const [eventosResponse, sectoresResponse, membershipsResponse, alianzasResponse, hijosResponse] = await Promise.all([
          axios.get("http://20.51.120.81:8000/api/v1/evento/", { headers }),
          axios.get("http://20.51.120.81:8000/api/v1/sector/", { headers }),
          axios.get("http://20.51.120.81:8000/api/v1/memberships/", { headers }),
          axios.get("http://20.51.120.81:8000/api/v1/alianzas/", { headers }),
          axios.get("http://20.51.120.81:8000/api/v1/hijo/", { headers })
        ]);

        setEventos(eventosResponse.data);
        setSectores(sectoresResponse.data);
        setMemberships(membershipsResponse.data);
        setAlianzas(alianzasResponse.data);
        setHijos(hijosResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  const getSectorName = (sectorId) => {
    const sector = sectores.find((sector) => sector.id === sectorId);
    return sector ? sector.nombre : "Desconocido";
  };

  return (
    <div className="container mx-auto px-4">
      <Typography variant="h2" color="blue-gray" className="text-center mb-10">
        Configuración de Administrador
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <Card key={evento.id} className="w-full">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {evento.nombre}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                Sector: {getSectorName(evento.sector)}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                Fecha: {new Date(evento.fecha).toLocaleDateString()}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                Hora: {new Date(evento.hora).toLocaleTimeString()}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button variant="gradient" color="blue" onClick={() => navigate(`/Eventos/ModificarEvento/${evento.id}`)}>
                Modificar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;

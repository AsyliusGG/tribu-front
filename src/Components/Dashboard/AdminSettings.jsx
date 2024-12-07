import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");



const AdminSettings = () => {
  const [eventos, setEventos] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosResponse, sectoresResponse, membershipsResponse] = await Promise.all([
          fetch('http://localhost:8000/api/v1/evento/'),
          fetch('http://localhost:8000/api/v1/sector/'),
          fetch('http://localhost:8000/api/v1/memberships/')
        ]);

        if (!eventosResponse.ok || !sectoresResponse.ok || !membershipsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const eventosData = await eventosResponse.json();
        const sectoresData = await sectoresResponse.json();
        const membershipsData = await membershipsResponse.json();

        setEventos(eventosData);
        setSectores(sectoresData);
        setMemberships(membershipsData);

        // Imprimir los datos obtenidos en la consola
        console.log("Eventos Data:", eventosData);
        console.log("Sectores Data:", sectoresData);
        console.log("Memberships Data:", membershipsData);
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

  // Crear un mapa de sectores para una búsqueda rápida
  const sectoresMap = sectores.reduce((map, sector) => {
    map[sector.id] = sector.sector_nombre;
    return map;
  }, {});

  // Calcular estadísticas de eventos
  const eventoConMasCupos = eventos.reduce((max, evento) => evento.cupos > max.cupos ? evento : max, eventos[0]);
  const eventoConMenosCupos = eventos.reduce((min, evento) => evento.cupos < min.cupos ? evento : min, eventos[0]);

  // Calcular estadísticas de membresías
  const membresiasActivas = memberships.filter(membership => membership.active).length;

  // Calcular membresías próximas a vencer (menos de 2 semanas)
  const hoy = new Date();
  const dosSemanas = 14 * 24 * 60 * 60 * 1000; // 14 días en milisegundos
  const membresiasProximasAVencer = memberships.filter(membership => {
    const endDate = new Date(membership.end_date);
    return endDate - hoy < dosSemanas && endDate - hoy > 0;
  }).length;

  const handleDownloadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/descargar_usuarios/", {
        responseType: 'blob', // Para manejar la descarga de archivos
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'usuarios.xlsx'); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error al descargar usuarios:', error);
    }
  };

  return (
    // Panel lateral
    <div className="flex">
      <div className="w-1/6 bg-gray-200 p-4">
      <Button variant="gradient" color="blue" onClick={() => navigate("/Alianzas/AlianzasAdmin")} className="my-2 w-full">
        Administrador de Alianzas
      </Button>
      <Button variant="gradient" color="blue" onClick={() => navigate("/Eventos/EventosAdmin")} className="my-2 w-full">
        Administrador de Eventos
      </Button>
      <Button variant="gradient" color="blue" onClick={handleDownloadUsers} className="my-2 w-full">
        Descargar Usuarios
      </Button>
      </div>

      {/* Graficos */}
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex justify-around mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 w-1/2 mx-2">
          <h2 className="text-xl font-semibold mb-2">Evento con más cupos</h2>
          <p className="text-gray-700">{eventoConMasCupos.nombre}</p>
          <p className="text-gray-700">Cupos: {eventoConMasCupos.cupos}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-1/2 mx-2">
          <h2 className="text-xl font-semibold mb-2">Evento con menos cupos</h2>
          <p className="text-gray-700">{eventoConMenosCupos.nombre}</p>
          <p className="text-gray-700">Cupos: {eventoConMenosCupos.cupos}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {eventos.map((evento) => (
          <div className="bg-white shadow-md rounded-lg p-4" key={evento.id}>
            <h2 className="text-lg font-semibold mb-2">{evento.nombre}</h2>
            <p className="text-gray-700">Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
            <p className="text-gray-700">Hora: {evento.hora}</p>
            <p className="text-gray-700">Lugar: {evento.lugar}</p>
            <p className="text-gray-700">Sector: {sectoresMap[evento.sector]}</p>
            <p className="text-gray-700">Cupos: {evento.cupos}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Membresías Activas</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700">Cantidad de membresías activas: {membresiasActivas}</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Membresías Próximas a Vencer</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700">Cantidad de membresías próximas a vencer: {membresiasProximasAVencer}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminSettings;

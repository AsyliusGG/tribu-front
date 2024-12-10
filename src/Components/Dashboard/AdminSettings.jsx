import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
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
          fetch('http://localhost:8000/api/v1/evento/', { headers }),
          fetch('http://localhost:8000/api/v1/sector/', { headers }),
          fetch('http://localhost:8000/api/v1/memberships/', { headers }),
          fetch('http://localhost:8000/api/v1/alianzas/', { headers }),
          fetch('http://localhost:8000/api/v1/hijo/', { headers })
        ]);
        
        if (!eventosResponse.ok || !sectoresResponse.ok || !membershipsResponse.ok || !alianzasResponse.ok || !hijosResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const eventosData = await eventosResponse.json();
        const sectoresData = await sectoresResponse.json();
        const membershipsData = await membershipsResponse.json();
        const alianzasData = await alianzasResponse.json();
        const hijosData = await hijosResponse.json();

        setEventos(eventosData);
        setSectores(sectoresData);
        setMemberships(membershipsData);
        setAlianzas(alianzasData); // Aquí se actualiza el estado de las alianzas
        setHijos(hijosData); // Aquí se actualiza el estado de los hijos

        // Imprimir los datos obtenidos en la consola
        console.log("Eventos Data:", eventosData);
        console.log("Sectores Data:", sectoresData);
        console.log("Memberships Data:", membershipsData);
        console.log("Alianzas Data:", alianzasData);
        console.log("Hijos Data:", hijosData);
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
  const obtenerEventosConPocosCupos = (eventos) => { return eventos.filter(evento => evento.cupos < 5);};

  // Calcular estadísticas de membresías
  const membresiasActivas = memberships.filter(membership => membership.active).length;
  
  // Llamar a la función y almacenar los eventos con pocos cupos
  const eventosConPocosCupos = obtenerEventosConPocosCupos(eventos);

  // Calcular membresías próximas a vencer (menos de 2 semanas)
  const hoy = new Date();
  const dosSemanas = 14 * 24 * 60 * 60 * 1000; // 14 días en milisegundos
  const membresiasProximasAVencer = memberships.filter(membership => {
    const endDate = new Date(membership.end_date);
    return endDate - hoy < dosSemanas && endDate - hoy > 0;
  }).length;

  // Preparar los datos para el gráfico de torta
  const pieData = [
    { name: 'Membresías Activas', value: membresiasActivas },
    { name: 'Membresías por Vencer', value: membresiasProximasAVencer }
  ];
    
  // Calcular la cantidad de eventos por sector
  const eventosPorSector = eventos.reduce((acc, evento) => {
    acc[evento.sector] = (acc[evento.sector] || 0) + 1;
    return acc;
  }, {});

  // Calcular la cantidad de alianzas activas
  const alianzasActivas = alianzas.filter(alianza => alianza.Estado).length;

  // Preparar los datos para el gráfico de alianzas
  const alianzasData = [
    { name: 'Alianzas Activas', value: alianzasActivas },
    { name: 'Alianzas Inactivas', value: alianzas.length - alianzasActivas }
  ];

  // Calcular el rango de edades de los hijos
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };
  
  // Calcular el rango de edades de los hijos
  const calcularRangoEdades = (hijos) => {
    const rangos = {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      'mayor de 5': 0
    };
  
    hijos.forEach(hijo => {
      const edad = calcularEdad(hijo.fecha_nacimiento); // Asumiendo que cada hijo tiene una propiedad 'fecha_nacimiento'
      if (edad >= 0 && edad <= 5) {
        rangos[edad] += 1;
      } else if (edad > 5) {
        rangos['mayor de 5'] += 1;
      }
    });
  
    return Object.keys(rangos).map(edad => ({ edad, cantidad: rangos[edad] }));
  };

  // Preparar los datos para el gráfico de barras de rango de edades
  const rangoEdadesData = calcularRangoEdades(hijos);

  // Preparar los datos para el gráfico de torta
  const data = Object.keys(eventosPorSector).map(sector => ({
    name: sectoresMap[sector],
    value: eventosPorSector[sector]
  }));

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

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
      <div className="w-1/6 bg-pink-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mx-auto text-gray-900">Admin Dashboard</h1>

      <Button variant="gradient" color="pink" onClick={() => navigate("/Alianzas/AlianzasAdmin")} className="my-2 w-full">
        Administrador de Alianzas
      </Button>
      <Button variant="gradient" color="pink" onClick={() => navigate("/Eventos/EventosAdmin")} className="my-2 w-full">
        Administrador de Eventos
      </Button>
      <Button variant="gradient" color="pink" onClick={handleDownloadUsers} className="my-2 w-full">
        Descargar Usuarios
      </Button>

      {/* Datos estadísticos */}
      <div className="flex flex-col justify-around mb-8 gap-2 mt-6">
  <div className="bg-white shadow-md rounded-lg p-4 mx-2">
    <div className="bg-pink-200 rounded-xl border-gray-400 p-2 mb-2">
      <h2 className="text-xl font-semibold mb-1 text-white">Evento con más cupos</h2>
    </div>
    <p className="text-black-800">{eventoConMasCupos.nombre}</p>
    <p className="text-black-800">Cupos: {eventoConMasCupos.cupos}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 mx-2">
    <div className="bg-pink-200 rounded-xl border-gray-400 p-2 mb-2">
      <h2 className="text-xl font-semibold mb-1 text-white">Evento con menos cupos</h2>
    </div>
    <p className="text-black-800">{eventoConMenosCupos.nombre}</p>
    <p className="text-black-800">Cupos: {eventoConMenosCupos.cupos}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 mx-2">
    <div className="bg-pink-200 rounded-xl border-gray-400 p-2 mb-2">
      <h2 className="text-xl font-semibold mb-1 text-white">Eventos con pocos cupos</h2>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4">
      <ul>
        {eventosConPocosCupos.map(evento => (
          <li key={evento.id} className="text-black-800">{evento.nombre} - {evento.cupos} cupos restantes</li>
        ))}
      </ul>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 mx-2">
    <div className="bg-pink-200 rounded-xl border-gray-400 p-2 mb-2">
      <h2 className="text-xl font-semibold mb-1 text-white">Membresías Activas</h2>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-black-800">Cantidad de membresías activas: {membresiasActivas}</p>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 mx-2">
    <div className="bg-pink-200 rounded-xl border-gray-400 p-2 mb-2">
      <h2 className="text-xl font-semibold mb-1 text-white">Cantidad de Hijos</h2>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-black-800">Total de Hijos: {hijos.length}</p>
    </div>
  </div>
</div>
      </div>

      {/* Graficos */}
    <div className="container mx-auto p-4">
      {/* Grafico de Barras "Cantidad de Eventos por Sector" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Cantidad de Eventos por Sector</h2>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Bar>
          </BarChart>
        </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Membresías Activas vs Por Vencer</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={80}            
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Rango de Edad de Hijos</h2>
        {rangoEdadesData.length > 0 && (
          <BarChart
            width={700}
            height={400}
            data={rangoEdadesData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="edad" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Cantidad de Alianzas Activas</h2>
        {alianzasData.length > 0 && (
          <PieChart width={400} height={400}>
            <Pie
              data={alianzasData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {alianzasData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>





    </div>
    </div>
    </div>
  );
};

export default AdminSettings;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventoById } from "../../api/api.js"; // Asegúrate de que esta función esté definida en api.js
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const VerEvento = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvento = async () => {
      try {
        const eventoData = await getEventoById(id); // Llamada a la API para obtener los datos del evento por ID
        setEvento(eventoData);
        setLoading(false); // Cambiar estado de carga cuando se obtienen los datos
      } catch (error) {
        setError("Error al cargar el evento.");
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    evento && (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <Card className="w-full max-w-4xl p-6">
          <CardHeader color="blue-gray" className="relative h-72">
            <img
              src={evento.foto}
              alt={evento.nombre}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h3" color="blue-gray" className="font-bold">
              {evento.nombre}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              {evento.descripcion}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              <strong>Sector:</strong> {evento.sector?.sector_nombre || "N/A"}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              <strong>Dirección:</strong> {evento.lugar || "No especificada"}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              <strong>Valor Adulto:</strong> ${evento.valor_adulto.toLocaleString("es-CL")}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              <strong>Valor Niño:</strong> ${evento.valor_nino.toLocaleString("es-CL")}
            </Typography>
            <div className="mt-6 flex space-x-4">
              <Button color="green">Agregar Valor Adulto al Carrito</Button>
              <Button color="green">Agregar Valor Niño al Carrito</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  );
};

export default VerEvento;

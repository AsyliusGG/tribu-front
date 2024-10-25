import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const ALIANZA_API_URL = "http://localhost:8000/eventos/api/v1/alianzas"; // Actualiza con tu API correcta

const VerAlianza = () => {
  const { id } = useParams();
  const [alianza, setAlianza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAlianza = async () => {
      try {
        const response = await fetch(`${ALIANZA_API_URL}/${id}/`);
        const data = await response.json();
        setAlianza(data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar la alianza.");
        setLoading(false);
      }
    };

    loadAlianza();
  }, [id]);

  const handleDescuentoClick = () => {
    console.log("Aplicar descuento para esta alianza");
    // Lógica para hacer uso del descuento, como un redireccionamiento o mostrar más detalles
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    alianza && (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <Card className="w-full max-w-4xl p-6">
          {/* Imagen de la alianza */}
          <CardHeader color="blue-gray" className="relative h-[36rem]">
            <img
              src={alianza.foto}
              alt={alianza.alianza_nombre}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            {/* Título de la alianza */}
            <Typography
              variant="h3"
              color="blue-gray"
              className="font-bold text-center"
            >
              {alianza.alianza_nombre}
            </Typography>

            {/* Descripción, empresa y promoción */}
            <Typography color="blue-gray" className="mt-4">
              {alianza.descripcion}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              <strong>Empresa:</strong> {alianza.alianza_empresa}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              <strong>Promoción:</strong> {alianza.Promocion}
            </Typography>

            {/* Botón para usar el descuento */}
            <div className="mt-6 flex justify-center items-center">
              <Button color="blue" onClick={handleDescuentoClick}>
                Hacer uso de mi descuento
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  );
};

export default VerAlianza;

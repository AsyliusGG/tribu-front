import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getAlianzaById } from "../../api/api";


const VerAlianza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alianza, setAlianza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlianza = async () => {
      try {
        const data = await getAlianzaById(id);
        setAlianza(data);
      } catch (error) {
        console.error("Error al cargar la alianza:", error);
        setError("Error al cargar la información de la alianza.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlianza();
  }, [id]);


  const handleDescuentoClick = () => {
    navigate(`/Alianzas/UsarAlianza/${id}`);
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
          <CardHeader color="blue-gray" className="relative h-[18rem]"> {/* Reducimos la altura a la mitad */}
            <img
              src={alianza.foto}
              alt={alianza.alianza_nombre}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h3" color="blue-gray" className="font-bold text-center">
              {alianza.alianza_nombre}
            </Typography>

            <Typography color="blue-gray" className="mt-4">
              {alianza.descripcion}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              <strong>Empresa:</strong> {alianza.alianza_empresa}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              <strong>Promoción:</strong> {alianza.Promocion}
            </Typography>

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

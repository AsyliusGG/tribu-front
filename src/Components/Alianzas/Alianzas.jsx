import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getAlianzas } from "../../api/api";
import { useSelector } from "react-redux";
const token = Cookies.get("auth_token");



const Alianzas = () => {
  const [alianzas, setAlianzas] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Obtener el usuario desde el estado de Redux

  // Obtener alianzas activas desde la API
  useEffect(() => {
    async function fetchAlianzas() {
      try {
        const response = await getAlianzas();
        const alianzasData = response.data;
        const today = new Date().toISOString().split("T")[0];
        const filteredAlianzas = alianzasData.filter(
          (alianza) => alianza.Estado === true && alianza.Fecha_final >= today
        );
        setAlianzas(filteredAlianzas);
      } catch (error) {
        console.error("Error al obtener las alianzas:", error);
      }
    }
  
    fetchAlianzas();
  }, []);



  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
      

        <Typography variant="h2" color="blue-gray" className="text-center mb-10">
          Nuestras Alianzas
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {alianzas.map((alianza) => (
            <Card key={alianza.id} className="w-full h-full flex flex-col justify-between">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={alianza.foto}
                  alt={alianza.alianza_nombre}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                  {alianza.alianza_nombre}
                </Typography>
                <Typography className="text-center">{alianza.Promocion}</Typography>
              </CardBody>
              <CardFooter className="flex flex-col items-center pt-4">
                <Typography variant="subtitle2" color="blue-gray" className="mb-2 text-center">
                  Empresa: {alianza.alianza_empresa}
                </Typography>
                <Button onClick={() => navigate(`/Alianzas/VerAlianza/${alianza.id}`)}>
                  Ver Más
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alianzas;

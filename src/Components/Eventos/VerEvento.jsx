import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById, getallSector } from "../../api/api.js";
import { useDispatch } from "react-redux";
import { agregarEvento } from "../../slices/carritoSlice.js";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Alert,
} from "@material-tailwind/react";

const VerEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [evento, setEvento] = useState(null);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cantidadNino, setCantidadNino] = useState(0);
  const [cantidadAdulto, setCantidadAdulto] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadEvento = async () => {
      try {
        const [eventoData, sectoresResponse] = await Promise.all([
          getEventoById(id),
          getallSector()
        ]);
        setEvento(eventoData);
        setSectores(sectoresResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  const handleCantidadNino = (operacion) => {
    if (operacion === "sumar") setCantidadNino(cantidadNino + 1);
    else if (operacion === "restar" && cantidadNino > 0)
      setCantidadNino(cantidadNino - 1);
  };

  const handleCantidadAdulto = (operacion) => {
    if (operacion === "sumar") setCantidadAdulto(cantidadAdulto + 1);
    else if (operacion === "restar" && cantidadAdulto > 0)
      setCantidadAdulto(cantidadAdulto - 1);
  };

  const agregarAlCarrito = () => {
    if (cantidadNino === 0 && cantidadAdulto === 0) {
      alert("Debe seleccionar al menos un boleto para agregar al carrito.");
      return;
    }

    dispatch(
      agregarEvento({
        eventoId: evento.id,
        nombreEvento: evento.nombre,
        cantidadNino,
        cantidadAdulto,
        precioNino: evento.valor_nino,
        precioAdulto: evento.valor_adulto,
        subtotal:
          cantidadNino * evento.valor_nino + cantidadAdulto * evento.valor_adulto,
      })
    );

    // Mensaje de éxito y limpieza de cantidades
    setSuccessMessage("Entradas agregadas al carrito con éxito.");
    setCantidadNino(0);
    setCantidadAdulto(0);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000); // Oculta el mensaje después de 3 segundos
  };

  const handleComprarAhora = () => {
    if (cantidadNino === 0 && cantidadAdulto === 0) {
      alert("Debe seleccionar al menos un boleto para comprar.");
      return;
    }

    dispatch(
      agregarEvento({
        eventoId: evento.id,
        nombreEvento: evento.nombre,
        cantidadNino,
        cantidadAdulto,
        precioNino: evento.valor_nino,
        precioAdulto: evento.valor_adulto,
        subtotal:
          cantidadNino * evento.valor_nino + cantidadAdulto * evento.valor_adulto,
      })
    );

    navigate("../../carritoCompra"); // Redirige al carrito
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const getSectorName = (sectorId) => {
    const sector = sectores.find((sector) => sector.id === sectorId);
    return sector ? sector.sector_nombre : "Desconocido";
  };

  return (
    evento && (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
        {successMessage && (
          <Alert
            color="green"
            className="fixed top-20 z-50 w-80 text-center"
          >
            {successMessage}
          </Alert>
        )}

        <Card className="w-full max-w-4xl p-6">
          <CardHeader color="blue-gray" className="relative h-[36rem]">
            <img
              src={evento.foto}
              alt={evento.nombre}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="font-bold text-center"
            >
              {evento.nombre}
            </Typography>

            <Typography color="blue-gray" className="mt-4">
              {evento.descripcion}
            </Typography>
            <Typography color="blue-gray" className="mt-4">
              <strong>Sector:</strong> {getSectorName(evento.sector)}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              <strong>Dirección:</strong> {evento.lugar || "No especificada"}
            </Typography>

            <div className="mt-8">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold mb-4 text-center"
              >
                Compra Boletos
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col justify-between">
                  <Typography className="mb-2 mt-2 mr-4 text-right">
                    <strong>Valor Niño:</strong> $
                    {evento.valor_nino.toLocaleString("es-CL")}
                  </Typography>
                  <Typography className="mb-4 mr-4 text-right">
                    <strong>Valor Adulto:</strong> $
                    {evento.valor_adulto.toLocaleString("es-CL")}
                  </Typography>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg p-1 w-60">
                    <Button
                      onClick={() => handleCantidadNino("restar")}
                      className="bg-[#f48fb1] hover:bg-pink-400 rounded-l-lg px-4"
                    >
                      -
                    </Button>
                    <Typography className="px-6">{cantidadNino}</Typography>
                    <Button
                      onClick={() => handleCantidadNino("sumar")}
                      className="bg-[#f48fb1] hover:bg-pink-400 rounded-r-lg px-4"
                    >
                      +
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1 w-60">
                    <Button
                      onClick={() => handleCantidadAdulto("restar")}
                      className="bg-[#f48fb1] hover:bg-pink-400 rounded-l-lg px-4"
                    >
                      -
                    </Button>
                    <Typography className="px-6">{cantidadAdulto}</Typography>
                    <Button
                      onClick={() => handleCantidadAdulto("sumar")}
                      className="bg-[#f48fb1] hover:bg-pink-400 rounded-r-lg px-4"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Button color="green" onClick={agregarAlCarrito}>
                  Agregar al Carrito
                </Button>
                <Button color="blue" onClick={handleComprarAhora}>
                  Comprar Ahora
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  );
};

export default VerEvento;

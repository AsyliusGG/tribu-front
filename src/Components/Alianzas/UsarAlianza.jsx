import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";

const UsarAlianza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [alianza, setAlianza] = useState(null);

  useEffect(() => {
    // Fetch de la información de la alianza para mostrar empresa y promoción
    const fetchAlianza = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/alianzas/${id}/`);
        const data = await response.json();
        setAlianza(data);
      } catch (error) {
        console.error("Error al cargar la alianza", error);
      }
    };

    fetchAlianza();

    // Temporizador de cuenta regresiva
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Se acabó el tiempo");
          navigate(`/Alianzas/VerAlianza/${id}`); // Redirigir a VerAlianza al cerrar la alerta
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id, navigate]);

  // Función para convertir segundos a minutos y segundos en formato "mm:ss"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Generar URL para el código QR
  const qrCodeUrl = `https://example.com/ComprobarMembresia?id=${id}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <Card className="w-full max-w-lg p-6 text-center">
        {alianza ? (
          <>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-4">
              Muestra este código QR a la persona encargada en 
              <span className="text-pink-500"> {alianza.alianza_empresa}</span>
            </Typography>
            <Typography color="blue-gray" className="mb-6">
              Para comprobar que eres miembro de esta maravillosa comunidad y poder acceder a
              tu beneficio de {alianza.Promocion}.
            </Typography>
            <Typography color="blue-gray" className="mb-6">
                El código solo dura 5 minutos, después de este tiempo deberás volver a generarlo.
            </Typography>

            {/* Código QR simulado */}
            <div className="border border-gray-400 w-48 h-48 mx-auto mb-6 flex items-center justify-center">
              <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">
                <Typography color="blue-gray">QR Code for {qrCodeUrl}</Typography>
              </a>
            </div>

            {/* Temporizador */}
            <Typography variant="h6" color="blue-gray" className="mb-6">
              Tiempo restante: {formatTime(timeLeft)}
            </Typography>

            <Button color="blue" onClick={() => navigate(`/Alianzas/VerAlianza/${id}`)}>
              Regresar a la alianza
            </Button>
          </>
        ) : (
          <Typography>Cargando información de la alianza...</Typography>
        )}
      </Card>
    </div>
  );
};

export default UsarAlianza;

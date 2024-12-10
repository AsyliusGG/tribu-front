import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";
import Cookies from "js-cookie";

const UsarAlianza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [alianza, setAlianza] = useState(null);
  const [qrCode, setQrCode] = useState(null); // Estado para almacenar el código QR
  const [user, setUser] = useState(null);
  const [membership, setMembership] = useState(null);
  const token = Cookies.get("auth_token");

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/memberships/generate-qr`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setMembership(data); // Almacena los detalles de la membresía
          setQrCode(data.qr_code); // Almacena el código QR en base64
        } else {
          console.error("Error al obtener los datos de la membresía:", response.statusText);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };
  
    fetchMembershipData();
  }, [id, token]);

  useEffect(() => {
    // Fetch de la información de la alianza para mostrar empresa y promoción
    const fetchAlianza = async () => {
      try {
        const response = await fetch(`http://20.51.120.81:8000/api/v1/alianzas/${id}/`);
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
           
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="w-48 h-48 mx-auto mb-6" />
            )}

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

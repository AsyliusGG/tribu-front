import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const CrearEvento = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cupo, setCupo] = useState("");
  const [valorAdulto, setValorAdulto] = useState("");
  const [valorNino, setValorNino] = useState("");
  const [lugar, setLugar] = useState("");
  const [foto, setFoto] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [sectorSeleccionado, setSectorSeleccionado] = useState("");
  const [sectores, setSectores] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!token) {
      alert("Debes iniciar sesión para acceder a esta página.");
      navigate("/login");
    }
  }, [token, navigate]);

  const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function fetchSectores() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/sector/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSectores(data);
        } else {
          throw new Error("No se pudieron cargar los sectores");
        }
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    }
    fetchSectores();
  }, [token]);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const formatCurrency = (value) => {
    const numberValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(numberValue);
  };

  const handleValorAdultoChange = (e) => {
    setValorAdulto(formatCurrency(e.target.value));
  };

  const handleValorNinoChange = (e) => {
    setValorNino(formatCurrency(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !descripcion ||
      !cupo ||
      !valorAdulto ||
      !valorNino ||
      !foto ||
      !fecha ||
      !hora ||
      !horaTermino ||
      !lugar ||
      !sectorSeleccionado
    ) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const valorAdultoNumber = parseInt(valorAdulto.replace(/\D/g, ""), 10);
    const valorNinoNumber = parseInt(valorNino.replace(/\D/g, ""), 10);

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupos", cupo);
    formData.append("valor_adulto", valorAdultoNumber);
    formData.append("valor_nino", valorNinoNumber);
    formData.append("foto", foto);
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("hora_termino", horaTermino);
    formData.append("lugar", lugar);
    formData.append("sector", sectorSeleccionado);

    try {
      const response = await fetch("http://localhost:8000/api/v1/evento/", {
        method: "POST", // Cambiado a POST
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
        body: formData, // Enviar los datos como FormData
      });

      console.log("Encabezados enviados:", {
        Authorization: `Bearer ${token}`,
      });

      if (response.ok) {
        navigate("/Eventos/EventosAdmin", { state: { success: true } });
      } else {
        const data = await response.json();
        console.error("Error en la respuesta:", data);
        alert("Error al crear el evento");
      }
    } catch (error) {
      alert("Hubo un error al enviar los datos");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 w-full max-w-4xl">
        <Typography variant="h4" color="blue-gray" className="text-center mb-6">
          Crear Nuevo Evento
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Nombre del Evento
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Cupo
              </Typography>
              <Input
                type="number"
                size="lg"
                label="Cupo"
                value={cupo}
                onChange={(e) => setCupo(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Valor Adulto
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Valor Adulto"
                value={valorAdulto}
                onChange={handleValorAdultoChange}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Valor Niño
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Valor Niño"
                value={valorNino}
                onChange={handleValorNinoChange}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Foto del Evento
              </Typography>
              <Input
                type="file"
                size="lg"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Fecha del Evento
              </Typography>
              <Input
                type="date"
                size="lg"
                min={obtenerFechaActual()}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Hora de Inicio
              </Typography>
              <Input
                type="time"
                size="lg"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Hora de Término
              </Typography>
              <Input
                type="time"
                size="lg"
                value={horaTermino}
                onChange={(e) => setHoraTermino(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Lugar del Evento (Dirección)
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Dirección del Evento"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Sector del Evento
              </Typography>
              <Select
                size="lg"
                label="Selecciona el Sector"
                value={sectorSeleccionado}
                onChange={(e) => setSectorSeleccionado(e)}
                required
              >
                {sectores.map((sector) => (
                  <Option key={sector.id} value={String(sector.id)}>
                    {sector.sector_nombre}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Descripción
              </Typography>
              <Textarea
                size="lg"
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" color="blue" fullWidth className="mt-4">
            Crear Evento
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CrearEvento;

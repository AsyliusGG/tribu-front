import React, { useState, useEffect } from "react";
import { getallSector } from '../../api/api.js';
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
import Cookies from "js-cookie";

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

  const token = Cookies.get("auth_token");

  useEffect(() => {
    if (!token) {
      alert("Debes iniciar sesión para acceder a esta página.");
      navigate("/login");
    }

    const fetchSectores = async () => {
      try {
        const response = await getallSector();
        if (response.status === 200) {
          setSectores(response.data);
        } else {
          throw new Error("No se pudieron cargar los sectores");
        }
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    };

    fetchSectores();
  }, [token, navigate]);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupo", cupo);
    formData.append("valor_adulto", valorAdulto);
    formData.append("valor_nino", valorNino);
    formData.append("foto", foto);
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("hora_termino", horaTermino);
    formData.append("lugar", lugar);
    formData.append("sector", sectorSeleccionado);

    try {
      const response = await fetch("http://20.51.120.81:8000/api/v1/evento/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
                type="number"
                size="lg"
                label="Valor Adulto"
                value={valorAdulto}
                onChange={(e) => setValorAdulto(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Valor Niño
              </Typography>
              <Input
                type="number"
                size="lg"
                label="Valor Niño"
                value={valorNino}
                onChange={(e) => setValorNino(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Lugar del Evento
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
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

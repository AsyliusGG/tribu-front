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
import { useNavigate, useParams } from "react-router-dom";
import { getallSector, getEventoById, updateEvento } from "../../api/api.js";

const ModificarEvento = () => {
  const { id } = useParams(); // Obtener el id del evento de los parámetros de la URL
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

  // Cargar sectores desde la API
  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const sectoresData = await getallSector();
        setSectores(sectoresData.data);
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    };
    fetchSectores();
  }, []);

  // Cargar datos del evento actual
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const eventoData = await getEventoById(id);
        setNombre(eventoData.nombre || "");
        setDescripcion(eventoData.descripcion || "");
        setCupo(eventoData.cupos || "");
        setValorAdulto(eventoData.valor_adulto || "");
        setValorNino(eventoData.valor_nino || "");
        setLugar(eventoData.lugar || "");
        setFecha(eventoData.fecha || "");
        setHora(eventoData.hora || "");
        setHoraTermino(eventoData.hora_termino || "");
        setSectorSeleccionado(String(eventoData.sector) || "");
      } catch (error) {
        console.error("Error al cargar el evento:", error);
      }
    };
    fetchEvento();
  }, [id]);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear FormData para enviar datos junto con la imagen
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupos", cupo);
    formData.append("valor_adulto", valorAdulto);
    formData.append("valor_nino", valorNino);
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("hora_termino", horaTermino);
    formData.append("lugar", lugar);
    formData.append("sector", sectorSeleccionado);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await updateEvento(id, formData);
      navigate("/Eventos/EventosAdmin", { state: { success: true } });
    } catch (error) {
      console.error("Error al modificar el evento:", error.response || error);
      alert(
        error.response?.data?.detail ||
          "Hubo un error inesperado al modificar el evento."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 w-full max-w-4xl">
        <Typography variant="h4" color="blue-gray" className="text-center mb-6">
          Modificar Evento
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
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Foto del Evento
              </Typography>
              <Input type="file" size="lg" onChange={handleFileChange} />
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
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Lugar del Evento
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Dirección del Evento"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
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
                onChange={(value) => setSectorSeleccionado(value)}
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
              />
            </div>
          </div>

          <Button type="submit" color="blue" fullWidth className="mt-4">
            Modificar Evento
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ModificarEvento;

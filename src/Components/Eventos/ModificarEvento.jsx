import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obtener el ID del evento y redirigir
import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
  Select,
  Option,
} from "@material-tailwind/react";

const ModificarEvento = () => {
  const { id } = useParams(); // Obtener el ID del evento desde la URL
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cupo, setCupo] = useState("");
  const [precio, setPrecio] = useState("");
  const [foto, setFoto] = useState(null);
  const [fecha, setFecha] = useState(""); // Campo para la fecha
  const [hora, setHora] = useState(""); // Campo para la hora
  const [sectorSeleccionado, setSectorSeleccionado] = useState("");
  const [sectores, setSectores] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Cargar los sectores y el evento actual desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        const [sectorResponse, eventResponse] = await Promise.all([
          fetch("http://localhost:8000/eventos/api/v1/sector"),
          fetch(`http://localhost:8000/eventos/api/v1/evento/${id}`)
        ]);

        const sectorData = await sectorResponse.json();
        const eventData = await eventResponse.json();

        setSectores(sectorData);
        setNombre(eventData.nombre);
        setDescripcion(eventData.descripcion);
        setCupo(eventData.cupo);
        setPrecio(eventData.precio);
        setFecha(eventData.fecha);
        setHora(eventData.hora);
        setSectorSeleccionado(eventData.sector);
      } catch (error) {
        console.error("Error al cargar los datos del evento:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (
      !nombre ||
      !descripcion ||
      !cupo ||
      !precio ||
      !fecha ||
      !hora ||
      !sectorSeleccionado
    ) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    // Crear el FormData para enviar archivos junto con los datos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupo", cupo);
    formData.append("precio", precio);
    if (foto) formData.append("foto", foto); // Solo enviar la nueva foto si se cambia
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("sector", sectorSeleccionado);

    try {
      // Enviar datos a la API
      const response = await fetch(
        `http://localhost:8000/eventos/api/v1/evento/${id}/`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        // Redirigir a EventosAdmin y mostrar alerta de éxito
        navigate("/Eventos/EventosAdmin", { state: { success: true } });
      } else {
        const data = await response.json();
        console.error("Error en la respuesta:", data);
        alert("Error al modificar el evento");
      }
    } catch (error) {
      alert("Hubo un error al enviar los datos");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 w-full max-w-lg">
        <Typography variant="h4" color="blue-gray" className="text-center mb-6">
          Modificar Evento
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              Precio
            </Typography>
            <Input
              type="number"
              size="lg"
              label="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
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
              required
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Hora del Evento
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
              Lugar del Evento (Sector)
            </Typography>
            <Select
              size="lg"
              label="Selecciona el Sector"
              value={sectorSeleccionado}
              onChange={(e) => setSectorSeleccionado(e)}
              required
            >
              {sectores.map((sector) => (
                <Option key={sector.sector_id} value={String(sector.sector_id)}>
                  {sector.sector_nombre}
                </Option>
              ))}
            </Select>
          </div>

          <Button type="submit" color="blue" fullWidth className="mt-4">
            Guardar Cambios
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ModificarEvento;

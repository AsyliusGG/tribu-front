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
  const [lugar, setLugar] = useState(""); // Nuevo campo para la dirección del lugar
  const [foto, setFoto] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [sectorSeleccionado, setSectorSeleccionado] = useState("");
  const [sectores, setSectores] = useState([]);
  const navigate = useNavigate();

  // Obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Cargar los sectores desde la API
  useEffect(() => {
    async function fetchSectores() {
      try {
        const response = await fetch(
          "http://localhost:8000/eventos/api/v1/sector"
        );
        const data = await response.json();
        setSectores(data);
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    }
    fetchSectores();
  }, []);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Formatear los valores a pesos chilenos en la vista
  const formatCurrency = (value) => {
    const numberValue = value.replace(/\D/g, ""); // Quitar todo lo que no sea número
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(numberValue);
  };

  // Funciones para manejar los cambios y formatear los valores en la vista
  const handleValorAdultoChange = (e) => {
    setValorAdulto(formatCurrency(e.target.value));
  };

  const handleValorNinoChange = (e) => {
    setValorNino(formatCurrency(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos del formulario
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
      !lugar || // Validar que el lugar esté completado
      !sectorSeleccionado
    ) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    // Eliminar el formato de pesos chilenos y convertir a número antes de enviar al backend
    const valorAdultoNumber = parseInt(valorAdulto.replace(/\D/g, ""), 10);
    const valorNinoNumber = parseInt(valorNino.replace(/\D/g, ""), 10);

    // Crear el FormData para enviar archivos junto con los datos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupos", cupo); // Cambia "cupo" a "cupos" para coincidir con el modelo
    formData.append("valor_adulto", valorAdultoNumber); // Enviar valor adulto sin formato
    formData.append("valor_nino", valorNinoNumber); // Enviar valor niño sin formato
    formData.append("foto", foto);
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("hora_termino", horaTermino); // Añadir hora de término
    formData.append("lugar", lugar); // Añadir la dirección del lugar
    formData.append("sector", sectorSeleccionado);

    try {
      // Enviar datos a tu API
      const response = await fetch(
        "http://localhost:8000/eventos/api/v1/evento/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Redirigir a EventosAdmin después de crear el evento
        navigate("/Eventos/EventosAdmin", { state: { success: true } });
      } else {
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
              <Input type="file" size="lg" onChange={handleFileChange} required />
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
                value={lugar} // Nuevo campo para la dirección
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
                  <Option key={sector.sector_id} value={String(sector.sector_id)}>
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




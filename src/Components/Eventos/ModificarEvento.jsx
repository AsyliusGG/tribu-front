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
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");

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

  // Cargar los sectores desde la API
  useEffect(() => {
    async function fetchSectores() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/sector"
        );
        const data = await response.json();
        setSectores(data);
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    }
    fetchSectores();
  }, []);

  // Cargar los datos del evento actual para precargar el formulario
  useEffect(() => {
    async function fetchEvento() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/evento/${id}`
        );
        const data = await response.json();

        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        setCupo(data.cupos || "");
        setValorAdulto(
          data.valor_adulto ? formatCurrency(String(data.valor_adulto)) : ""
        );
        setValorNino(
          data.valor_nino ? formatCurrency(String(data.valor_nino)) : ""
        );
        setLugar(data.lugar || "");
        setFecha(data.fecha || "");
        setHora(data.hora || "");
        setHoraTermino(data.hora_termino || "");
        setSectorSeleccionado(String(data.sector) || "");
      } catch (error) {
        console.error("Error al cargar el evento:", error);
      }
    }
    fetchEvento();
  }, [id]);

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

    // Eliminar el formato de pesos chilenos y convertir a número antes de enviar al backend
    const valorAdultoNumber = parseInt(valorAdulto.replace(/\D/g, ""), 10);
    const valorNinoNumber = parseInt(valorNino.replace(/\D/g, ""), 10);

    // Crear el FormData para enviar archivos junto con los datos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("cupos", cupo);
    formData.append("valor_adulto", valorAdultoNumber);
    formData.append("valor_nino", valorNinoNumber);
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("hora_termino", horaTermino);
    formData.append("lugar", lugar);
    formData.append("sector", sectorSeleccionado);

    // Si se ha seleccionado una nueva imagen, la añadimos al FormData
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/evento/${id}/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/Eventos/EventosAdmin", { state: { success: true } });
      } else {
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
                type="text"
                size="lg"
                label="Valor Adulto"
                value={valorAdulto}
                onChange={handleValorAdultoChange}
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
                Lugar del Evento (Dirección)
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
                onChange={(e) => setSectorSeleccionado(String(e))}
              >
                {sectores.map((sector) => (
                  <Option
                    key={sector.id}
                    value={String(sector.id)}
                  >
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

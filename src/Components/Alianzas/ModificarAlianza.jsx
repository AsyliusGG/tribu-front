import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");

const ALIANZAS_API_URL = "http://localhost:8000/api/v1/alianzas"; // Actualizar con la API correcta

const ModificarAlianza = () => {
  const { id } = useParams(); // Obtener el id de la alianza desde la URL
  const [empresa, setEmpresa] = useState("");
  const [nombrePromo, setNombrePromo] = useState("");
  const [promocion, setPromocion] = useState("");
  const [estado, setEstado] = useState(false); // Checkbox para activar o desactivar la alianza
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcionLength, setDescripcionLength] = useState(0); // Estado para el contador de caracteres
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  // Cargar los datos de la alianza desde la API
  useEffect(() => {
    const fetchAlianza = async () => {
      try {
        const response = await fetch(`${ALIANZAS_API_URL}/${id}/`);
        if (response.ok) {
          const alianza = await response.json();
          // Precargar los valores
          setEmpresa(alianza.alianza_empresa);
          setNombrePromo(alianza.alianza_nombre);
          setPromocion(alianza.Promocion);
          setEstado(alianza.Estado);
          setFechaInicio(alianza.Fecha_inicio);
          setFechaFinal(alianza.Fecha_final);
          setDescripcion(alianza.descripcion);
          setDescripcionLength(alianza.descripcion.length);
          setFoto(alianza.foto); // Si quieres mostrar la foto previamente cargada
        } else {
          console.error("Error al cargar los datos de la alianza.");
        }
      } catch (error) {
        console.error("Error al cargar los datos de la alianza:", error);
      }
    };

    fetchAlianza();
  }, [id]);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleDescripcionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setDescripcion(value);
      setDescripcionLength(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar los campos del formulario
    if (!empresa || !nombrePromo || !promocion || !descripcion || !fechaInicio || !fechaFinal) {
      alert("Por favor, rellena todos los campos.");
      return;
    }
  
    // Crear el FormData para enviar archivos junto con los datos
    const formData = new FormData();
    formData.append("alianza_empresa", empresa);
    formData.append("alianza_nombre", nombrePromo);
    formData.append("Promocion", promocion);
    formData.append("Estado", estado); // Estado de la alianza (true o false)
    formData.append("Fecha_inicio", fechaInicio);
    formData.append("Fecha_final", fechaFinal);
    formData.append("descripcion", descripcion);
  
    if (foto instanceof File) {
      formData.append("foto", foto); // Añadir la foto si es un archivo nuevo
    }
  
    try {
      // Enviar los datos actualizados a tu API
      const response = await fetch(`${ALIANZAS_API_URL}/${id}/`, {
        method: "PUT", // Usamos PUT para actualizar
        headers: {
          Authorization: `Bearer ${token}`, // Solo el token, sin Content-Type
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        // Redirigir a AlianzasAdmin después de guardar la alianza
        navigate("/Alianzas/AlianzasAdmin", { state: { success: true } });
        alert("Se guardaron los datos exitosamente");
      } else {
        console.error("Error en la respuesta:", data);
        alert("Error al modificar la alianza");
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
          Modificar Alianza
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Empresa
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Nombre de la Empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Nombre de la Promoción
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Nombre de la Promoción"
                value={nombrePromo}
                onChange={(e) => setNombrePromo(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Promoción
              </Typography>
              <Input
                type="text"
                size="lg"
                label="Detalle de la Promoción"
                value={promocion}
                onChange={(e) => setPromocion(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Fecha de Inicio
              </Typography>
              <Input
                type="date"
                size="lg"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Fecha Final
              </Typography>
              <Input
                type="date"
                size="lg"
                min={fechaInicio}
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Foto de la Alianza
              </Typography>
              <Input type="file" size="lg" onChange={handleFileChange} />
            </div>

            <div className="mb-4 col-span-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Descripción <span className="text-gray-500">({descripcionLength}/500)</span>
              </Typography>
              <Textarea
                size="lg"
                label="Descripción"
                value={descripcion}
                onChange={handleDescripcionChange}
                maxLength={500}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              color="gray"
              onClick={() => navigate("/Alianzas/AlianzasAdmin")}
            >
              Cancelar
            </Button>
            <Button type="submit" color="blue">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ModificarAlianza;

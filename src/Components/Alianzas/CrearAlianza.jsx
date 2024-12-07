import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const token = Cookies.get("auth_token");

const CrearAlianza = () => {
  const [empresa, setEmpresa] = useState("");
  const [nombrePromo, setNombrePromo] = useState("");
  const [promocion, setPromocion] = useState("");
  const [estado, setEstado] = useState(false); 
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcionLength, setDescripcionLength] = useState(0);
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

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

    if (!empresa || !nombrePromo || !promocion || !descripcion || !foto || !fechaInicio || !fechaFinal) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    // Crear el FormData para enviar archivos junto con los datos
    const formData = new FormData();
    formData.append("alianza_empresa", empresa);
    formData.append("alianza_nombre", nombrePromo);
    formData.append("Promocion", promocion);
    formData.append("Estado", estado); 
    formData.append("Fecha_inicio", fechaInicio);
    formData.append("Fecha_final", fechaFinal);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto); // Añadir la foto

    try {
      // Enviar datos a tu API
      const response = await fetch("http://localhost:8000/api/v1/alianzas/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
        body: formData,
      });

      console.log("Encabezados enviados:", {
        Authorization: `Bearer ${token}`,
      });

      const data = await response.json();
      if (response.ok) {
        // Redirigir a AlianzasAdmin después de crear la alianza
        navigate("/Alianzas/AlianzasAdmin", { state: { success: true } });
      } else {
        console.error("Error en la respuesta:", data);
        alert("Error al crear la alianza");
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
          Crear Nueva Alianza
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Foto de la Alianza
              </Typography>
              <Input type="file" size="lg" onChange={handleFileChange} required />
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
                required
                maxLength={500}
              />
            </div>
          </div>

          <Button type="submit" color="blue" fullWidth className="mt-4">
            Crear Alianza
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CrearAlianza;

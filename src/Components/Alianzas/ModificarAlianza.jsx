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
import { updateAlianza, getAlianzaById } from "../../api/api";

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
  const token = Cookies.get("auth_token"); // Token obtenido de las cookies

  // Cargar los datos de la alianza desde la API
  useEffect(() => {
    const fetchAlianza = async () => {
      try {
        const alianza = await getAlianzaById(id); // Obtener datos de la alianza por ID
        setEmpresa(alianza.alianza_empresa);
        setNombrePromo(alianza.alianza_nombre);
        setPromocion(alianza.Promocion);
        setEstado(alianza.Estado);
        setFechaInicio(alianza.Fecha_inicio);
        setFechaFinal(alianza.Fecha_final);
        setDescripcion(alianza.descripcion);
        setDescripcionLength(alianza.descripcion.length);
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
    const formData = new FormData();
    formData.append("alianza_empresa", empresa);
    formData.append("alianza_nombre", nombrePromo);
    formData.append("Promocion", promocion);
    formData.append("Estado", estado);
    formData.append("Fecha_inicio", fechaInicio);
    formData.append("Fecha_final", fechaFinal);
    formData.append("descripcion", descripcion);
    if (foto instanceof File) {
      formData.append("foto", foto);
    }

    try {
      await updateAlianza(id, formData, token);
      navigate("/Alianzas/AlianzasAdmin", { state: { success: true } });
    } catch (error) {
      console.error("Error al modificar la alianza:", error);
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
                required
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Typography,
  Card,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Joinus() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "run") {
      // Limita la longitud del RUT a 9 caracteres
      if (value.replace(/[^0-9kK]/g, "").length > 9) {
        return;
      }
      formattedValue = formatRUT(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar los datos del formulario antes de enviarlos
    if (formData.password !== formData.re_password) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/auth/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            re_password: formData.re_password
          }),
        });

      if (response.ok) {
        toast.success("Usuario registrado exitosamente");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(
          `Error al registrar el usuario: ${
            errorData.message || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      toast.error(`Error al registrar el usuario: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Registrarse
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          ¡Bienvenido! Ingresa tus datos para registrarte.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Nombre
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su nombre"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Apellido
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su apellido"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Correo Electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su correo electrónico"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Contraseña
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su contraseña"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange} 
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirmar Contraseña
            </Typography>
            <Input
              size="lg"
              placeholder="Confirme su contraseña"
              id="re_password"
              name="re_password"
              type="password"
              value={formData.re_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="mt-6">
            Registrarse
          </Button>
        </form>
        <ToastContainer />
      </Card>
    </div>
  );
}

export default Joinus;

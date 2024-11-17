import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Input, Button, Typography, Card } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Joinus() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    confirmarEmail: '',
    password: '',
    re_password: '',
    phone_number: '',
    run: '',
    birthday: '',
    job: '',
    sector: '',
    know_source: ''
  });
  
  const [sectors, setSectors] = useState([]);
  const navigate = useNavigate();

  const formatRUT = (rut) => {
    // Elimina todos los caracteres que no sean números o 'k'
    rut = rut.replace(/[^0-9kK]/g, '');

    // Asegúrate de que el RUT tenga al menos 2 caracteres
    if (rut.length < 2) {
      return rut;
    }

    // Separa el dígito verificador
    const dv = rut.slice(-1);
    const cuerpo = rut.slice(0, -1);

    // Formatea el cuerpo del RUT con puntos
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retorna el RUT formateado
    return `${cuerpoFormateado}-${dv}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'run') {
      // Limita la longitud del RUT a 9 caracteres
      if (value.replace(/[^0-9kK]/g, '').length > 9) {
        return;
      }
      formattedValue = formatRUT(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirmarEmail) {
      toast.error("Los correos electrónicos no coinciden");
      return;
    }
    if (formData.password !== formData.re_password) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          re_password: formData.re_password,
          phone_number: formData.phone_number,
          run: formData.run,
          birthday: formData.birthday,
          job: formData.job,
          sector: formData.sector,
          know_source: formData.know_source
        })
      });

      if (response.ok) {
        toast.success("Usuario registrado exitosamente");
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(`Error al registrar el usuario: ${errorData.message || "Error desconocido"}`);
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
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
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
              Apellidos
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese sus apellidos"
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
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirmar Correo Electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Confirme su correo electrónico"
              id="confirmarEmail"
              name="confirmarEmail"
              type="email"
              value={formData.confirmarEmail}
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
              pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
              title="La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número y una letra mayúscula."
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
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Teléfono móvil
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su teléfono móvil"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              RUT
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su RUT"
              id="run"
              name="run"
              value={formData.run}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Fecha de Nacimiento
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su fecha de nacimiento"
              id="birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Trabajo
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su trabajo"
              id="job"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Sector
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su sector"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Fuente de Conocimiento
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese la fuente de conocimiento"
              id="know_source"
              name="know_source"
              value={formData.know_source}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Registrarse
          </Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default Joinus;
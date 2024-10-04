import React, { useState } from 'react';
import { Alert, Checkbox, Card, Input, Button, Typography, } from "@material-tailwind/react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AlertCustomStyles({ message }) {
  return (
    <Alert color="red" className="mb-4">
      {message}
    </Alert>
  );
}

export function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expresiones regulares para validar alfanumérico y longitud mínima de 8 caracteres
    const alphanumericRegex = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      setAlertMessage('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (!alphanumericRegex.test(password)) {
      setAlertMessage('La contraseña debe ser alfanumérica y tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await fetch('https://localhost:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('Inicio de sesión exitoso');
        // Manejar el inicio de sesión exitoso (por ejemplo, redirigir al usuario)
      } else {
        setAlertMessage(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setAlertMessage('Error en el inicio de sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Iniciar Sesión
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          ¡Encantada de verte! Ingresa tus datos para iniciar sesión.
        </Typography>
        {alertMessage && <AlertCustomStyles message={alertMessage} />}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Correo Electronico
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su correo electrónico"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Contraseña
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Acepto los
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;términos y condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Iniciar Sesión
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            ¿Ya tienes una cuenta?{" "}
            <a href="#" className="font-medium text-gray-900">
              Iniciar Sesión
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default SignIn;


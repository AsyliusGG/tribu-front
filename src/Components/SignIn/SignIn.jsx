import React, { useState } from 'react';
import { Alert, Input, Button, Typography, Card } from "@material-tailwind/react";

function AlertCustomStyles({ message }) {
  return (
    <Alert color="red" className="mb-4">
      {message}
    </Alert>
  );
}

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setAlertMessage('Inicio de sesión exitoso');
        console.log('Inicio de sesión exitoso');
        // Aquí podrías almacenar el token si estás usando JWT o Token Auth
      } else {
        setAlertMessage(data.message || 'Error en el inicio de sesión');
        console.log('Error: ', data);
      }
    } catch (error) {
      setAlertMessage('Error en el inicio de sesión');
      console.log('Error en el servidor o conexión fallida', error);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button className="mt-6" fullWidth type="submit">
            Iniciar Sesión
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="font-medium text-blue-600">
              Recuperar Contraseña
            </a>
          </Typography>
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

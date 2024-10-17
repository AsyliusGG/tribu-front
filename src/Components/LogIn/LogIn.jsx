import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para la redirección
import { Alert, Input, Button, Typography, Card } from "@material-tailwind/react";

function AlertCustomStyles({ message }) {
  return (
    <Alert color="red" className="mb-4">
      {message}
    </Alert>
  );
}

export function LogIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();  // Hook para la redirección

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
        localStorage.setItem("auth_token", data.access);  // Guardamos el token en localStorage
        onLogin();  // Llamamos a la función onLogin para actualizar el estado de autenticación
        // Redirigir a la página principal con el estado del mensaje
        navigate("/", { state: { successMessage: "Inicio de sesión exitoso" } });
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
        </form>
      </Card>
    </div>
  );
}

export default LogIn;

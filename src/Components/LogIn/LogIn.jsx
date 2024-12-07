import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../slices/authSlice'; 
import { Alert, Input, Button, Typography, Card } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result.token) {
        Cookies.set('auth_token', result.token, { expires: 7 }); // Guardar el token en las cookies por 7 días
        toast.success("Inicio de sesión exitoso");
        navigate('/');
      } else {
        toast.error("Error al iniciar sesión");
      }
    } catch (err) {
      toast.error("Error al iniciar sesión");
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
        {error && <Alert color="red" className="mb-4">{error.message || "Ocurrió un error. Revisa tu correo o contraseña."}</Alert>}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Correo Electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>

          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default LogIn;

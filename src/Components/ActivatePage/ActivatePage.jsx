import React, { useState, useEffect } from 'react';
import { BiUserCheck } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activate, reset } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';

const ActivatePage = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10); // Contador inicial de 10 segundos

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Activar cuenta automáticamente al cargar la página
  useEffect(() => {
    const userData = { uid, token };
    dispatch(activate(userData));
  }, [dispatch, uid, token]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Tu cuenta ha sido activada con éxito.');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  // Reducir el contador y redirigir al login
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate('/login');
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [counter, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg text-center border border-gray-200">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tu cuenta está activa, por favor inicia sesión
        </h1>

        {/* Spinner con mensaje de redirección */}
        <div className="mb-6">
          {isLoading ? (
            <Spinner />
          ) : (
            <p className="text-gray-600 font-medium mt-4">
              Redireccionando a la página de inicio de sesión en <strong>{counter}</strong> segundos...
            </p>
          )}
        </div>

        {/* Botón para iniciar sesión manualmente */}
        <button
          className="bg-pink-300 hover:bg-pink-200 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default ActivatePage;

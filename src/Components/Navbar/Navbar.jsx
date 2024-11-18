import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Agrega useLocation
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import axios from "axios"; // Para realizar solicitudes si es necesario

export default function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Para detectar cambios en la URL

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Actualizar información del usuario al cambiar de página
  useEffect(() => {
    if (token && !user) {
      // Si el token existe pero no hay información de usuario, cargar los datos
      axios
        .get("http://localhost:8000/api/v1/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch({ type: "auth/setUser", payload: response.data }); // Usa tu acción para actualizar el usuario
        })
        .catch((error) => {
          console.error("Error al cargar el usuario:", error);
          if (error.response?.status === 401) {
            handleLogout(); // Si el token es inválido, cerrar sesión
          }
        });
    }
  }, [token, location.pathname]); // Escuchar cambios en token y ruta

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout()); // Actualiza el estado global
    setLogoutDialog(false);
    navigate("/");
  };

  const navList = (
    <ul className="flex flex-row gap-6 items-center">
      {user?.is_superuser || user?.is_staff ? (
        <li>
          <Typography
            as="span"
            variant="small"
            color="blue-gray"
            className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
          >
            <Link to="/adminSettings">Funciones de Admin</Link>
          </Typography>
        </li>
      ) : null}
      {[
        { name: "La Tribu", path: "/tribu" },
        { name: "Nosotras", path: "/nosotras" },
        { name: "Nuestra Historia", path: "/historia" },
        ...(token
          ? [
              { name: "Eventos", path: "/eventos" },
              { name: "Alianzas", path: "/alianzas" },
            ]
          : []),
      ].map(({ name, path }, index) => (
        <li key={index}>
          <Typography
            as="span"
            variant="small"
            color="blue-gray"
            className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
          >
            <Link to={path}>{name}</Link>
          </Typography>
        </li>
      ))}
      {token && (
        <li>
          <Typography
            as="span"
            variant="small"
            color="blue-gray"
            className="font-normal cursor-pointer hover:text-pink-500 transition duration-200 flex items-center"
          >
            <Link to="/carritocompra" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="h-5 w-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Carrito
            </Link>
          </Typography>
        </li>
      )}
    </ul>
  );

  const profileMenu = (
    <div className="relative">
      <img
        onClick={() => setOpenProfileMenu((prev) => !prev)}
        alt="Profile"
        src={
          user?.profile_picture // Asegúrate de que `user.profile_picture` sea el campo que contiene la URL de la foto del usuario
            ? user.profile_picture
            : "https://via.placeholder.com/150" // URL de la foto por defecto
        }
        className="h-10 w-10 cursor-pointer rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition duration-200"
      />
      {openProfileMenu && (
        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <li
            onClick={() => {
              setOpenProfileMenu(false);
              navigate("/perfil");
            }}
            className="p-3 hover:bg-pink-100 cursor-pointer text-sm font-normal"
          >
            Mi Perfil
          </li>
          <hr className="border-t my-1" />
          <li
            onClick={() => {
              setOpenProfileMenu(false);
              setLogoutDialog(true);
            }}
            className="p-3 hover:bg-pink-100 cursor-pointer text-sm font-normal"
          >
            Cerrar Sesión
          </li>
        </ul>
      )}
    </div>
  );
  

  return (
    <div className="sticky top-0 w-screen shadow-md z-20 bg-white">
      <Navbar className="z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-auto cursor-pointer font-medium hover:text-pink-500 transition duration-200"
          >
            Tribu de Mamás
          </Typography>
          <div className="hidden lg:flex items-center gap-6">
            {navList}
            {token && profileMenu}
          </div>
          <div className="flex items-center gap-8 lg:hidden">
            <IconButton
              variant="text"
              className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent"
              onClick={() => setOpenNav((prev) => !prev)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {!token && (
              <>
                <Link to="/login">
                  <button className="bg-pink-500 text-white ml-4 px-4 py-2 rounded hover:bg-pink-700 transition duration-200">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link to="/joinus">
                  <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200">
                    Registrarse
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <MobileNav open={openNav}>
          <ul className="flex flex-col items-start gap-4 mt-4">
            {user?.is_superuser || user?.is_staff ? (
              <li>
                <Typography
                  as="span"
                  variant="small"
                  color="blue-gray"
                  className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
                >
                  <Link to="/bashboard">Funciones de Admin</Link>
                </Typography>
              </li>
            ) : null}

            {[
              { name: "La Tribu", path: "/tribu" },
              { name: "Nosotras", path: "/nosotras" },
              { name: "Nuestra Historia", path: "/historia" },
              ...(token
                ? [
                    { name: "Eventos", path: "/eventos" },
                    { name: "Alianzas", path: "/alianzas" },
                  ]
                : []),
            ].map(({ name, path }, index) => (
              <li key={index}>
                <Typography
                  as="span"
                  variant="small"
                  color="blue-gray"
                  className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
                >
                  <Link to={path}>{name}</Link>
                </Typography>
              </li>
            ))}

            {token && (
              <>
                <li>
                  <Typography
                    as="span"
                    variant="small"
                    color="blue-gray"
                    className="font-normal cursor-pointer hover:text-pink-500 transition duration-200 flex items-center"
                  >
                    <Link to="/carritocompra" className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="red"
                        className="h-5 w-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                      Carrito
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="span"
                    variant="small"
                    color="blue-gray"
                    className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
                    onClick={() => navigate("/perfil")}
                  >
                    Mi Perfil
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="span"
                    variant="small"
                    color="blue-gray"
                    className="font-normal cursor-pointer hover:text-pink-500 transition duration-200"
                    onClick={() => setLogoutDialog(true)}
                  >
                    Cerrar Sesión
                  </Typography>
                </li>
              </>
            )}

            {!token && (
              <>
                <li>
                  <Link to="/login">
                    <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200">
                      Iniciar Sesión
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/joinus">
                    <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200">
                      Registrarse
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </MobileNav>
      </Navbar>
      <Dialog open={logoutDialog} handler={setLogoutDialog}>
        <DialogHeader>¿Estás seguro que quieres cerrar sesión?</DialogHeader>
        <DialogBody>
          Si cierras sesión, perderás acceso a tu cuenta hasta volver a iniciar
          sesión.
        </DialogBody>
        <DialogFooter>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded mr-2 hover:bg-gray-400"
            onClick={() => setLogoutDialog(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-700"
            onClick={handleLogout}
          >
            Confirmar
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

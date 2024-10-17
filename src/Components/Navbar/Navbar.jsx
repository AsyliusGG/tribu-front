import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";

export default function StickyNavbar({ isAuthenticated }) {  // Usamos la prop isAuthenticated que viene de App.jsx
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("auth_token");  // Elimina el token
    window.location.href = "/";  // Redirige al inicio
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/Tribu" className="flex items-center">
          La Tribu
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/Nosotras" className="flex items-center">
          Nosotras
        </Link>
      </Typography>
      
      {/* Solo mostrar estas opciones si el usuario está autenticado */}
      {isAuthenticated && (
        <>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <Link to="/Historia" className="flex items-center">
              Nuestra Historia
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <Link to="/Eventos" className="flex items-center">
              Eventos
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <Link to="/Alianzas" className="flex items-center">
              Alianzas
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <div className="sticky top-0 w-screen shadow-md max-h-[80vh]">
      <Navbar className="z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            Tribu de Mamás
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {!isAuthenticated ? (
                <>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <Link to="/login">
                      <span>Iniciar Sesión</span>
                    </Link>
                  </Button>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <Link to="/joinus">
                      <span>Registrarse</span>
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="gradient" size="sm" onClick={handleLogout}>
                  <span>Cerrar Sesión</span>
                </Button>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {!isAuthenticated ? (
              <>
                <Button fullWidth variant="gradient" size="sm">
                  <Link to="/login">
                    <span>Iniciar Sesión</span>
                  </Link>
                </Button>
                <Button fullWidth variant="gradient" size="sm">
                  <Link to="/joinus">
                    <span>Registrarse</span>
                  </Link>
                </Button>
              </>
            ) : (
              <Button fullWidth variant="gradient" size="sm" onClick={handleLogout}>
                <span>Cerrar Sesión</span>
              </Button>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

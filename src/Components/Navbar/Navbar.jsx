import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  };

  const toggleProfileMenu = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/Tribu" className="flex items-center">La Tribu</Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/Nosotras" className="flex items-center">Nosotras</Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/Historia" className="flex items-center">Nuestra Historia</Link>
      </Typography>
    </ul>
  );

  return (
    <div className="sticky top-0 w-screen shadow-md max-h-[80vh] z-20">
      <Navbar className="z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            Tribu de Mamás
          </Typography>
          <div className="flex items-center gap-1">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {!token ? (
                <>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <Link to="/login"><span>Iniciar Sesión</span></Link>
                  </Button>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <Link to="/joinus"><span>Registrarse</span></Link>
                  </Button>
                </>
              ) : (
                <div className="relative">
                  <img
                    onClick={toggleProfileMenu}
                    alt="Profile"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="h-10 w-10 cursor-pointer rounded-full object-cover"
                  />
                  {openProfileMenu && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                      <Typography as="li" variant="small" color="blue-gray" className="p-3 hover:bg-gray-100 cursor-pointer flex items-center">
                        <span className="ml-2">Mi Perfil</span>
                      </Typography>
                      <hr className="border-t my-1" />
                      <Typography as="li" variant="small" color="blue-gray" className="p-3 hover:bg-gray-100 cursor-pointer flex items-center" onClick={handleLogout}>
                        <span className="ml-2">Cerrar Sesión</span>
                      </Typography>
                    </ul>
                  )}
                </div>
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
        </MobileNav>
      </Navbar>
    </div>
  );
}

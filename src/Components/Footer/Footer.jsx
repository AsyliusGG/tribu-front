import { Typography, Button } from "@material-tailwind/react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white p-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left w-full mx-auto px-4 md:px-8 gap-4">
        
        {/* Sección Izquierda: Correo */}
        <div className="flex items-center gap-2">
          <Typography color="blue-gray" className="text-sm font-normal">
            tribu.mamas.montemar@gmail.com
          </Typography>
        </div>
        
        {/* Sección Centro: Información de contacto */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="https://www.instagram.com/tribu.de.mamas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={18} color="black" />
          </a>
          <Typography color="blue-gray" className="text-sm font-normal">
            +56948190856
          </Typography>
          <Button
            variant="filled"
            size="sm"
            className="font-normal transition-colors bg-pink-200 hover:bg-pink-300 text-white px-4 py-2"
          >
            <Link to="/contacto">
              Contáctanos
            </Link>
          </Button>
          <div className="flex flex-col text-center md:text-left">
            <Typography color="blue-gray" className="text-sm font-normal text-center">
              Reñaca Norte #265, oficina 510, Viña del Mar
            </Typography>
            <Typography color="blue-gray" className="text-sm font-normal text-center">
              La Tribu Corp SpA, 77.822.517-4
            </Typography>
          </div>
        </div>
        
        {/* Sección Derecha: Derechos de autor */}
        <Typography color="blue-gray" className="text-sm font-normal">
          &copy; 2024 Tribu de Mamás. Todos los derechos reservados.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;

import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="w-full bg-white p-4">
      <div className="flex justify-between items-center w-full mx-auto px-4 md:px-8">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
        
        <ul className="flex items-center gap-6">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Sobre Nosotras
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contactanos
            </Typography>
          </li>
        </ul>

        <Typography color="blue-gray" className="text-sm font-normal">
          &copy; 2024 Tribu de Mamás. Todos los derechos reservados.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;

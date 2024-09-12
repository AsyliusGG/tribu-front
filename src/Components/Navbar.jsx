const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-pink-600">Página Inicio</div>
      <div className="space-x-6">
        <a href="#" className="hover:text-gray-600">Nuestra Historia</a>
        <a href="#" className="hover:text-gray-600">La Tribu</a>
        <a href="#" className="hover:text-gray-600">Blog</a>
        <a href="#" className="hover:text-gray-600">Nosotras</a>
        <a href="#" className="hover:text-gray-600">Beneficios</a>
      </div>
      <div className="space-x-4">
        <button className="bg-yellow-300 py-2 px-4 rounded-md">Iniciar Sesión</button>
        <button className="bg-yellow-300 py-2 px-4 rounded-md">Únete</button>
      </div>
    </nav>
  );
}

export default Navbar;

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center">
      <div className="text-xl font-bold text-pink-600">Página Inicio</div>
      <div className="space-x-6 flex items-center text-lg font-medium text-gray-700">
        <a href="#" className="hover:text-gray-600 transition-colors duration-150">Nuestra Historia</a>
        <a href="#" className="hover:text-gray-600 transition-colors duration-150">La Tribu</a>
        <a href="#" className="hover:text-gray-600 transition-colors duration-150">Blog</a>
        <a href="#" className="hover:text-gray-600 transition-colors duration-150">Nosotras</a>
        <a href="#" className="hover:text-gray-600 transition-colors duration-150">Beneficios</a>
      </div>
      <div className="space-x-4 mt-4 md:mt-0">
        <button
          onClick={onLoginClick}
          className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-yellow-300 rounded-lg hover:bg-yellow-400 h-12 px-6 m-2 text-lg"
        >
          Iniciar Sesión
        </button>
        <button className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-yellow-300 rounded-lg hover:bg-yellow-400 h-12 px-6 m-2 text-lg">
          Únete
        </button>
      </div>
    </nav>
  )}

export default Navbar;
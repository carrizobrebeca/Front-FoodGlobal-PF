import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/images/logofood.png'; // Asegúrate de que la ruta sea correcta
import { logout } from '../store/loginSlice'; // Ajusta la ruta según tu estructura de carpetas
import usuarioSvg from '../assets/images/usuario.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=115342b5b7cd4d'); // Reemplaza con tu API key
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto animate-pulse" />
        </Link>

        {/* Barra de Búsqueda Centrada */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="p-2 w-3/5 max-w-lg rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ubicación, Bandera y Estado de Usuario */}
        <div className="flex items-center">
          {location && (
            <div className="flex items-center text-gray-600 mr-4">
              <span>{location.city}, {location.region}</span>
              <img
                src={`https://flagcdn.com/w20/${location.country.toLowerCase()}.png`}
                alt={location.country}
                className="w-6 h-6 ml-2"
              />
            </div>
          )}
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Bienvenido, {user.nombre}</span>
              <img src={usuarioSvg} alt="User" className="w-8 h-8 rounded-full mr-4" />
              <button onClick={handleLogout} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 bg-blue-600 text-white rounded-lg mr-4 hover:bg-blue-700 transition">
              Ingresar
            </Link>
          )}
          {/* Botón de la Barra Lateral */}
          <button className="ml-4" onClick={toggleSidebar}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button className="p-4 text-xl" onClick={toggleSidebar}>
            X
          </button>
          <div className="p-4">
            <div className="mb-4">
              <Link to="/login" className="block py-2 px-4 bg-blue-600 rounded">Login</Link>
              <Link to="/register" className="block py-2 px-4 mt-2 bg-green-600 rounded">Register</Link>
            </div>
            <ul className="space-y-4">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/locales">Locales</Link></li>
              <li><Link to="/afiliarse">Afiliarse</Link></li>
              <li><Link to="/about">Sobre Nosotros</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/images/logofood.png';
import { logout } from '../store/loginSlice';
import usuarioSvg from '../assets/images/usuario.png';
import CarritoPanel from './CarritoPanel';

const Navbar = ({ onOpenCarrito }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const carrito = useSelector((state) => state.carrito);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=115342b5b7cd4d');
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
    navigate('/');
  };

  const toggleCarritoPanel = () => {
    setIsCarritoOpen(!isCarritoOpen);
  };

  useEffect(() => {
    if (onOpenCarrito) onOpenCarrito(toggleCarritoPanel);
  }, [onOpenCarrito]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto animate-pulse" />
        </Link>

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

          <button className="ml-4" onClick={toggleSidebar}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <CarritoPanel
          productos={carrito.items || []}
          onClose={toggleCarritoPanel}
          isOpen={isCarritoOpen}
        />

        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-orange-300 via-white to-orange-200 text-gray-900 shadow-lg transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button className="p-4 text-xl" onClick={toggleSidebar}>
            X
          </button>
          <div className="p-4">
            {!user && (
            <div className="mb-4">
              <Link to="/login" className="block py-2 px-4 bg-blue-600 rounded hover:bg-orange-500 transition">
                Login
              </Link>
              <Link to="/register" className="block py-2 px-4 mt-2 bg-green-600 rounded hover:bg-orange-500 transition">
                Register
              </Link>
            </div>
            )}
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/pedido/:id"
                  className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                >
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link
                  to="/afiliarse"
                  className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                >
                  Afiliarse
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                >
                  Sobre Nosotros
                </Link>
              </li>

              {(user?.rol === 'admin' || user?.rol === 'socio') && (
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 hover:bg-orange-500 transition rounded"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

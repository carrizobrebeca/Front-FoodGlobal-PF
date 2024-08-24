import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">FoodGlobal</Link>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          className="p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button className="ml-4" onClick={toggleSidebar}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <Link to="/login" className="block py-2 px-4 bg-blue-500 rounded">Login</Link>
            <Link to="/register" className="block py-2 px-4 mt-2 bg-green-500 rounded">Register</Link>
          </div>
          <ul className="space-y-4">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/locales">Locales</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>
            <li><Link to="/afiliarse">Afiliarse</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

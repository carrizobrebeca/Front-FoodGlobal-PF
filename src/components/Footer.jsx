import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/images/logofood.png';

const Footer = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`bg-white text-gray-800 shadow-lg border-t border-gray-200 transition-transform duration-500 ${isAtTop ? 'transform scale-105' : ''}`}>
      {/* Logo */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/">
          <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto animate-pulse mx-auto" />
        </Link>
      </div>

      {/* Enlaces y Redes Sociales */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {/* Sección de Enlaces */}
            <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold mb-4">Enlaces Rápidos</h2>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-orange-500 transition-colors">Sobre Nosotros</Link></li>
                <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Política de Privacidad</Link></li>
                <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Términos y Condiciones</Link></li>
              </ul>
            </div>

            {/* Sección de Redes Sociales */}
            <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
              <div className="flex justify-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Sección de Contacto */}
            <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold mb-4">Contacto</h2>
              <p className="text-gray-600">Av. 9 de julio 139</p>
              <p className="text-gray-600">Buenos Aires, Argentina</p>
              <p className="text-gray-600">foodglobal46@gmail.com</p>
              <p className="text-gray-600">Teléfono: +123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="bg-gray-200 py-4 border-t border-gray-300 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-sm">
            © 2024 FoodGlobal. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

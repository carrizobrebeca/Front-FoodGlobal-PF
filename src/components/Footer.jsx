import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importa iconos de redes sociales
import logo from '../assets/images/logofood.png';
const Footer = () => {
  return (
    <footer className="bg-white-800 text-white">
      {/* Logo */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto" />
          </Link>
        </div>
      </div>

      {/* Enlaces y Redes Sociales */}
      <div className="bg-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Sección de Enlaces */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Enlaces Rápidos</h2>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:underline">Sobre Nosotros</Link></li>
                <li><Link to="/support" className="hover:underline">Ayuda y Soporte</Link></li>
                <li><Link to="/contact" className="hover:underline">Contacto</Link></li>
                <li><Link to="/privacy" className="hover:underline">Política de Privacidad</Link></li>
                <li><Link to="/terms" className="hover:underline">Términos y Condiciones</Link></li>
              </ul>
            </div>

            {/* Sección de Redes Sociales */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Sección de Contacto */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contacto</h2>
              <p className="text-gray-400">Dirección de la empresa</p>
              <p className="text-gray-400">Ciudad, País</p>
              <p className="text-gray-400">Email: contacto@foodglobal.com</p>
              <p className="text-gray-400">Teléfono: +123 456 7890</p>
            </div>

            {/* Sección de Suscripción */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Suscríbete</h2>
              <p className="text-gray-400 mb-4">Recibe las últimas noticias y ofertas directamente en tu bandeja de entrada.</p>
              <form className="flex flex-col space-y-2">
                <input type="email" placeholder="Tu email" className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500" />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Suscribirse</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 FoodGlobal. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

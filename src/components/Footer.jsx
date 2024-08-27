import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  

  return (
    <>
            {/* Footer Section */}
            <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 FoodGlobal. Todos los derechos reservados. | <Link to="/privacy" className="underline">Política de Privacidad</Link> | <Link to="/terms" className="underline">Términos y Condiciones</Link></p>
        <div className="mt-2">
          <Link to="/about" className="mx-2">Sobre Nosotros</Link>
          <Link to="/support" className="mx-2">Ayuda y Soporte</Link>
          <Link to="/contact" className="mx-2">Contacto</Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;

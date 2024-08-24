import React from 'react';
import { Link } from 'react-router-dom';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">FoodGlobal</Link>
        <div>
          <Link to="/about" className="mx-4">Sobre Nosotros</Link>
          <Link to="/support" className="mx-4">Ayuda y Soporte</Link>
          <Link to="/contact" className="mx-4">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

// Home Component
const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Conecta al mundo a través del sabor</h1>
        <p className="text-xl mb-8">
          Compra alimentos auténticos de cualquier parte del mundo y apoya a pequeñas empresas y mercados locales.
          Con FoodGlobal, el comercio global de alimentos nunca ha sido tan fácil.
        </p>
        <Link to="/register" className="bg-yellow-500 text-black py-2 px-4 rounded">Regístrate Ahora</Link>
      </section>

      {/* Mission Section */}
      <section className="mission-section bg-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
        <p className="text-lg mx-auto max-w-2xl">
          En FoodGlobal, creemos que el acceso a alimentos auténticos no debería estar limitado por fronteras.
          Nuestra plataforma conecta a personas y comunidades de diferentes países, permitiendo la compra y venta
          de alimentos y productos esenciales, facilitando el comercio justo y apoyando a pequeñas empresas locales
          en todo el mundo.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-gray-100 text-center py-16">
        <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
        <div className="steps flex flex-col items-center">
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 1</h3>
            <p>Explora: Navega por nuestra amplia selección de alimentos y productos de mercados locales de todo el mundo.</p>
          </div>
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 2</h3>
            <p>Compra: Elige los productos que deseas y realiza tu pedido fácilmente con nuestras opciones de pago internacional.</p>
          </div>
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 3</h3>
            <p>Disfruta: Recibe tu pedido directamente en tu hogar y disfruta de sabores auténticos de otras culturas.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Lo que Dicen Nuestros Usuarios</h2>
        <div className="testimonials-list mx-auto max-w-2xl">
          <div className="testimonial mb-8">
            <p>"Gracias a FoodGlobal, puedo disfrutar de los sabores de mi país natal sin tener que viajar. ¡Una experiencia increíble!"</p>
          </div>
          <div className="testimonial mb-8">
            <p>"Como dueño de un mercado local, FoodGlobal me ha permitido expandir mi negocio a clientes en todo el mundo. ¡Una oportunidad única!"</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits bg-gray-100 text-center py-16">
        <h2 className="text-3xl font-bold mb-4">¿Por Qué Elegir FoodGlobal?</h2>
        <div className="benefits-list mx-auto max-w-2xl">
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Conexión Global</h3>
            <p>Accede a productos de mercados locales de cualquier parte del mundo</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Comercio Justo</h3>
            <p>Apoya a pequeñas empresas y mercados locales, garantizando precios justos para todos</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Fácil y Seguro</h3>
            <p>Realiza compras internacionales con opciones de pago seguras y fáciles de usar</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Únete a la Revolución del Comercio Global</h2>
        <p className="text-lg mb-8">
          Regístrate hoy y empieza a explorar un mundo de sabores y oportunidades. Con FoodGlobal, el comercio global está al alcance de todos.
        </p>
        <Link to="/register" className="bg-yellow-500 text-black py-2 px-4 rounded">Regístrate Ahora</Link>
      </section>

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

export default Home;

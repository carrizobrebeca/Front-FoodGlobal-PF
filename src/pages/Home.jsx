import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/bg2.png';
import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpg';
import user3 from '../assets/images/user3.jpg';
import { motion } from 'framer-motion'; 
const Home = () => {
  return (
    <>

 
     {/* Hero Section */}
     <section
        className="hero-section relative text-white text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'contain', // Mantiene la relación de aspecto
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: '50vh', // Altura mínima para pantallas pequeñas
          height: '100vh',   // Altura completa de la pantalla
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
      {/* Animación del título */}
      <motion.h1
        initial={{ opacity: 0, x: -100 }} // Empieza invisible y a la izquierda
        animate={{ opacity: 1, x: 0 }} // Termina visible y centrado
        transition={{ duration: 0.5 }} // Duración de la animación
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-black font-custom"
      >
        Conecta Comercios Globales con Clientes Internacionales
      </motion.h1>

      {/* Animación del párrafo */}
      <motion.p
        initial={{ opacity: 0, x: -100 }} // Empieza invisible y a la izquierda
        animate={{ opacity: 1, x: 0 }} // Termina visible y centrado
        transition={{ duration: 0.7, delay: 0.3 }} // Con un pequeño retraso para que aparezca después del título
        className="text-lg md:text-2xl lg:text-3xl mb-8 max-w-3xl text-black"
      >
        FoodGlobal te permite comprar productos de cualquier parte del mundo, apoyando a comercios locales y facilitando el acceso a una amplia gama de productos internacionales.
      </motion.p>

      {/* Animación del botón */}
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Empieza invisible y a la izquierda
        animate={{ opacity: 1, x: 0 }} // Termina visible y centrado
        transition={{ duration: 0.9, delay: 0.5 }} // Un retraso adicional para que el botón aparezca después del texto
      >
        <Link to="/register" className="bg-yellow-500 text-black py-2 px-4 rounded text-lg">
          Regístrate Ahora
        </Link>
      </motion.div>
    </section>

     {/* Mission Section */}
     <section className="mission-section bg-white text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Nuestra Misión</h2>
        <p className="text-md md:text-lg lg:text-xl mx-auto max-w-2xl">
          En FoodGlobal, buscamos democratizar el comercio internacional de productos, permitiendo que los comercios locales de cualquier parte del mundo puedan llegar a clientes globales. Facilitamos la compra y venta de productos a través de nuestra plataforma, asegurando una experiencia de comercio justo y segura para todos.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-gray-100 text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
        <div className="steps flex flex-col md:flex-row items-center md:justify-around">
          <div className="step mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-semibold">Paso 1</h3>
            <p>Afíliate: Los comercios locales se registran en nuestra plataforma, suben sus productos y los ponen a disposición de un mercado global.</p>
          </div>
          <div className="step mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-semibold">Paso 2</h3>
            <p>Compra: Los clientes internacionales exploran una amplia gama de productos de diferentes partes del mundo y realizan sus pedidos de manera fácil y segura.</p>
          </div>
          <div className="step md:w-1/3">
            <h3 className="text-xl font-semibold">Paso 3</h3>
            <p>Recibe: Los productos adquiridos son enviados directamente a tu hogar, permitiéndote disfrutar de lo mejor que el mundo tiene para ofrecer.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-white text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Lo que Dicen Nuestros Usuarios</h2>
        <div className="testimonials-list mx-auto max-w-2xl flex flex-col gap-8">
          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user1} alt="Usuario 1" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"Gracias a FoodGlobal, puedo comprar productos auténticos de mi país y tenerlos en la puerta de mi casa."</p>
          </div>

          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user2} alt="Usuario 2" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"FoodGlobal me ha ayudado a expandir mi pequeño negocio a nivel internacional. ¡Una herramienta increíble!"</p>
          </div>

          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user3} alt="Usuario 3" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"Ahora puedo enviar productos a mi familia en otro país con facilidad, ¡una solución única!"</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits bg-gray-100 text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">¿Por Qué Elegir FoodGlobal?</h2>
        <div className="benefits-list mx-auto max-w-2xl">
          <div className="benefit mb-8">
            <h3 className="text-lg font-semibold">Conexión Global</h3>
            <p>Accede a productos únicos de mercados locales en cualquier parte del mundo.</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-lg font-semibold">Comercio Justo</h3>
            <p>Apoya a pequeñas empresas locales mientras disfrutas de productos de calidad.</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-lg font-semibold">Fácil y Seguro</h3>
            <p>Compra internacionalmente con opciones de pago seguras y sencillas.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
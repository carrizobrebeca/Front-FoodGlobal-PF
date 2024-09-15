import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/bg2.png';
import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpg';
import user3 from '../assets/images/user3.jpg';
import { motion } from 'framer-motion';

const Home = () => {
  const scrollAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5 },
    }),
  };

  return (
    <>
 {/* Hero Section */}
 <section
        className="hero-section relative text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: '50vh',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 10%',
        }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row justify-between items-start w-full">
            {/* Primer texto - Lado Izquierdo */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={scrollAnimation}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black font-custom w-full md:w-1/2"
              style={{ textAlign: 'left' }}
            >
              Conecta Comercios Globales con Clientes Internacionales
            </motion.h1>

            {/* Segundo texto - Lado Derecho */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={scrollAnimation}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg text-lg md:text-xl lg:text-2xl mb-8 text-black w-full md:w-1/2"
              style={{ textAlign: 'right' }}
            >
              FoodGlobal te permite comprar productos de cualquier parte del mundo, apoyando a comercios locales y facilitando el acceso a una amplia gama de productos internacionales.
            </motion.p>
          </div>

          {/* Botón centrado debajo de los textos */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scrollAnimation}
            transition={{ delay: 0.4 }}
            className="w-full flex justify-center mt-8"
          >
            <Link
              to="/register"
              className="bg-transparent border-2 border-yellow-500 text-black py-2 px-6 rounded text-lg font-bold hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out"
            >
              Regístrate Ahora
            </Link>
          </motion.div>
        </div>
      </section>
      

      {/* Mission Section con efecto de aparición al hacer scroll */}
      <motion.section
        className="mission-section bg-white text-center py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollAnimation}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Nuestra Misión</h2>
        <p className="text-md md:text-lg lg:text-xl mx-auto max-w-2xl">
          En FoodGlobal, buscamos democratizar el comercio internacional de productos, permitiendo que los comercios locales de cualquier parte del mundo puedan llegar a clientes globales.
        </p>
      </motion.section>

       {/* Sección Hero y otras secciones ... */}

      {/* How It Works Section con efecto de aparición al hacer scroll */}
      <section className="how-it-works bg-gray-100 text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">¿Cómo Funciona?</h2>
        <div className="relative">
          {/* Paso 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollAnimation}
            custom={0.2}
            className="step-container mb-12"
          >
            <div className="step-number bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">Paso 1: Afíliate</h3>
            <p className="text-md text-gray-700">
              Los comercios locales se registran en nuestra plataforma, suben sus productos y los ponen a disposición de un mercado global.
            </p>
          </motion.div>

          {/* Paso 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollAnimation}
            custom={0.4}
            className="step-container mb-12"
          >
            <div className="step-number bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">Paso 2: Compra</h3>
            <p className="text-md text-gray-700">
              Los clientes internacionales exploran una amplia gama de productos y realizan sus pedidos de manera fácil y segura.
            </p>
          </motion.div>

          {/* Paso 3 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollAnimation}
            custom={0.6}
            className="step-container mb-12"
          >
            <div className="step-number bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Paso 3: Recibe</h3>
            <p className="text-md text-gray-700">
              Los productos adquiridos son enviados directamente a tu hogar, permitiéndote disfrutar de lo mejor que el mundo tiene para ofrecer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials bg-white text-center py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollAnimation}
        custom={1}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Lo que Dicen Nuestros Usuarios</h2>
        <div className="testimonials-list mx-auto max-w-2xl flex flex-col gap-8">
          <motion.div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start" variants={scrollAnimation} custom={1.2}>
            <img src={user1} alt="Usuario 1" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"Gracias a FoodGlobal, puedo comprar productos auténticos de mi país y tenerlos en la puerta de mi casa."</p>
          </motion.div>

          <motion.div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start" variants={scrollAnimation} custom={1.4}>
            <img src={user2} alt="Usuario 2" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"FoodGlobal me ha ayudado a expandir mi pequeño negocio a nivel internacional. ¡Una herramienta increíble!"</p>
          </motion.div>

          <motion.div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start" variants={scrollAnimation} custom={1.6}>
            <img src={user3} alt="Usuario 3" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-md text-gray-700">"Ahora puedo enviar productos a mi familia en otro país con facilidad, ¡una solución única!"</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="benefits bg-gray-100 text-center py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollAnimation}
        custom={1.8}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">¿Por qué FoodGlobal?</h2>
        <ul className="benefits-list mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.li className="benefit border p-6 rounded-lg" variants={scrollAnimation} custom={2}>
            <h3 className="text-xl font-semibold">Conectividad Global</h3>
            <p>Accede a productos de cualquier parte del mundo con solo unos clics.</p>
          </motion.li>

          <motion.li className="benefit border p-6 rounded-lg" variants={scrollAnimation} custom={2.2}>
            <h3 className="text-xl font-semibold">Apoyo a Comercios Locales</h3>
            <p>Cada compra apoya a un pequeño negocio, generando un impacto real.</p>
          </motion.li>

          <motion.li className="benefit border p-6 rounded-lg" variants={scrollAnimation} custom={2.4}>
            <h3 className="text-xl font-semibold">Pagos Seguros</h3>
            <p>Ofrecemos una plataforma segura para realizar tus compras con confianza.</p>
          </motion.li>

          <motion.li className="benefit border p-6 rounded-lg" variants={scrollAnimation} custom={2.6}>
            <h3 className="text-xl font-semibold">Entregas Internacionales</h3>
            <p>Recibe productos en tu hogar, sin importar en qué parte del mundo estés.</p>
          </motion.li>
        </ul>
      </motion.section>
    </>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/bg1.png';
import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpg';
import user3 from '../assets/images/user3.jpg';
// Home Component
const Home = () => {
  return (
    <>


      {/* Hero Section */}
      <section
        className="hero-section relative text-white text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '1914px',
          height: '585px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 className="text-4xl font-bold mb-4 text-black">Conecta Comercios Globales con Clientes Internacionales</h1>
        <p className="text-xl mb-8 max-w-3xl text-black">
          FoodGlobal te permite comprar productos de cualquier parte del mundo, apoyando a comercios locales y facilitando el acceso a una amplia gama de productos internacionales.
        </p>
        <Link to="/register" className="bg-yellow-500 text-black py-2 px-4 rounded">Regístrate Ahora</Link>
      </section>

      {/* Mission Section */}
      <section className="mission-section bg-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
        <p className="text-lg mx-auto max-w-2xl">
          En FoodGlobal, buscamos democratizar el comercio internacional de productos, permitiendo que los comercios locales de cualquier parte del mundo puedan llegar a clientes globales. Facilitamos la compra y venta de productos a través de nuestra plataforma, asegurando una experiencia de comercio justo y segura para todos.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-gray-100 text-center py-16">
        <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
        <div className="steps flex flex-col items-center">
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 1</h3>
            <p>Afíliate: Los comercios locales se registran en nuestra plataforma, suben sus productos y los ponen a disposición de un mercado global.</p>
          </div>
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 2</h3>
            <p>Compra: Los clientes internacionales exploran una amplia gama de productos de diferentes partes del mundo y realizan sus pedidos de manera fácil y segura.</p>
          </div>
          <div className="step mb-8">
            <h3 className="text-xl font-semibold">Paso 3</h3>
            <p>Recibe: Los productos adquiridos son enviados directamente a tu hogar, permitiéndote disfrutar de lo mejor que el mundo tiene para ofrecer.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-white text-center py-16">
        <h2 className="text-3xl font-bold mb-8">Lo que Dicen Nuestros Usuarios</h2>
        <div className="testimonials-list mx-auto max-w-2xl flex flex-col gap-8">
          
          {/* Testimonio 1 */}
          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user1} alt="Usuario 1" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-lg text-gray-700">"Gracias a FoodGlobal, puedo comprar productos auténticos de mi país y tenerlos en la puerta de mi casa."</p>
          </div>

          {/* Testimonio 2 */}
          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user2} alt="Usuario 2" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-lg text-gray-700">"FoodGlobal me ha ayudado a expandir mi pequeño negocio a nivel internacional. ¡Una herramienta increíble!"</p>
          </div>

          {/* Testimonio 3 */}
          <div className="testimonial border p-6 rounded-lg flex flex-col items-center md:flex-row md:items-start">
            <img src={user3} alt="Usuario 3" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
            <p className="text-lg text-gray-700">"Ahora puedo enviar productos a mi familia en otro país con facilidad, ¡una solución única!"</p>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="benefits bg-gray-100 text-center py-16">
        <h2 className="text-3xl font-bold mb-4">¿Por Qué Elegir FoodGlobal?</h2>
        <div className="benefits-list mx-auto max-w-2xl">
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Conexión Global</h3>
            <p>Accede a productos únicos de mercados locales en cualquier parte del mundo.</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Comercio Justo</h3>
            <p>Apoya a pequeñas empresas locales mientras disfrutas de productos de calidad.</p>
          </div>
          <div className="benefit mb-8">
            <h3 className="text-xl font-semibold">Fácil y Seguro</h3>
            <p>Compra internacionalmente con opciones de pago seguras y sencillas.</p>
          </div>
        </div>
      </section>



    </>
  );
};

export default Home;
import React from 'react';
import Navbar from '../components/Navbar';

const SobreNosotros = () => {
  return (
    <>
  
      <div className="p-8 bg-gray-100">
        {/* Introducción */}
        <section className="about-intro text-center py-16 bg-white shadow-md rounded-lg mb-8 transition-all hover:shadow-xl hover:scale-105 hover:border-gray-300 border border-transparent transform cursor-pointer hover:bg-indigo-50">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre FoodGlobal</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            En FoodGlobal, estamos comprometidos con la misión de conectar a las personas con alimentos auténticos y de calidad de todo el mundo.
            Nos enfocamos en crear una red global de productores locales, supermercados y pequeños comercios para brindar acceso a productos alimenticios 
            de diferentes culturas y países, todo desde la comodidad de tu hogar.
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Nuestra plataforma no solo facilita la compra y envío de productos internacionales, sino que también promueve el comercio justo, apoya a los productores independientes, 
            y reduce las barreras de acceso a productos esenciales en áreas remotas.
          </p>
        </section>

        {/* Visión */}
        <section className="about-mission text-center py-16 bg-white shadow-md rounded-lg mb-8 transition-all hover:shadow-xl hover:scale-105 hover:border-gray-300 border border-transparent transform cursor-pointer hover:bg-indigo-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Creemos en un futuro donde el acceso a alimentos auténticos sea universal. Queremos ser la plataforma líder que une a consumidores de todo el mundo
            con productos locales y frescos, apoyando a pequeños negocios y comunidades que se dedican a la producción de alimentos.
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            En FoodGlobal, no solo entregamos productos alimenticios; promovemos el respeto y la valorización de las diferentes culturas culinarias del mundo. 
            Nuestro objetivo es ofrecer una experiencia de compra segura, accesible y diversa, con un enfoque en la sostenibilidad y la responsabilidad social.
          </p>
        </section>

        {/* Valores */}
        <section className="about-values text-center py-16 bg-white shadow-md rounded-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Valor 1 */}
            <div
              className="relative bg-gray-50 p-6 rounded-lg shadow-md border border-transparent transition-all hover:shadow-xl hover:border-gray-300 hover:scale-105 transform hover:bg-indigo-50 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Compromiso con la calidad</h3>
              <p className="text-gray-700">
                Trabajamos solo con proveedores que cumplen con altos estándares de calidad y sostenibilidad.
              </p>
            </div>

            {/* Valor 2 */}
            <div
              className="relative bg-gray-50 p-6 rounded-lg shadow-md border border-transparent transition-all hover:shadow-xl hover:border-gray-300 hover:scale-105 transform hover:bg-indigo-50 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Apoyo a productores locales</h3>
              <p className="text-gray-700">
                Nos esforzamos por impulsar el desarrollo económico local conectando a pequeños productores con mercados internacionales.
              </p>
            </div>

            {/* Valor 3 */}
            <div
              className="relative bg-gray-50 p-6 rounded-lg shadow-md border border-transparent transition-all hover:shadow-xl hover:border-gray-300 hover:scale-105 transform hover:bg-indigo-50 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cultura global</h3>
              <p className="text-gray-700">
                Promovemos la diversidad y el respeto a través del intercambio de alimentos auténticos de diferentes culturas.
              </p>
            </div>

            {/* Valor 4 */}
            <div
              className="relative bg-gray-50 p-6 rounded-lg shadow-md border border-transparent transition-all hover:shadow-xl hover:border-gray-300 hover:scale-105 transform hover:bg-indigo-50 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sostenibilidad</h3>
              <p className="text-gray-700">
                Estamos comprometidos con reducir el impacto ambiental mediante prácticas logísticas responsables y colaboraciones con productores sostenibles.
              </p>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="about-team text-center py-16 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestro Equipo</h2>
          <div className="team-members flex flex-col md:flex-row md:justify-center md:space-x-6">
            {/* Miembro 1 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-md mb-6 md:mb-0 transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent">
              <img src="https://res.cloudinary.com/foodglobal/image/upload/v1726676826/Santi_z5skkk.jpg" alt="Miembro del equipo 1" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"/>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">SANTIAGO</h3>
              <p className="text-gray-700">Desarrollador Full Stack en frontend. Crea interfaces de usuario intuitivas y atractivas, mejorando la experiencia del usuario y la adaptabilidad móvil.</p>
            </div>

            {/* Miembro 2 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-md mb-6 md:mb-0 transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent">
              <img src="https://res.cloudinary.com/foodglobal/image/upload/v1726676695/Rebeca_fy6vvx.jpg" alt="Miembro del equipo 2" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"/>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">REBECA</h3>
              <p className="text-gray-700">Desarrolladora Full Stack en frontend. Diseña y desarrolla componentes interactivos, enfocándose en la usabilidad y el diseño responsivo.</p>
            </div>

            {/* Miembro 3 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-md mb-6 md:mb-0 transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent">
              <img src="https://res.cloudinary.com/foodglobal/image/upload/v1726676826/Jhona_fsmr1l.webp" alt="Miembro del equipo 3" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"/>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">JHONA</h3>
              <p className="text-gray-700">Desarrollador Full Stack en backend. Maneja la arquitectura del servidor y la integración de APIs, optimizando el rendimiento y la lógica empresarial.</p>
            </div>

            {/* Miembro 4 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-md mb-6 md:mb-0 transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent">
              <img src="https://res.cloudinary.com/foodglobal/image/upload/v1726676579/Screenshot_20240918-013639_kdpmii.png" alt="Miembro del equipo 4" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"/>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">NERIO</h3>
              <p className="text-gray-700">Desarrollador Full Stack en backend. Implementa funcionalidades de seguridad y autenticación, y optimiza la comunicación entre servicios.</p>
            </div>

            {/* Miembro 5 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent">
              <img src="https://res.cloudinary.com/foodglobal/image/upload/v1726677110/Brahian_lmahuo.jpg" alt="Miembro del equipo 5" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"/>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">BRAHIAN</h3>
              <p className="text-gray-700">Desarrollador Full Stack en backend. Desarrolla sistemas de notificaciones y manejo de pedidos, e integra servicios externos como pagos y envíos.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SobreNosotros;
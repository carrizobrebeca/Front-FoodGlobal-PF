import React from 'react';
import Navbar from '../components/Navbar';
const SobreNosotros = () => {
  return (
    <>

    <div className="p-8 bg-gray-100">
      <section className="about-intro text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Sobre FoodGlobal</h1>
        <p className="text-lg mb-8">
          En FoodGlobal, estamos comprometidos con la misión de conectar a las personas con alimentos auténticos y de calidad de todo el mundo.
          Nuestra plataforma está diseñada para facilitar el comercio justo y apoyar a pequeños productores globales.
        </p>
      </section>

      <section className="about-mission text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Nuestra Visión</h2>
        <p className="text-lg mx-auto max-w-3xl">
          Creemos en un futuro donde el acceso a alimentos auténticos sea universal. Nuestra plataforma ofrece una experiencia de compra internacional segura
          y confiable, promoviendo la cultura culinaria global y apoyando a empresas locales.
        </p>
      </section>

      <section className="about-team text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
        <div className="team-members flex flex-col md:flex-row md:justify-center">
          <div className="team-member bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6">
            <img src="https://via.placeholder.com/150" alt="Miembro del equipo 1" className="w-24 h-24 rounded-full mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Nombre 1</h3>
            <p className="text-gray-700">Descripción breve del rol y contribuciones de este miembro del equipo.</p>
          </div>
          {/* Más miembros del equipo */}
        </div>
      </section>
    </div>
    </>
  );
};

export default SobreNosotros;

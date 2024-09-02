import React from 'react';

const Locales = () => {
  return (
    <>
  
    <div className="p-8 bg-gray-100">
      <section className="locales-intro text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Locales Asociados</h1>
        <p className="text-lg mb-8">
          Encuentra nuestros locales asociados donde puedes recoger los productos comprados a través de FoodGlobal.
        </p>
      </section>

      <section className="locales-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aquí se deben cargar los datos reales de los locales */}
        <div className="local-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Local 1</h2>
          <p className="text-gray-700 mb-4">Dirección del local, incluyendo ciudad y país.</p>
          <p className="text-gray-700 mb-4">Horario de atención y otros detalles importantes.</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300">Más Información</button>
        </div>
        {/* Más locales */}
      </section>
    </div>
    </>
  );
};

export default Locales;

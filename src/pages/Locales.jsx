import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Locales = () => {
  const [locales, setLocales] = useState({});

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const response = await axios.get('http://localhost:3001/negocios');
        const data = response.data;

        // Categorizar locales
        const categorizedLocales = {
          'Comida Rápida': [],
          'Restaurantes': [],
          'Supermercados': [],
          'Kioscos': []
        };

        data.forEach(local => {
          if (local.nombre.toLowerCase().includes('supermercado') || local.descripcion.toLowerCase().includes('supermercado')) {
            categorizedLocales['Supermercados'].push(local);
          } else if (local.nombre.toLowerCase().includes('kiosco') || local.descripcion.toLowerCase().includes('kiosco')) {
            categorizedLocales['Kioscos'].push(local);
          } else if (local.nombre.toLowerCase().includes('restaurante') || local.descripcion.toLowerCase().includes('restaurante')) {
            categorizedLocales['Restaurantes'].push(local);
          } else if (local.nombre.toLowerCase().includes('comida rápida') || local.descripcion.toLowerCase().includes('comida rápida')) {
            categorizedLocales['Comida Rápida'].push(local);
          }
        });

        setLocales(categorizedLocales);
      } catch (error) {
        console.error('Error fetching locales:', error);
      }
    };

    fetchLocales();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <section className="locales-intro text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Locales Asociados</h1>
        <p className="text-lg mb-8">
          Encuentra nuestros locales asociados donde puedes recoger los productos comprados a través de FoodGlobal.
        </p>
      </section>

      {Object.keys(locales).map(category => (
        locales[category].length > 0 && (
          <section key={category} className="locales-list mb-12">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locales[category].map(local => (
                <div key={local.id} className="local-card bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{local.nombre}</h3>
                  <p className="text-gray-700 mb-4">{local.descripcion}</p>
                  <p className="text-gray-700 mb-4">Dirección del local, incluyendo ciudad y país.</p>
                  <p className="text-gray-700 mb-4">Horario de atención y otros detalles importantes.</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300">Más Información</button>
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default Locales;

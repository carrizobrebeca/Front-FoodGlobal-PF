import React from 'react';


const PoliticasPrivacidad = () => {
  return (
    <>

      <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
        <section className="text-center py-16 bg-white shadow-xl rounded-lg mb-8 transition-transform transform hover:scale-105 duration-300">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Política de Privacidad
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            En <span className="text-blue-600 font-bold">FoodGlobal</span>, valoramos la privacidad de nuestros usuarios. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información personal.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Recopilación de Información */}
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Recopilación de Información
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Recopilamos información personal que usted nos proporciona voluntariamente al registrarse en nuestra plataforma, como nombre, correo electrónico, dirección de envío y datos de pago.
              </p>
            </div>

            {/* Uso de la Información */}
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Uso de la Información
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Utilizamos su información personal para procesar pedidos, proporcionar servicios y mejorar su experiencia. No compartimos su información con terceros, salvo en casos necesarios.
              </p>
            </div>

            {/* Protección de Datos */}
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Protección de Datos
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Implementamos medidas de seguridad para proteger su información de accesos no autorizados, alteraciones o divulgación.
              </p>
            </div>

            {/* Derechos del Usuario */}
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Derechos del Usuario
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Usted tiene derecho a acceder, modificar o eliminar su información personal en cualquier momento. No dude en contactarnos si tiene alguna duda.
              </p>
            </div>

            {/* Cambios a Esta Política */}
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Cambios a Esta Política
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento y notificaremos cualquier cambio significativo a nuestros usuarios.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
              Contacta con Nosotros
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PoliticasPrivacidad;
import React from 'react';


const TerminosCondiciones = () => {
  return (
    <>

      <div className="p-8 bg-gray-100 min-h-screen">
        <section className="text-center py-16 bg-white shadow-lg rounded-lg mb-8 transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide">Términos y Condiciones</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bienvenido a FoodGlobal. Al utilizar nuestra plataforma, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.
          </p>

          <div className="space-y-10">
            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Uso de la Plataforma</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Al registrarte y utilizar FoodGlobal, te comprometes a proporcionar información veraz y a mantener la seguridad de tu cuenta. No puedes usar nuestra plataforma para actividades ilícitas o fraudulentas.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Propiedad Intelectual</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Todo el contenido, marcas registradas, logotipos y otros elementos visuales presentes en FoodGlobal son propiedad de la empresa y están protegidos por las leyes de derechos de autor.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Condiciones de Compra</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Al realizar una compra en FoodGlobal, te comprometes a pagar el precio total indicado en los productos seleccionados, incluidos impuestos y tarifas de envío aplicables. Las políticas de devolución varían según el proveedor.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Limitación de Responsabilidad</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                FoodGlobal no se hace responsable de los daños directos o indirectos que puedan surgir del uso de nuestra plataforma o de la imposibilidad de acceder a la misma.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Modificaciones a los Términos</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                FoodGlobal se reserva el derecho de modificar estos términos en cualquier momento. Cualquier cambio será notificado a los usuarios a través de la plataforma.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Jurisdicción</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde opera FoodGlobal.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Si tienes alguna pregunta o inquietud sobre estos Términos y Condiciones, puedes ponerte en contacto con nosotros a través de nuestro formulario de contacto o enviándonos un correo electrónico.
              </p>
            </div>

            {/* Nueva información añadida */}
            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Cuenta de Usuario</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Al crear una cuenta en FoodGlobal, es tu responsabilidad mantener la confidencialidad de tu contraseña y toda la información de tu cuenta. Si detectas alguna actividad sospechosa en tu cuenta, debes informarnos de inmediato.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Disponibilidad de Productos</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Algunos productos pueden estar sujetos a restricciones de envío o no estar disponibles en ciertos países. FoodGlobal no garantiza la disponibilidad de ningún producto en todo momento.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Precios y Promociones</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Los precios y promociones ofrecidos en la plataforma pueden estar sujetos a cambios sin previo aviso. FoodGlobal se reserva el derecho de cancelar órdenes en caso de errores en precios o promociones.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Pago y Facturación</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Todos los pagos deben realizarse en la moneda especificada. En caso de fallos en el procesamiento, FoodGlobal se reserva el derecho de cancelar o suspender tu pedido.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Envíos y Entregas</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Los tiempos de envío varían según la ubicación. FoodGlobal no es responsable por retrasos debido a factores externos como aduanas o clima.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Devoluciones y Reembolsos</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Cada proveedor tiene su propia política de devoluciones. FoodGlobal actuará como intermediario cuando sea necesario.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Suspensión de Servicios</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                FoodGlobal se reserva el derecho de suspender temporal o permanentemente el acceso por mantenimiento o actualizaciones.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Datos Personales</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Al utilizar nuestra plataforma, consientes el uso de tus datos de acuerdo con nuestra <a href="/politica-de-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</a>.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Resolución de Conflictos</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                En caso de disputa relacionada con el uso de FoodGlobal, intentaremos resolverla de manera amistosa antes de recurrir a los tribunales competentes.
              </p>
            </div>

            <div className="transition-colors hover:bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Vigencia de los Términos</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Estos términos se mantendrán vigentes mientras uses nuestra plataforma, y las obligaciones legales relacionadas seguirán aplicándose.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TerminosCondiciones;
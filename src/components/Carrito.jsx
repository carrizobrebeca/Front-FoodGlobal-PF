import React from 'react';

const Carrito = ({ productos, total, onQuitarDelCarrito }) => {
  return (
    <div className="p-8 bg-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} className="p-4 border rounded-lg shadow-md bg-white">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
              <p className="text-gray-600 mb-2">Precio: ${producto.precio}</p>
              <p className="text-gray-600 mb-2">Cantidad: {producto.cantidad}</p>
              <button
                onClick={() => onQuitarDelCarrito(producto.id)}
                className="mt-2 p-2 bg-red-500 text-white rounded w-full"
              >
                Quitar del Carrito
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 p-4 bg-white border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Total: ${total}</h3>
      </div>
    </div>
  );
};

export default Carrito;

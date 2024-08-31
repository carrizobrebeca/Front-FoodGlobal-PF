import React from 'react';

const Carrito = ({ productos, total, onQuitarDelCarrito }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
      {productos.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="space-y-4">
          {productos.map((producto) => (
            <li
              key={producto.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                  <p className="mb-2">Cantidad: {producto.cantidad}</p>
                  <p className="font-bold">Precio: ${producto.precio.toFixed(2)} (Total: ${(producto.precio * producto.cantidad).toFixed(2)})</p>
                </div>
                <button
                  onClick={() => onQuitarDelCarrito(producto.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded shadow-lg hover:bg-red-400 transition duration-300"
                >
                  Quitar
                </button>
              </div>
              {/* Eliminar la sección de detalles emergentes */}
            </li>
          ))}
        </ul>
      )}
      <h3 className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Carrito;

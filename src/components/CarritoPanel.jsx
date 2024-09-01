import React from 'react';

const CarritoPanel = ({ productos, total, onQuitarDelCarrito, isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-4">
        <button onClick={onClose} className="mb-4 text-red-500">Cerrar</button>
        <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
        {productos.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {productos.map((producto) => (
              <div key={producto.id} className="p-2 border rounded-lg shadow-md bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
                <p className="text-gray-600 mb-2">Precio: ${producto.precio}</p>
                <p className="text-gray-600 mb-2">Cantidad: {producto.cantidad}</p>
                <button
                  onClick={() => onQuitarDelCarrito(producto.id)}
                  className="mt-2 p-2 bg-red-500 text-white rounded"
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
    </div>
  );
};

export default CarritoPanel;

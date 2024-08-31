import React, { useState } from 'react';

const CardProducto = ({ producto, onOpenModal, onAgregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (event) => {
    setCantidad(Number(event.target.value));
  };

  const handleAgregarAlCarrito = () => {
    onAgregarAlCarrito({ ...producto, cantidad });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md relative max-w-xs mx-auto">
      <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold truncate">{producto.nombre}</h3>
      <p className="text-md mb-2">Precio: ${producto.precio.toFixed(2)}</p>
      <div className="flex items-center mb-3">
        <label htmlFor={`cantidad-${producto.id}`} className="mr-2 text-md">Cantidad:</label>
        <input
          id={`cantidad-${producto.id}`}
          type="number"
          value={cantidad}
          min="1"
          onChange={handleCantidadChange}
          className="border rounded px-2 py-1 text-center text-md w-20"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onOpenModal(producto)}
          className="bg-blue-500 text-white py-2 px-3 rounded shadow-md hover:bg-blue-400 transition duration-300 text-md"
        >
          Ver Detalles
        </button>
        <button
          onClick={handleAgregarAlCarrito}
          className="bg-green-500 text-white py-2 px-3 rounded shadow-md hover:bg-green-400 transition duration-300 text-md"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default CardProducto;

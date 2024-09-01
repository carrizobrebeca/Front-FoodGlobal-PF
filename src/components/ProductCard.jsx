import React from 'react';

const ProductCard = ({ producto, onOpenDetail, onAddToCart }) => {
  const { nombre, precio, imagen } = producto;

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {imagen ? (
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2 rounded">
          <span>No image</span>
        </div>
      )}
      <h2 className="text-lg font-semibold">{nombre}</h2>
      <p className="text-gray-700">Precio: ${precio}</p>
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => onOpenDetail(producto)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Ver Detalle
        </button>
        <button
          onClick={() => onAddToCart(producto)}
          className="p-2 bg-green-500 text-white rounded"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

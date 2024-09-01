import React, { useState, useEffect } from 'react';

const ProductDetailModal = ({ product, onClose, agregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    // Cierra el modal si se hace clic fuera del modal
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (cantidad > 0 && cantidad <= product.stock) {
      agregarAlCarrito({ ...product, cantidad });
      onClose();
    } else {
      alert("Cantidad no válida.");
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay">
      <div className="bg-white p-6 rounded-lg relative w-11/12 md:w-1/2 lg:w-1/3">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">{product.nombre}</h2>
        <img src={product.imagen} alt={product.nombre} className="w-full h-64 object-cover mb-4" />
        <p>Descripción: {product.descripcion}</p>
        <p>Precio: ${product.precio}</p>
        <p>Categoría: {product.categoria}</p>
        <p>Stock: {product.stock}</p>

        <div className="mt-4">
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            min="1"
            max={product.stock}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            className="border rounded p-1 mt-1 w-full"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;

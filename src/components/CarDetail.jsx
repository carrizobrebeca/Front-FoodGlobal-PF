import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const CardDetail = ({ producto, onClose, onAgregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);
  const modalRef = useRef(null);

  // Función para manejar el clic fuera del modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Llama a onClose si se hace clic fuera del modal
    }
  };

  // Efecto para agregar y limpiar el evento de clic fuera del modal
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Verifica si el producto existe antes de renderizar
  if (!producto) {
    return null; // Retorna null si no hay producto
  }

  const handleCantidadChange = (event) => {
    setCantidad(Number(event.target.value));
  };

  const handleAgregarAlCarrito = () => {
    if (onAgregarAlCarrito) {
      onAgregarAlCarrito({ ...producto, cantidad });
      onClose(); // Cierra el modal después de agregar al carrito
    } else {
      console.error('onAgregarAlCarrito no está definido');
    }
  };

  // Asegúrate de que la ruta de la imagen es correcta
  const imagen = producto.imagen;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white border rounded-lg p-4 shadow-lg relative max-w-sm mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div className="w-full aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg">
          <img
            src={imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{producto.nombre}</h2>
        <p className="text-lg mb-2">{producto.descripcion}</p>
        <p className="text-xl font-semibold mb-4">Precio: ${producto.precio.toFixed(2)}</p>
        <p className="text-lg mb-2">Categoría: {producto.categoria}</p>
        <p className="text-md mb-4">Detalles Adicionales: {producto.detalles}</p>
        
        <div className="flex items-center mb-4">
          <label htmlFor={`cantidad-${producto.id}`} className="mr-4 text-lg">Cantidad:</label>
          <input
            id={`cantidad-${producto.id}`}
            type="number"
            value={cantidad}
            min="1"
            onChange={handleCantidadChange}
            className="border rounded px-3 py-1 w-24 text-center"
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handleAgregarAlCarrito}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-400 transition duration-300"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CardDetail;

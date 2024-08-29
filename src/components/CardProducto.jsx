import React from 'react';

// Importa todas las imágenes necesarias aquí
import imagenProducto1 from '../assets/images/producto1.png';
import imagenProducto2 from '../assets/images/producto2.png';

// Añade más importaciones de imágenes según sea necesario

const imagenes = {
  'Producto1': imagenProducto1,
  'Producto2': imagenProducto2,

  // Añade todas las imágenes necesarias aquí
};

const CardProducto = ({ producto, onOpenModal }) => {
  // Selecciona la imagen según el nombre del producto
  const imagen = imagenes[producto.nombre] || imagenProducto2; // Imagen por defecto si no hay coincidencia

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="w-full h-64 mb-4 overflow-hidden">
        <img
          src={imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
      <p className="mb-2">{producto.descripcion}</p>
      <p className="font-bold mb-4">Precio: ${producto.precio.toFixed(2)}</p>
      <button
        onClick={onOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300"
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default CardProducto;

import React from 'react';

const CardDetail = ({ producto }) => {
  const imagen = `/assets/images/${producto.nombre.toLowerCase().replace(/ /g, '_')}.png`; // Ajusta según sea necesario

  return (
    <div className="p-4">
      <img
        src={imagen}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{producto.nombre}</h2>
      <p className="mb-2">{producto.descripcion}</p>
      <p className="font-bold mb-4">Precio: ${producto.precio.toFixed(2)}</p>
      <p className="mb-4">Categoría: {producto.categoria}</p>
      <p>Detalles Adicionales: {producto.detalles}</p>
    </div>
  );
};

export default CardDetail;

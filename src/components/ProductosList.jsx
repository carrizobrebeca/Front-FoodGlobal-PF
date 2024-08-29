import React, { useState } from 'react';
import CardProducto from './CardProducto';
import CardDetail from './CardDetail';

const ProductosList = ({ productos }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirDetalle = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDetalle = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <CardProducto
            key={producto.id}
            producto={producto}
            onVerDetalle={() => abrirDetalle(producto)}
          />
        ))}
      </div>

      {/* Mostrar el modal si hay un producto seleccionado */}
      {productoSeleccionado && (
        <CardDetail
          producto={productoSeleccionado}
          onClose={cerrarDetalle}
        />
      )}
    </div>
  );
};

export default ProductosList;

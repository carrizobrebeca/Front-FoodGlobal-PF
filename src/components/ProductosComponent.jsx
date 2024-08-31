import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductosPorNegocio } from '../store/productosSlice';

const ProductosComponent = ({ negocioId, handleAddToCart, handleOpenDetail }) => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.productosPorNegocio);
  const status = useSelector((state) => state.productos.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductosPorNegocio(negocioId));
    }
  }, [status, dispatch, negocioId]);

  return (
    <div>
      <h1>Productos</h1>
      {productos.length > 0 ? (
        productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-md mb-4">
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p className="font-bold">Precio: ${producto.precio.toFixed(2)}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToCart(producto)}
                className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-400 transition duration-300"
              >
                Añadir al Carrito
              </button>
              <button
                onClick={() => handleOpenDetail(producto)}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductosComponent;

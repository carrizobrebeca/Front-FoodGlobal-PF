import React from 'react';
import { useDispatch } from 'react-redux';
import { eliminarProducto } from '../store/carritoSlice'; // Ajusta la ruta según tu estructura de carpetas

const CarritoPanel = ({ productos, onClose, isOpen }) => {
  const dispatch = useDispatch();

  const handleEliminar = (id) => {
    dispatch(eliminarProducto({ id }));
  };

  const handleComprar = () => {
    // Lógica para proceder a la compra
    alert('¡Compra realizada!');
    // Aquí puedes hacer redirección o abrir un modal de pago
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white text-gray-800 transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } shadow-lg z-50`}
    >
      <button className="p-4 text-xl" onClick={onClose}>
        X
      </button>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Carrito</h2>
        {productos.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {productos.map((producto) => (
                <li key={producto.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p className="text-gray-600">Precio: ${producto.precio}</p>
                    <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
                  </div>
                  <button
                    onClick={() => handleEliminar(producto.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-xl font-bold">Total: ${calcularTotal().toFixed(2)}</h3>
              <button
                onClick={handleComprar}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoPanel;

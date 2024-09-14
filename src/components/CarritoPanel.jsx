import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { eliminarProducto, validarStock , vaciarCarrito } from '../store/carritoSlice';
import axios from 'axios';
import StripeCheckout from '../components/StripeCheckout'; // Ajusta la ruta
import { useNavigate } from 'react-router-dom';
const CarritoPanel = ({ productos, onClose, isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [isCartDisabled, setIsCartDisabled] = useState(false);
  const [stockInfo, setStockInfo] = useState({});
  const [entregaSeleccionada, setEntregaSeleccionada] = useState('retiro'); // Valor inicial

  useEffect(() => {
    if (paymentMessage) {
      setShowPaymentMessage(true);
      const timer = setTimeout(() => {
        setShowPaymentMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paymentMessage]);

  useEffect(() => {
    if (showCheckout) {
      setIsCartDisabled(true);
    } else {
      setIsCartDisabled(false);
    }
  }, [showCheckout]);

  const handleEliminar = (id) => {
    if (!isCartDisabled) {
      dispatch(eliminarProducto({ id }));
    }
  };

  const handleEntregaChange = (e) => {
    setEntregaSeleccionada(e.target.value);
  };

  const handleCantidadChange = (id, cantidad) => {
    if (!isCartDisabled) {
      const producto = productos.find(prod => prod.id === id);
      if (producto && cantidad <= producto.stock) {
        dispatch(validarStock({ id, cantidad }));
      } else {
        console.error('Cantidad excede el stock disponible.');
      }
    }
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  const handleComprar = async () => {
    try {
      // Obtén el total a pagar
      const amount = calcularTotal() * 100;

      // Solicita un PaymentIntent al backend
      await axios.post('http://localhost:3001/create-payment-intent', {
        amount,
      });

      setShowCheckout(true);
      setPaymentMessage('');
    } catch (err) {
      console.error('Error en la compra:', err);
      setPaymentMessage(err.message);
      alert(err.message);
    }
  };

  const totalAmount = calcularTotal() * 100;

  const handleSuccess = async () => {
    setPaymentMessage('¡Pago exitoso!');
    setShowCheckout(false);
  
    try {
      const compraData = {
        usuario_id: "e8e2ac8c-5c0e-419f-8d6a-e7f0bc607e05",
        productos: productos.map((producto) => ({
          producto_id: producto.id,
          cantidad: producto.cantidad,
        })),
        tipo_entrega: entregaSeleccionada,
        total: calcularTotal(),
      };
  
      const response = await axios.post('http://localhost:3001/finalizar-compra', compraData);
      const { id } = response.data.pedido; // Obtén el ID del pedido de la respuesta
  
      console.log(id); // Asegúrate de que el ID se está obteniendo correctamente
  
      dispatch(vaciarCarrito());
      setPaymentMessage('¡Stock actualizado y compra finalizada!');
  
      // Usa navigate en lugar de window.location.href
      navigate(`/pedido/${id}`);
    } catch (err) {
      console.error('Error al finalizar la compra:', err);
      setPaymentMessage('Error al finalizar la compra: ' + err.message);
      alert('Error al finalizar la compra: ' + err.message);
    }
  };

  const handleError = (message) => {
    setPaymentMessage(`Error en el pago: ${message}`);
  };

  return (
    <>
      {isCartDisabled && !showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-gray-800 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg z-50`}
      >
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          X
        </button>
        <div className={`p-4 ${isCartDisabled ? 'pointer-events-none opacity-50' : ''}`}>
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
                      <div className="flex items-center">
                        <label htmlFor={`cantidad-${producto.id}`} className="text-gray-600 mr-2">Cantidad:</label>
                        <input
                          type="number"
                          id={`cantidad-${producto.id}`}
                          value={producto.cantidad}
                          min="1"
                          onChange={(e) => handleCantidadChange(producto.id, Number(e.target.value))}
                          className="w-20 p-1 border rounded"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className={`text-red-600 hover:underline ${isCartDisabled ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${calcularTotal().toFixed(2)}</h3>
                
                {/* Agregar selección de tipo de entrega */}
                <div className="mt-4">
                  <label htmlFor="tipo-entrega" className="text-gray-600 mr-2">Tipo de Entrega:</label>
                  <select
                    id="tipo-entrega"
                    value={entregaSeleccionada}
                    onChange={handleEntregaChange}
                    className="p-2 border rounded"
                  >
                    <option value="retiro">Retiro</option>
                    <option value="domicilio">Domicilio</option>
                  </select>
                </div>

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

      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <button
              className="absolute top-4 right-4 text-xl text-gray-600"
              onClick={() => setShowCheckout(false)}
            >
              X
            </button>
            <StripeCheckout totalAmount={totalAmount} onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>
      )}

      {showPaymentMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 text-center text-white bg-blue-600 rounded-lg mt-4 z-50">
          {paymentMessage}
        </div>
      )}
    </>
  );
};

export default CarritoPanel;

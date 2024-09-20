import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarProducto, validarStock, vaciarCarrito } from '../store/carritoSlice';
import axios from 'axios';
import StripeCheckout from '../components/StripeCheckout'; // Ajusta la ruta
import { useNavigate } from 'react-router-dom';

const CarritoPanel = ({ productos, onClose, isOpen, setProductos, negocioId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [isCartDisabled, setIsCartDisabled] = useState(false);
  const [entregaSeleccionada, setEntregaSeleccionada] = useState('retiro'); // Valor inicial
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [nombre, setNombre] = useState('');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');

  
  const user = useSelector((state) => state.login.user);

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
      const producto = productos.find((prod) => prod.id === id);
      if (producto) {
        dispatch(eliminarProducto({ id }));
        setProductos(prevProductos =>
          prevProductos.map(prod => (prod.id === producto.id ? { ...prod, stock: prod.stock + producto.cantidad } : prod))
        );
      }
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    const producto = productos.find((prod) => prod.id === id);
    if (producto) {
      const quantityDiff = newQuantity - producto.cantidad;
      setProductos(prevProductos =>
        prevProductos.map(prod => (prod.id === producto.id ? { ...prod, stock: prod.stock - quantityDiff } : prod))
      );
    }
  };

  const handleEntregaChange = (e) => {
    setEntregaSeleccionada(e.target.value);
  };

  const handleCantidadChange = (id, cantidad) => {
    if (!isCartDisabled) {
      const producto = productos.find((prod) => prod.id === id);
      if (producto && cantidad <= producto.stock) {
        dispatch(validarStock({ id, cantidad }));
      } else {
        console.error('Cantidad excede el stock disponible.');
      }
    }
  };

  const calcularTotal = () => {
    return productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const handleComprar = async () => {
    try {
      const amount = calcularTotal() * 100;

      await axios.post('https://back-foodglobal-pf.up.railway.app/create-payment-intent', {
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
  
    const usuarioId = localStorage.getItem('usuario_id');
    
    if (!usuarioId) {
      alert('Por favor, inicia sesión para continuar.');
      return; // Detener la ejecución si no hay usuario logueado
    }
  
    try {
      const compraData = {
        usuario_id: user.id,
        negocio_id: negocioId,
        productos: productos.map((producto) => ({
          producto_id: producto.id,
          cantidad: producto.cantidad,
        })),
        tipo_entrega: entregaSeleccionada,
        datos_entrega: entregaSeleccionada === 'domicilio' ? {
          ciudad,
          direccion_envio: direccion,
          codigo_postal: codigoPostal,
        } : entregaSeleccionada === 'retiro' ? {
          nombre,
          documento_identidad: documentoIdentidad
        } : null,
        estado: "pendiente",
      };
      console.log(compraData)
      const response = await axios.post('https://back-foodglobal-pf.up.railway.app/finalizar-compra', compraData);
      const { id } = response.data.pedido;
  
      dispatch(vaciarCarrito());
      setPaymentMessage('¡Stock actualizado y compra finalizada!');
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
        className={`fixed top-0 right-0 h-full w-full md:w-80 bg-white text-gray-800 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg z-50 flex flex-col`}
      >
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          X
        </button>
        <div className={`p-4 flex-1 ${isCartDisabled ? 'pointer-events-none opacity-50' : ''}`}>
          <h2 className="text-lg font-bold mb-4">Carrito</h2>
          {productos.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <div>
              <ul className="space-y-4">
                {productos.map((producto) => (
                  <li key={producto.id} className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-16 h-16 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                      <p className="text-gray-600">Precio: ${producto.precio}</p>
                      <div className="flex items-center">
                        <label htmlFor={`cantidad-${producto.id}`} className="text-gray-600 mr-2">
                          Cantidad:
                        </label>
                        <input
                          type="number"
                          id={`cantidad-${producto.id}`}
                          value={producto.cantidad}
                          min="1"
                          onChange={(e) => {
                            handleCantidadChange(producto.id, Number(e.target.value));
                            handleQuantityChange(producto.id, Number(e.target.value));
                          }}
                          className="w-20 p-1 border rounded"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className={`text-red-600 hover:underline ${isCartDisabled ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${calcularTotal().toFixed(2)}</h3>

                <div className="mt-4">
                  <label htmlFor="tipo-entrega" className="text-gray-600 mr-2">
                    Tipo de Entrega:
                  </label>
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

                {entregaSeleccionada === 'domicilio' && (
                  <div className="mt-4">
                    <label htmlFor="direccion" className="text-gray-600">Dirección:</label>
                    <input
                      type="text"
                      id="direccion"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                    <label htmlFor="ciudad" className="text-gray-600 mt-2">Ciudad:</label>
                    <input
                      type="text"
                      id="ciudad"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                    <label htmlFor="codigo-postal" className="text-gray-600 mt-2">Código Postal:</label>
                    <input
                      type="text"
                      id="codigo-postal"
                      value={codigoPostal}
                      onChange={(e) => setCodigoPostal(e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                )}

                {entregaSeleccionada === 'retiro' && (
                  <div className="mt-4">
                    <label htmlFor="nombre" className="text-gray-600">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                    <label htmlFor="documento" className="text-gray-600 mt-2">Documento de Identidad:</label>
                    <input
                      type="text"
                      id="documento"
                      value={documentoIdentidad}
                      onChange={(e) => setDocumentoIdentidad(e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                )}

                <button
                  onClick={handleComprar}
                  className={`mt-4 p-2 bg-blue-500 text-white rounded ${isCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Comprar
                </button>
              </div>
            </div>
          )}

          {showPaymentMessage && (
            <p className="mt-4 text-green-500">{paymentMessage}</p>
          )}
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
<StripeCheckout totalAmount={totalAmount} onSuccess={handleSuccess} onError={handleError} />
        </div>
      )}
    </>
  );
};

export default CarritoPanel;

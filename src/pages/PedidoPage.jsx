import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PedidoPage = () => {
  const { id } = useParams(); // Obtiene el ID del pedido de la URL
  const [pedido, setPedido] = useState(null);
  const [datosRetiro, setDatosRetiro] = useState({ nombre: '', documento: '' });
  const [datosDomicilio, setDatosDomicilio] = useState({ direccion: '', ciudad: '', codigoPostal: '' });
  const [formularioCompletado, setFormularioCompletado] = useState(false); // Para saber si el usuario completó los datos
  const navigate = useNavigate(); // Para redirigir al usuario al inicio

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pedidos/${id}`);
        console.log('Datos del pedido:', response.data); // Ver la estructura de los datos
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
      }
    };

    fetchPedido();
  }, [id]);

  const handleRetiroChange = (e) => {
    setDatosRetiro({ ...datosRetiro, [e.target.name]: e.target.value });
  };

  const handleDomicilioChange = (e) => {
    setDatosDomicilio({ ...datosDomicilio, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica para procesar los datos según el tipo de entrega
    if (pedido.tipo_entrega === 'retiro') {
      // Validar datos de retiro
      if (datosRetiro.nombre && datosRetiro.documento) {
        console.log('Datos de Retiro:', datosRetiro);
        setFormularioCompletado(true);
        navigate('/'); // Redirigir al inicio
      } else {
        alert('Por favor, completa los datos de la persona que retira.');
      }
    } else if (pedido.tipo_entrega === 'domicilio') {
      // Validar datos de domicilio
      if (datosDomicilio.direccion && datosDomicilio.ciudad && datosDomicilio.codigoPostal) {
        console.log('Datos de Domicilio:', datosDomicilio);
        setFormularioCompletado(true);
        navigate('/'); // Redirigir al inicio
      } else {
        alert('Por favor, completa los datos de envío.');
      }
    }
  };

  if (!pedido) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Detalles del Pedido</h1>
      <p className="mb-4"><strong>ID del Pedido:</strong> {pedido.id}</p>
      <p className="mb-4"><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
      <p className="mb-4"><strong>Total:</strong> ${pedido.total}</p>
      <p className="mb-4"><strong>Tipo de Entrega:</strong> {pedido.tipo_entrega}</p>
      <p className="mb-4"><strong>Estado:</strong> {pedido.estado}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Productos</h2>
      <ul className="space-y-4">
        {pedido.productos && Array.isArray(pedido.productos) && pedido.productos.length > 0 ? (
          pedido.productos.map((producto) => (
            <li key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-16 h-16 object-cover rounded-lg mb-2"
              />
              <p className="font-semibold">Nombre: {producto.nombre}</p>
              <p>Descripción: {producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Cantidad: {producto.Pedido_Producto.cantidad}</p>
              <p>Categoría: {producto.categoria}</p>
            </li>
          ))
        ) : (
          <p>No hay productos en este pedido</p>
        )}
      </ul>

      {/* Formulario condicional según el tipo de entrega */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Datos para Completar la Compra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {pedido.tipo_entrega === 'retiro' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la persona que retira:</label>
              <input
                type="text"
                name="nombre"
                value={datosRetiro.nombre}
                onChange={handleRetiroChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Documento de identidad:</label>
              <input
                type="text"
                name="documento"
                value={datosRetiro.documento}
                onChange={handleRetiroChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección de envío:</label>
              <input
                type="text"
                name="direccion"
                value={datosDomicilio.direccion}
                onChange={handleDomicilioChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ciudad:</label>
              <input
                type="text"
                name="ciudad"
                value={datosDomicilio.ciudad}
                onChange={handleDomicilioChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Código Postal:</label>
              <input
                type="text"
                name="codigoPostal"
                value={datosDomicilio.codigoPostal}
                onChange={handleDomicilioChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
};

export default PedidoPage;

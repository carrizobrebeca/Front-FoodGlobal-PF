import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PedidoDetalles = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedidoDetalles = async () => {
      try {
        const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/pedidos/${id}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    };

    fetchPedidoDetalles();
  }, [id]);

  if (!pedido) {
    return <div className="text-center py-4">Cargando detalles del pedido...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Detalles del Pedido ID: {pedido.id}</h1>
      <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
      <p><strong>Total:</strong> ${pedido.total}</p>
      <p><strong>Tipo de Entrega:</strong> {pedido.tipo_entrega}</p>
      <p><strong>Estado:</strong> {pedido.estado}</p>
      <p><strong>Nombre:</strong> {pedido.nombre}</p>
      <p><strong>Documento de Identidad:</strong> {pedido.documento_identidad}</p>

      <h2 className="text-xl font-semibold mt-6">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedido.productos && Array.isArray(pedido.productos) && pedido.productos.length > 0 ? (
          pedido.productos.map((producto) => (
            <div key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-semibold">{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Cantidad:</strong> {producto.Pedido_Producto.cantidad}</p>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
            </div>
          ))
        ) : (
          <p>No hay productos en este pedido.</p>
        )}
      </div>
    </div>
  );
};

export default PedidoDetalles;

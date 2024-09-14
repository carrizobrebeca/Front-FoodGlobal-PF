import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PedidoPage = () => {
  const { id } = useParams(); // Obtiene el ID del pedido de la URL
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pedidos/${id}`);
        console.log('Datos del pedido:', response.data); // Añade esto para ver la estructura de los datos
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
      }
    };
  
    fetchPedido();
  }, [id]);

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
            <li key={producto.producto_id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="font-semibold">Producto ID: {producto.producto_id}</p>
              <p>Cantidad: {producto.cantidad}</p>
            </li>
          ))
        ) : (
          <p>No hay productos en este pedido</p>
        )}
      </ul>
    </div>
  );
};

export default PedidoPage;

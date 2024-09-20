import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MisPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [negocios, setNegocios] = useState({});
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // Para el modal
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad del modal
  const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);


  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        const id = await obtenerUsuarioId();
        console.log('Usuario ID:', id); // Verifica el valor del usuarioId
        setUsuarioId(id);
      } catch (error) {
        console.error('Error al obtener el usuario_id:', error);
      }
   
    };

    fetchUsuarioId();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      const fetchPedidos = async () => {
        try {
          const response = await axios.get('https://back-foodglobal-pf.up.railway.app/pedidos');
          const allPedidos = response.data;
      
          // Filtra los pedidos por usuario_id
          const userPedidos = allPedidos.filter(pedido => pedido.usuario_id ===  user.id);
          setPedidos(userPedidos);
      
          // Obtener información del negocio para cada pedido
          const negocioIds = [...new Set(userPedidos.map(pedido => pedido.negocio_id))];
          const negocioRequests = negocioIds.map(id =>
            axios.get(`https://back-foodglobal-pf.up.railway.app/negocios/${id}`)
          );
          const negocioResponses = await Promise.all(negocioRequests);
          const negociosData = negocioResponses.reduce((acc, response) => {
            acc[response.data.id] = response.data;
            return acc;
          }, {});
          setNegocios(negociosData);
        } catch (error) {
          console.error('Error al obtener los pedidos o negocios:', error);
        }
      };

      fetchPedidos();
    }
  }, [usuarioId]);

  const mostrarDetallesPedido = async (pedidoId) => {
    try {
      const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/pedidos/${pedidoId}`);
      setPedidoSeleccionado(response.data);
      setModalVisible(true); // Abre el modal
    } catch (error) {
      console.error('Error al obtener el detalle del pedido:', error);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setPedidoSeleccionado(null);
  };

  if (!pedidos.length) {
    return <div className="text-center py-4 text-gray-700">No hay pedidos para mostrar</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Mis Pedidos</h1>
      {pedidos.map((pedido) => {
        const negocio = negocios[pedido.negocio_id];
        return (
          <div
            key={pedido.id}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            {negocio && (
              <div className="flex items-center mb-4">
                <img
                  src={negocio.imagen}
                  alt={negocio.nombre}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{negocio.nombre}</h2>
                  <p className="text-gray-600">{negocio.descripcion}</p>
                </div>
              </div>
            )}
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Pedido {pedido.id}</h2>
            <p className="text-lg font-medium mb-2">
              <span className="font-bold">Fecha:</span> {new Date(pedido.fecha).toLocaleDateString()}
            </p>
            <p className="text-lg font-medium mb-2">
              <span className="font-bold">Total:</span> ${pedido.total}
            </p>
            <p className="text-lg font-medium mb-2">
              <span className="font-bold">Estado:</span> {pedido.estado}
            </p>
            <button
              onClick={() => mostrarDetallesPedido(pedido.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Ver más
            </button>
          </div>
        );
      })}

      {modalVisible && pedidoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={cerrarModal}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">Detalles del Pedido</h2>
            <p><strong>Fecha:</strong> {new Date(pedidoSeleccionado.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${pedidoSeleccionado.total}</p>
            <p><strong>Estado:</strong> {pedidoSeleccionado.estado}</p>
            <h3 className="mt-4 font-semibold text-lg">Productos:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {pedidoSeleccionado.productos.map((producto) => (
                <div key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-24 h-24 object-cover rounded-md mb-2"
                  />
                  <p className="text-lg font-medium text-gray-800">{producto.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {producto.Pedido_Producto.cantidad}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Define aquí la función obtenerUsuarioId
const obtenerUsuarioId = async () => {
  // Implementa aquí la lógica para obtener el usuario_id, por ejemplo, desde un contexto o almacenamiento local
  return localStorage.getItem('usuario_id'); // Obtener el ID del usuario desde localStorage
};

export default MisPedidosPage;

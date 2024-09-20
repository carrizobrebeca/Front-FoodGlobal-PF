import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import  { fetchPedidos } from '../../store/pedidoSlice';

const PedidosSocio = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [allNegocios, setAllNegocios] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [negocioId, setNegocioId] = useState("");
    
    // Obtener datos del usuario desde el estado de Redux
    const user = useSelector((state) => state.login.user);
  
    const fetchNegocios = async () => {
      try {
        setLoading(true);
        setError(null); // Resetear el error
        const response = await axios.get("https://back-foodglobal-pf.up.railway.app/negocios");
        const negocios = response.data;
  
        // Filtrar negocios que pertenecen al usuario
        const userNegocios = negocios.filter(
          (negocio) => negocio.usuario_id === user.id
        );
  
        setAllNegocios(userNegocios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNegocios();
    }, [user]);
  
     
    // "id": "dca0e8ee-cc07-482f-b9b3-81de13388b5e",
    // "usuario_id": "78afa4a3-ed0d-42c2-b544-64120d88b5ee",
    // "fecha": "2024-09-15T22:20:24.117Z",
    // "total": "300",
    // "tipo_entrega": "retiro",
    // "estado":
    useEffect(() => {
      const fetchPedido = async () => {
        // if (negocioId) {
          try {
            const response = await axios.get(
              `https://back-foodglobal-pf.up.railway.app/pedidos`
            );
            const pedidosData = response.data;
            const filtered = pedidosData.filter(
              (pedido) => pedido.negocio_id === negocioId
            );
            setPedidos(pedidosData);
  
       
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          // }
        }
      };
  
      fetchPedido();
    }, [negocioId]);
    
  
   
    const handleEditEstado = async (id) => {
      const pedidoToUpdate = pedidos.find((pedido) => pedido.id === id);
      if (pedidoToUpdate.estado === "pendiente") {
        const updatedPedidoData = { estado: "en proceso" };
        try {
          await dispatch(fetchPedidos({ id, estado: updatedPedidoData }));
          alert("Pedido actualizado con éxito");
          fetchPedidos(); // Refresh the product list
        } catch (error) {
          console.error("Error al editar el pediod:", error);
          alert("Error al editar el pedido");
        }
      }
     
  
      
    };

    const getStockColorClass = (estado) => {
      if (estado === "en proceso") return "text-blue-500";
      if (estado === "pendiente") return "text-orange-500";
      if (estado === "cancelado") return "text-red-500";
      return "text-green-500"; // stock <= 50
    };
  
    return (
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />
        {/* grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8 */}
        <section className="">
          <form>
            <div className="flex justify-around p-10 bg-gray-200 text-blue-500 font-bold rounded-lg mt-10">Pedidos</div>
            <div className="p-10 bg-gray-200 rounded-lg mt-0">
              <div className="grid grid-cols-5 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
                <button className="col-span-1 cursor-pointer text-orange-500 font-bold">
                  Pendiente
                </button>
                <button className="col-span-1 cursor-pointer text-blue-500 font-bold">
                  En proceso
                </button>
                <button className="col-span-1 cursor-pointer text-green-500 font-bold">
                  Entregado
                </button>
                <button className="col-span-1 cursor-pointer text-red-500 font-bold">
                  Cancelado
                </button>
                {/* <select
                    onChange={handleChange}
                    value={negocioId}
                    name="negocio_id"
                    id="negocio_id"
                    className="col-span-1 border-2 border-blue-500 rounded-md"
                  >
                    <option value="">Seleccione negocio</option>
                    {allNegocios.map((negocio) => (
                      <option key={negocio.id} value={negocio.id}>
                        {negocio.nombre}
                      </option>
                    ))}
                  </select> */}
              </div>

              <div className="grid grid-cols-6 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
                <button className="col-span-1 cursor-pointer">Código</button>
                <button className="col-span-1 cursor-pointer">Fecha</button>
                <button className="col-span-1 cursor-pointer">
                  Tipo de entrega
                </button>
                <button className="col-span-1 cursor-pointer">Monto</button>
                <button className="col-span-1 cursor-pointer">Estado</button>
                <button className="col-span-1 cursor-pointer"></button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {pedidos.length > 0 ? (
                  pedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="grid grid-cols-6 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100"
                    >
                      <h2 className="m-0 flex items-center justify-center col-span-1">
                        {pedido.usuario_id}
                      </h2>

                      <h2 className="m-0 flex items-center justify-center col-span-1">
                        {pedido.fecha}
                      </h2>

                      <h2 className="m-0 flex items-center justify-center col-span-1">
                        {pedido.tipo_entrega}
                      </h2>
                      <h2 className="m-0 flex items-center justify-center col-span-1">
                        ${pedido.total}
                      </h2>
                      <h2
                        className={`m-0 flex items-center justify-center col-span-1 ${getStockColorClass(
                          pedido.estado
                        )}`}
                      >
                        {pedido.estado}
                      </h2>

                  
                    </div>
                  ))
                ) : (
                  <p className="text-blue-500">No se encontraron pedidos.</p>
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default PedidosSocio;

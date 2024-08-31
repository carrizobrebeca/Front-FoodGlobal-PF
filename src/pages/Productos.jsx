import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNegocios } from '../store/negociosSlice';
import { fetchProductosPorNegocio } from '../store/productosSlice';
import CardProducto from '../components/CardProducto';
import Carrito from '../components/Carrito';
import CardDetail from '../components/CarDetail';
import comidaRapidaImg from '../assets/images/fastfood.png';
import restaurantesImg from '../assets/images/restaurantes.png';
import supermercadosImg from '../assets/images/supermercado.png';
import kioscosImg from '../assets/images/Kioscos.png';

const categoriaImagens = {
  comida: comidaRapidaImg,
  restaurantes: restaurantesImg,
  supermercados: supermercadosImg,
  kioscos: kioscosImg,
};

const categorias = {
  "Supermercado": "supermercados",
  "Kioscos": "kioscos",
  "Restaurantes": "restaurantes",
  "Comida Rápida": "comida"
};

const Productos = () => {
  const dispatch = useDispatch();
  const negocios = useSelector((state) => state.negocios.items || []);
  const productos = useSelector((state) => state.productos.items || []);
  const status = useSelector((state) => state.productos.status);
  const error = useSelector((state) => state.productos.error);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  useEffect(() => {
    if (categoriaSeleccionada) {
      dispatch(fetchNegocios(categoriaSeleccionada));
    }
  }, [dispatch, categoriaSeleccionada]);

  useEffect(() => {
    if (negocioSeleccionado) {
      dispatch(fetchProductosPorNegocio(negocioSeleccionado.id));
    }
  }, [dispatch, negocioSeleccionado]);

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNegocioSeleccionado(null);
  };

  const handleNegocioClick = (negocio) => {
    setNegocioSeleccionado(negocio);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(p => p.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      }
      return [...prevCarrito, producto];
    });
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productoId));
  };

  const totalCarrito = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarDetalle(true);
  };

  const handleCloseModal = () => {
    setMostrarDetalle(false);
    setProductoSeleccionado(null);
  };

  // Filtra negocios por categoría
  const negociosFiltrados = negocios.filter(negocio =>
    categorias[negocio.descripcion] === categoriaSeleccionada
  );

  return (
    <div className="p-8 bg-white">
      {/* Filtros de Categorías */}
      <section className="mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-4">
            {Object.keys(categoriaImagens).map((categoria) => (
              <button
                key={categoria}
                onClick={() => handleCategoriaClick(categoria)}
                className={`flex items-center justify-center border rounded-lg ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition duration-300`}
                style={{
                  flex: '1 0 22%',
                  maxWidth: 'calc(25% - 1rem)',
                  height: 'auto'
                }}
              >
                <img
                  src={categoriaImagens[categoria]}
                  alt={categoria}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Negocios */}
      {categoriaSeleccionada && (
        <section className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Negocios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {negociosFiltrados.map((negocio) => (
                <div key={negocio.id} className="p-4 border rounded-lg cursor-pointer" onClick={() => handleNegocioClick(negocio)}>
                  <h3 className="text-lg font-semibold">{negocio.nombre}</h3>
                  <p>{negocio.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lista de Productos */}
      {negocioSeleccionado && (
        <section className="productos mb-8">
          <h2 className="text-2xl font-semibold mb-4">Productos de {negocioSeleccionado.nombre}</h2>
          {status === 'loading' && <p>Cargando productos...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
              {productos.map((producto) => (
                <CardProducto
                  key={producto.id}
                  producto={producto}
                  onOpenModal={handleOpenModal}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Carrito de Compras */}
      <Carrito
        productos={carrito}
        total={totalCarrito}
        onQuitarDelCarrito={quitarDelCarrito}
      />

      {/* Modal de Detalles */}
      {mostrarDetalle && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <CardDetail
              producto={productoSeleccionado}
              onAgregarAlCarrito={agregarAlCarrito}
              onClose={handleCloseModal} // Asegúrate de usar onClose aquí
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;

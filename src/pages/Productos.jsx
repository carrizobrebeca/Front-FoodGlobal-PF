import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../store/productosSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/images/promo1.png';
import image2 from '../assets/images/promo2.png';
import image3 from '../assets/images/promo3.png';
import CardProducto from '../components/CardProducto';
import CardDetail from '../components/CarDetail'; // Asegúrate de importar el componente del detalle
import comidaRapidaImg from '../assets/images/fastfood.png';
import restaurantesImg from '../assets/images/restaurantes.png';
import supermercadosImg from '../assets/images/supermercado.png';
import kioscosImg from '../assets/images/Kioscos.png';

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.items || []);
  const status = useSelector((state) => state.productos.status);
  const error = useSelector((state) => state.productos.error);
  const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 12;
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar el modal

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductos());
    }
  }, [dispatch, status]);

  const filtrarProductos = () => {
    return productos
      .filter(producto =>
        categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true
      )
      .filter(producto =>
        busqueda ? producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true
      );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const productosAmostar = filtrarProductos()
    .slice((currentPage - 1) * productosPorPagina, currentPage * productosPorPagina);

  const totalPages = Math.ceil(filtrarProductos().length / productosPorPagina);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const promociones = [
    { image: image1, alt: 'Promo 1' },
    { image: image2, alt: 'Promo 2' },
    { image: image3, alt: 'Promo 3' },
  ];

  const categoriaImagens = {
    'Comida Rapida': comidaRapidaImg,
    'Restaurantes': restaurantesImg,
    'Supermercados': supermercadosImg,
    'Kioscos': kioscosImg,
  };

  const openModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
  };

  return (
    <>
     
      <div className="p-8 bg-white">
        {/* Filtros */}
        <section className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Filtros</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Buscar productos..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Categoría</label>
              <div className="flex flex-wrap gap-4">
                {Object.keys(categoriaImagens).map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className={`p-4 border rounded-lg flex-1 ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition duration-300`}
                    style={{ flexBasis: 'calc(25% - 1rem)' }} // Asegura que los botones se alineen correctamente
                  >
                    <img
                      src={categoriaImagens[categoria]}  // Usar imágenes mapeadas aquí
                      alt={categoria}
                      className="w-[438px] h-[132px] mb-2 mx-auto object-cover"  // Establecer dimensiones específicas
                    />
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Productos */}
        <section className="productos mb-8">
          {status === 'loading' && <p>Cargando productos...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                {productosAmostar.map((producto) => (
                  <CardProducto
                    key={producto.id}
                    producto={producto}
                    onOpenModal={() => openModal(producto)}
                  />
                ))}
              </div>
              {/* Controles de Paginación */}
              <div className="flex flex-col items-center mb-4">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300"
                  >
                    Siguiente
                  </button>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`py-2 px-4 rounded border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Slider de Promociones */}
        <section className="promotions-slider mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mejores Promociones</h2>
          <Slider {...sliderSettings}>
            {promociones.map((promo, index) => (
              <div key={index}>
                <img src={promo.image} alt={promo.alt} className="w-full h-64 object-cover rounded-lg" />
              </div>
            ))}
          </Slider>
        </section>

        {/* Modal de Detalle */}
        {mostrarModal && productoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <CardDetail producto={productoSeleccionado} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productos;

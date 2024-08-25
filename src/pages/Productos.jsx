import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../store/productosSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/images/promo1.png';
import image2 from '../assets/images/promo2.png';
import image3 from '../assets/images/promo3.png';

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.items);
  const status = useSelector((state) => state.productos.status);
  const error = useSelector((state) => state.productos.error);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [supermercadoSeleccionado, setSupermercadoSeleccionado] = useState('');

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
        supermercadoSeleccionado ? producto.supermercado === supermercadoSeleccionado : true
      )
      .filter(producto =>
        busqueda ? producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true
      );
  };

  const categoriesOptions = [
    { name: 'Comida Rápida', image: 'url-to-image-1', link: '/categoria/fast-food' },
    { name: 'Supermercados', image: 'url-to-image-2', link: '#', isSupermercado: true },
    { name: 'Restaurantes', image: 'url-to-image-3', link: '/categoria/restaurantes' },
    { name: 'Kioscos', image: 'url-to-image-4', link: '/categoria/kioscos' },
  ];

  const supermercadosOptions = [
    { name: 'Super1' },
    // Agrega más supermercados si es necesario
  ];

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

  return (
    <>
      <Navbar />
      <div className="p-8 bg-white">
        {/* Filtros */}
        <section className="filter-section mb-8">
          <div className="filter-container bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Filtros</h2>
            <div className="filter-group mb-4">
              <label className="block text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Buscar productos..."
              />
            </div>
          </div>
        </section>

        {/* Opciones de Categorías */}
        <section className="categories-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categoriesOptions.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                setCategoriaSeleccionada(category.name);
                if (category.isSupermercado) {
                  setSupermercadoSeleccionado('');
                }
              }}
              className="relative h-48 flex items-center justify-center bg-center bg-cover text-white text-2xl font-bold rounded-lg shadow-md cursor-pointer"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className="bg-black bg-opacity-50 p-4 rounded">{category.name}</div>
            </div>
          ))}
        </section>

        {/* Opciones de Supermercados */}
        {categoriaSeleccionada === 'Supermercados' && (
          <section className="supermercados-section mb-8">
            <h2 className="text-2xl font-semibold mb-4">Supermercados</h2>
            <div className="supermercados-options grid grid-cols-1 md:grid-cols-2 gap-6">
              {supermercadosOptions.map((supermercado, index) => (
                <button
                  key={index}
                  onClick={() => setSupermercadoSeleccionado(supermercado.name)}
                  className="bg-white p-4 rounded-lg shadow-md text-center"
                >
                  {supermercado.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Lista de Productos */}
        <section className="productos mb-8">
          {status === 'loading' && <p>Cargando productos...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && (
            filtrarProductos().length > 0 ? (
              filtrarProductos().map((producto) => (
                <div key={producto.id} className="producto-card mb-4 p-4 border rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{producto.nombre}</h3>
                  <Link to={`/productos/${producto.id}`}>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300">
                      Ver Detalles
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No hay productos para mostrar</p>
            )
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
      </div>
    </>
  );
};

export default Productos;

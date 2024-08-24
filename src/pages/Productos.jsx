import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get('/api/productos'); // Endpoint para obtener productos
        const categoriasResponse = await axios.get('/api/categorias'); // Endpoint para obtener categorías
        setProductos(productosResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error al cargar los productos o categorías:', error);
      }
    };

    fetchData();
  }, []);

  const filtrarProductos = () => {
    return productos
      .filter(producto =>
        categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true
      )
      .filter(producto =>
        busqueda ? producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true
      );
  };

  return (
    <>
    <Navbar/>
    <div className="p-8 bg-gray-100">
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
          <div className="filter-group">
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="products-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrarProductos().map(producto => (
          <Link to={`/productos/${producto.id}`} key={producto.id} className="product-card bg-white p-6 rounded-lg shadow-md">
            <img src={producto.imagenUrl} alt={producto.nombre} className="w-full h-48 object-cover rounded-t-lg mb-4"/>
            <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
            <p className="text-gray-700 mb-4">{producto.descripcion}</p>
            <p className="text-lg font-bold mb-4">${producto.precio}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300">Ver Detalles</button>
          </Link>
        ))}
      </section>
    </div>
    </>
  );
};

export default Productos;

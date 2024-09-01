import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailModal from './ProductDetailModal';

const NegocioProductos = ({ negocioId }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null); // Resetear el error
        const response = await axios.get(`http://localhost:3001/negocios/${negocioId}/productos`);
        setProductos(response.data);
        setFilteredProductos(response.data); // Inicialmente, todos los productos están filtrados
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [negocioId]);

  useEffect(() => {
    // Filtrar productos según los criterios
    const applyFilters = () => {
      let filtered = productos;

      if (searchTerm) {
        filtered = filtered.filter(producto =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(producto =>
          producto.categoria === selectedCategory
        );
      }

      filtered = filtered.filter(producto =>
        producto.precio >= minPrice && producto.precio <= maxPrice
      );

      setFilteredProductos(filtered);
    };

    applyFilters();
  }, [searchTerm, selectedCategory, minPrice, maxPrice, productos]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-8 bg-gray-100">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Filtros */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filtrar Productos</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="searchTerm" className="text-sm font-medium mb-2">Buscar por nombre</label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="category" className="text-sm font-medium mb-2">Categoría</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Todas</option>
              <option value="Frutas">Frutas</option>
              <option value="Verduras">Verduras</option>
              {/* Agrega más categorías según sea necesario */}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium mb-2">Precio</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <div key={producto.id} className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover mb-2 rounded-lg" />
              <h2 className="text-lg font-semibold">{producto.nombre}</h2>
              <p className="text-gray-600">Precio: ${producto.precio}</p>
              <button
                onClick={() => handleViewDetails(producto)}
                className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Ver Detalles
              </button>
              <button
                onClick={() => {/* Lógica para agregar al carrito */}}
                className="mt-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Agregar al Carrito
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NegocioProductos;

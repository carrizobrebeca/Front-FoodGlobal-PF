import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailModal from './ProductDetailModal';

const NegocioProductos = ({ negocioId, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({}); // To keep track of quantities

  useEffect(() => {
    const fetchProductos = async () => {
      if (!negocioId) return;

      try {
        setLoading(true);
        setError(null); // Resetear el error
        const response = await axios.get(`http://localhost:3001/negocios/${negocioId}/productos`);
        const productosData = response.data;
        setProductos(productosData);

        // Extraer categorías únicas de los productos
        const categorias = [...new Set(productosData.map(producto => producto.categoria))];
        setCategories(categorias);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [negocioId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleQuantityChange = (id, value) => {
    setProductQuantities(prev => ({
      ...prev,
      [id]: Math.min(value, productos.find(p => p.id === id).stock) // Limit quantity by stock
    }));
  };

  const handleAddToCart = (producto) => {
    // Obtiene la cantidad actual del producto
    const cantidad = productQuantities[producto.id] || 1;
    
    // Agrega el producto al carrito con la cantidad actual
    agregarAlCarrito({ ...producto, cantidad });

    // Resetear la cantidad después de agregar
    setProductQuantities(prev => ({ ...prev, [producto.id]: 1 }));
  };

  const filteredProductos = productos.filter((producto) => {
    const isInCategory = selectedCategory ? producto.categoria === selectedCategory : true;
    const isInPriceRange = (
      (minPrice === '' || producto.precio >= Number(minPrice)) &&
      (maxPrice === '' || producto.precio <= Number(maxPrice))
    );
    return (
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isInCategory &&
      isInPriceRange
    );
  });

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-200">
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="category" className="text-sm font-medium mb-2">Categoría</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Todas las categorías</option>
            {categories.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="minPrice" className="text-sm font-medium mb-2">Precio Mínimo</label>
          <input
            id="minPrice"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="maxPrice" className="text-sm font-medium mb-2">Precio Máximo</label>
          <input
            id="maxPrice"
            type="number"
            placeholder="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <button
          onClick={handleResetFilters}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Resetear Filtros
        </button>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <div key={producto.id} className="p-4 border rounded-lg shadow-md bg-white">
              <div className="relative w-full h-48">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
              <p className="text-gray-600 mb-2">Precio: ${producto.precio}</p>
              <p className="text-gray-600 mb-2">Stock: {producto.stock}</p>
              <div className="mb-4 flex items-center gap-2">
                <label htmlFor={`cantidad-${producto.id}`} className="text-sm font-medium">Cantidad:</label>
                <input
                  id={`cantidad-${producto.id}`}
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={productQuantities[producto.id] || 1}
                  onChange={(e) => handleQuantityChange(producto.id, Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleViewDetails(producto)}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Ver Detalles
              </button>
              <button
                onClick={() => handleAddToCart(producto)}
                className="mt-2 p-2 bg-green-500 text-white rounded"
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
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          agregarAlCarrito={agregarAlCarrito}
        />
      )}
    </div>
  );
};

export default NegocioProductos;

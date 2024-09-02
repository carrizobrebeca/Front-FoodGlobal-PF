import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailModal from './ProductDetailModal';
import CarritoPanel from './CarritoPanel';
import { useDispatch, useSelector } from 'react-redux';
import { agregarProducto } from '../store/carritoSlice'; // Actualiza la ruta y el nombre

const NegocioProductos = ({ negocioId }) => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);

  const dispatch = useDispatch();
  const carritoProductos = useSelector(state => state.carrito.productos); // Obtener productos del carrito desde Redux

  useEffect(() => {
    const fetchProductos = async () => {
      if (!negocioId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/negocios/${negocioId}/productos`);
        const productosData = response.data;

        // Comprobar que todos los productos tienen la propiedad precio
        productosData.forEach(producto => {
          if (!producto.precio) {
            console.error('Producto sin precio:', producto);
          }
        });

        setProductos(productosData);

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
      [id]: Math.min(value, productos.find(p => p.id === id)?.stock || 0)
    }));
  };

  const handleAddToCart = (producto) => {
    if (!producto || typeof producto.precio === 'undefined') {
      console.error('Producto inválido:', producto);
      return;
    }
  
    const cantidad = productQuantities[producto.id] || 1;
    console.log('Agregando al carrito:', { ...producto, cantidad });
  
    dispatch(agregarProducto({ ...producto, cantidad }));
    setIsCarritoOpen(true); // Asegúrate de que esta línea se ejecuta
    setProductQuantities(prev => ({ ...prev, [producto.id]: 1 }));
  };

  const filteredProductos = productos.filter((producto) => {
    console.log('Producto:', producto); // Agrega este log para verificar los productos
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

  const toggleCarritoPanel = () => {
    setIsCarritoOpen(prev => !prev);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
        />
        <button
          onClick={toggleCarritoPanel}
          className="p-2 bg-green-500 text-white rounded ml-4"
        >
          Carrito
        </button>
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
        {filteredProductos.map((producto) => (
          <div key={producto.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
            <p className="text-gray-700 mb-2">{producto.descripcion}</p>
            <p className="text-xl font-bold mb-4">${producto.precio}</p>
            <input
              type="number"
              min="1"
              value={productQuantities[producto.id] || 1}
              onChange={(e) => handleQuantityChange(producto.id, e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            />
            <button
              onClick={() => handleAddToCart(producto)}
              className="p-2 bg-blue-500 text-white rounded w-full"
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => handleViewDetails(producto)}
              className="p-2 bg-gray-500 text-white rounded w-full mt-2"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          agregarAlCarrito={handleAddToCart}
        />
      )}
      {/* Panel de carrito */}
      {isCarritoOpen && <CarritoPanel   productos={carritoProductos} onClose={toggleCarritoPanel} isOpen={isCarritoOpen} />}
    </div>
  );
};

export default NegocioProductos;

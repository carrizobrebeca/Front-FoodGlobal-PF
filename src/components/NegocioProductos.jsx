import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailModal from './ProductDetailModal';
import CarritoPanel from './CarritoPanel';
import { useDispatch, useSelector } from 'react-redux';
import { agregarProducto } from '../store/carritoSlice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const NegocioProductos = ({ negocioId }) => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);

  const dispatch = useDispatch();
  const carritoProductos = useSelector(state => state.carrito.productos);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!negocioId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/negocios/${negocioId}/productos`);
        setProductos(response.data);
        const categorias = [...new Set(response.data.map(producto => producto.categoria))];
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

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100]);
    setSelectedCategory('');
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleQuantityChange = (id, value) => {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
      const cantidad = Math.min(value, producto.stock);
      setProductQuantities(prev => ({
        ...prev,
        [id]: cantidad
      }));
    }
  };

  const handleAddToCart = (producto, cantidad = 1) => {
    if (!producto || typeof producto.precio === 'undefined') {
      console.error('Producto inválido:', producto);
      return;
    }
  
    const cantidadFinal = Math.min(cantidad, producto.stock);
  
    if (cantidadFinal > 0) {
      dispatch(agregarProducto({ ...producto, cantidad: cantidadFinal }));
      setIsCarritoOpen(true);
      setProductQuantities(prev => ({ ...prev, [producto.id]: cantidadFinal }));
      setProductos(prevProductos =>
        prevProductos.map(prod => (prod.id === producto.id ? { ...prod, stock: prod.stock - cantidadFinal } : prod))
      );
    } else {
      console.error('Cantidad no válida para agregar al carrito.');
    }
  };

  const [minPrice, maxPrice] = priceRange;

  const filteredProductos = productos.filter(producto => {
    const isInCategory = selectedCategory ? producto.categoria === selectedCategory : true;
    const isInPriceRange = (minPrice === '' || producto.precio >= minPrice) && (maxPrice === '' || producto.precio <= maxPrice);
    return producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && isInCategory && isInPriceRange;
  });

  const toggleCarritoPanel = () => {
    setIsCarritoOpen(prev => !prev);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 flex">
      {/* Filtros a la izquierda */}
      <div className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg shadow-sm mb-4 w-full"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm mb-4 w-full"
        >
          <option value="">Todas las categorías</option>
          {categories.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        <div className="mb-4">
          <p>Rango de precios: ${priceRange[0]} - ${priceRange[1]}</p>
          <Slider
            range
            min={0}
            max={100}
            step={1}
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="w-full"
          />
        </div>
        <button
          onClick={handleResetFilters}
          className="p-2 bg-red-500 text-white rounded-lg shadow-lg w-full"
        >
          Resetear filtros
        </button>
      </div>

      {/* Productos en cuadrícula */}
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProductos.map((producto) => (
          <div key={producto.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-between w-full h-auto hover:shadow-2xl transition-shadow duration-300">
            <img src={producto.imagen} alt={producto.nombre} className="w-48 h-48 object-contain mb-4 rounded-lg" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
              <p className="text-gray-500">Precio: <span className="text-gray-700 font-medium">${producto.precio}</span></p>
              <p className="text-gray-500">Stock: <span className={`font-medium ${producto.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{producto.stock}</span></p>
            </div>
            <div className="flex flex-col items-center mt-4 w-full">
              <input
                type="number"
                min="1"
                max={producto.stock}
                value={productQuantities[producto.id] || 1}
                onChange={(e) => handleQuantityChange(producto.id, parseInt(e.target.value, 10))}
                className="border rounded p-2 w-20 mb-2"
              />
              <button
                onClick={() => handleAddToCart(producto, productQuantities[producto.id] || 1)}
                className="p-2 bg-blue-600 text-white rounded-lg w-full font-medium mb-2 hover:bg-blue-700 transition-colors duration-300"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => handleViewDetails(producto)}
                className="p-2 bg-green-500 text-white rounded-lg w-full font-medium hover:bg-green-600 transition-colors duration-300"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles y carrito */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          agregarAlCarrito={handleAddToCart}
        />
      )}
<CarritoPanel
  negocioId={negocioId} // Aquí pasas el negocioId
  productos={carritoProductos}
  onClose={() => setIsCarritoOpen(false)}
  isOpen={isCarritoOpen}
  setProductos={setProductos} // Pass setProductos as a prop
/>
    </div>
  );
};

export default NegocioProductos;

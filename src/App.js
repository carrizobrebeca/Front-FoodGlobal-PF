import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Locales from './pages/Locales';
import Afiliarse from './pages/Afiliarse';
import SobreNosotros from './pages/SobreNosotros';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashBoardAdmin from './pages/DashboardAdmin';
import ProductsConfig from './components/ProductsConfig/ProductsConfig';
import UsersConfig from './components/UsersConfig/UsersConfig';
import CreateProduct from './components/CreateProduct/CreateProduct';
import CreateUser from './components/CreateUser/CreateUser';
import NegociosComponent from './components/NegociosComponent';
import ProductosComponent from './components/ProductosComponent';
import CardDetail from './components/CarDetail'; // Importa el componente CardDetail

const App = () => {
  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para el producto seleccionado

  const handleSelectNegocio = (negocioId) => {
    setSelectedNegocio(negocioId);
  };

  const handleAddToCart = (producto) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === producto.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleOpenDetail = (producto) => {
    setSelectedProducto(producto);
  };

  const handleCloseDetail = () => {
    setSelectedProducto(null);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createusers" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardadmin" element={<DashBoardAdmin />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/products" element={<ProductsConfig />} />
        <Route path="/createproducts" element={<CreateProduct />} />
        <Route path="/users" element={<UsersConfig />} />
        <Route path="/locales" element={<Locales />} />
        <Route path="/afiliarse" element={<Afiliarse />} />
        <Route path="/about" element={<SobreNosotros />} />
        <Route 
          path="/negocios" 
          element={<NegociosComponent handleSelectNegocio={handleSelectNegocio} />} 
        />
        <Route 
          path="/negocios/:id/productos" 
          element={<ProductosComponent negocioId={selectedNegocio} handleAddToCart={handleAddToCart} handleOpenDetail={handleOpenDetail} />} 
        />
      </Routes>
      <Footer />
      {selectedProducto && (
        <CardDetail
          producto={selectedProducto}
          onCerrar={handleCloseDetail}
          onAgregarAlCarrito={handleAddToCart}
        />
      )}
    </Router>
  );
};

export default App;

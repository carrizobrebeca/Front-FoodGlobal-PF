import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Locales from './pages/Locales';
import Afiliarse from './pages/Afiliarse';
import SobreNosotros from './pages/SobreNosotros';
import Register from './pages/Register/Register';
import ProductsConfig from './components/ProductsConfig/ProductsConfig';
import UsersConfig from './components/UsersConfig/UsersConfig';
import DashBoardAdmin from './pages/DashboardAdmin';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardadmin" element={<DashBoardAdmin />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/products" element={<ProductsConfig />} />
        <Route path="/users" element={<UsersConfig />} />
        <Route path="/locales" element={<Locales />} />
        <Route path="/afiliarse" element={<Afiliarse />} />
        <Route path="/about" element={<SobreNosotros />} />
      </Routes>
    </Router>
  );
};

export default App;

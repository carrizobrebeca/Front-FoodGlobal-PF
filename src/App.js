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


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/locales" element={<Locales />} />
        <Route path="/afiliarse" element={<Afiliarse />} />
        <Route path="/about" element={<SobreNosotros />} />
      </Routes>
    </Router>
  );
};

export default App;

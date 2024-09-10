import React, { useState, useEffect } from 'react';
import CategorySelector from '../components/CategorySelector';
import NegocioProductos from '../components/NegocioProductos';

import axios from 'axios';

const NegociosPage = () => {
  const [category, setCategory] = useState('');
  const [allNegocios, setAllNegocios] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setLoading(true);
        setError(null); // Resetear el error
        const response = await axios.get('/negocios');
        setAllNegocios(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocios();
  }, []);

  useEffect(() => {
    if (category) {
      const filteredNegocios = allNegocios.filter((negocio) =>
        negocio.nombre.toLowerCase().includes(category.toLowerCase()) ||
        negocio.descripcion.toLowerCase().includes(category.toLowerCase())
      );
      setNegocios(filteredNegocios);
    } else {
      setNegocios(allNegocios);
    }
  }, [category, allNegocios]);

  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setSelectedNegocio(null); // Resetear el negocio seleccionado
  };

  const handleNegocioClick = (negocioId) => {
    setSelectedNegocio(negocioId);
  };

  const handleCloseProductDetails = () => {
    setSelectedNegocio(null);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(p => p.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(producto => producto.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  if (selectedNegocio) {
    return (
      <div className="p-8 bg-white">
        <button
          onClick={handleCloseProductDetails}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Volver a la Lista de Productos
        </button>
        <NegocioProductos negocioId={selectedNegocio} agregarAlCarrito={agregarAlCarrito} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white">
      {!category && (
        <CategorySelector onSelectCategory={handleSelectCategory} />
      )}

      {category && (
        <>
          <button
            onClick={() => setCategory('')}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Volver a Selección de Categoría
          </button>
          <h1 className="text-2xl font-semibold mb-4">Negocios en {category}</h1>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(negocios) && negocios.length > 0 ? (
  negocios.map((negocio) => (
    <div key={negocio.id} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{negocio.nombre}</h2>
      <p>{negocio.descripcion}</p>
      <img
        src={negocio.imagen || 'https://via.placeholder.com/150'}
        alt={negocio.nombre}
        className="w-full h-32 object-cover mt-2"
      />
      <button
        onClick={() => handleNegocioClick(negocio.id)}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Ver Productos
      </button>
    </div>
  ))
) : (
  <p>No hay negocios para mostrar.</p>
)}
          </div>
        </>
      )}
    </div>
  );
};

export default NegociosPage;

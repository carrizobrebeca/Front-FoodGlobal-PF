import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const RegistroAfiliacion = () => {
  const [nombreLocal, setNombreLocal] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [productos, setProductos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/afiliacion', {
        nombreLocal,
        direccion,
        email,
        productos,
      });
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al registrar el local:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-8 bg-gray-100">
      <section className="registro-intro text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Afíliate con FoodGlobal</h1>
        <p className="text-lg mb-8">
          Únete a nuestra plataforma y empieza a vender tus productos a nivel internacional. Completa el siguiente formulario para registrarte.
        </p>
      </section>

      <section className="registro-form bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-4">Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nombre">Nombre del Local</label>
            <input
              type="text"
              id="nombre"
              value={nombreLocal}
              onChange={(e) => setNombreLocal(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nombre del Local"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Dirección del Local"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="productos">Productos</label>
            <textarea
              id="productos"
              value={productos}
              onChange={(e) => setProductos(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Productos ofrecidos (descripción)"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300">Enviar</button>
        </form>
      </section>
    </div>
    </>
  );
};

export default RegistroAfiliacion;

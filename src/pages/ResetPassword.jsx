import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    const token = new URLSearchParams(window.location.search).get('token');
  
    try {
      await axios.post('https://back-foodglobal-pf.up.railway.app/update-password', { token, nuevaPassword: newPassword });
      alert('Contraseña actualizada exitosamente');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data.error || 'Error al actualizar la contraseña');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 transition-colors duration-300 ease-in">
      <form onSubmit={handleNewPasswordSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transition-transform transform hover:scale-105 ease-in-out duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Restablecer Contraseña</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <label className="block mb-2 text-gray-700 font-medium">Nueva Contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
        <label className="block mb-2 mt-4 text-gray-700 font-medium">Confirmar Contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
        <button
          type="submit"
          className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
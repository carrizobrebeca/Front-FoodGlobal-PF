import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNegocios } from '../store/productosSlice';

const NegociosComponent = ({ handleSelectNegocio }) => {
  const dispatch = useDispatch();
  const negocios = useSelector((state) => state.productos.negocios);
  const status = useSelector((state) => state.productos.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNegocios());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Negocios</h1>
      {negocios.map((negocio) => (
        <div key={negocio.id}>
          <h2>{negocio.nombre}</h2>
          <button onClick={() => handleSelectNegocio(negocio.id)}>
            Ver Productos
          </button>
        </div>
      ))}
    </div>
  );
};

export default NegociosComponent;

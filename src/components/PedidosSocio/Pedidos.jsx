import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PedidosSocio from './PedidosSocio';

const Pedidos = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.login);
  
    useEffect(() => {
      if (user) {
        if (user.rol !== "socio") {
          navigate("/");
        }
      }
    }, [user, navigate]);
  
    return (
      <>
        {user?.rol === "socio" && <PedidosSocio />}
        
      </>
    );
}

export default Pedidos
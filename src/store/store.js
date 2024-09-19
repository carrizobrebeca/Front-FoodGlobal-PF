import { configureStore } from '@reduxjs/toolkit';
import productosReducer from './productosSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
import negociosReducer from './negociosSlice';
import carritoReducer from './carritoSlice'; // Asegúrate de incluir el reducer del carrito
import pedidoSlice from './pedidoSlice';

const store = configureStore({
  reducer: {
    productos: productosReducer,
    register: registerReducer,
    login: loginReducer,
    negocios: negociosReducer,
    carrito: carritoReducer, // Incluye el reducer del carrito aquí
    pediodo: pedidoSlice
  },
});

export default store;

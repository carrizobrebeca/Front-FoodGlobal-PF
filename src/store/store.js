// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productosReducer from './productosSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
import negocioReducer from './negocioSlice'
const store = configureStore({
  reducer: {
    productos: productosReducer,
    register: registerReducer,
    login: loginReducer,
    negocios: negocioReducer,
  },
});

export default store;

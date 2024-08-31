import { configureStore } from '@reduxjs/toolkit';
import productosReducer from './productosSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';

import negociosReducer from './negociosSlice';


const store = configureStore({
  reducer: {
    productos: productosReducer,
    register: registerReducer,
    login: loginReducer,

    negocios: negociosReducer

  },
});

export default store;
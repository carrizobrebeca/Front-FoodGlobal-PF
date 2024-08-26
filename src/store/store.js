// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productosReducer from './productosSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
const store = configureStore({
  reducer: {
    productos: productosReducer,
    register: registerReducer,
    login: loginReducer
  },
});

export default store;

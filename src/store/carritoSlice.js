import { createSlice } from '@reduxjs/toolkit';

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    productos: [],
  },
  reducers: {
    agregarProducto: (state, action) => {
      const producto = action.payload;
      // Verifica si el producto ya está en el carrito
      const productoExistente = state.productos.find(p => p.id === producto.id);
      if (productoExistente) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        productoExistente.cantidad += producto.cantidad;
      } else {
        // Si el producto no está en el carrito, agréguelo
        state.productos.push(producto);
      }
    },
    eliminarProducto: (state, action) => {
      state.productos = state.productos.filter(p => p.id !== action.payload.id);
    },
    vaciarCarrito: (state) => {
      state.productos = [];
    }
  }
});

export const { agregarProducto, eliminarProducto, vaciarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;

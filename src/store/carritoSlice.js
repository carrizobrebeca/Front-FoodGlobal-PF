import { createSlice } from '@reduxjs/toolkit';

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    items: [],
  },
  reducers: {
    agregarAlCarrito(state, action) {
      const producto = action.payload;
      const existente = state.items.find(p => p.id === producto.id);

      if (existente) {
        // Actualizar la cantidad si el producto ya está en el carrito
        existente.cantidad += producto.cantidad;
      } else {
        // Agregar el producto al carrito
        state.items.push(producto);
      }
    },
    quitarDelCarrito(state, action) {
      const id = action.payload;
      state.items = state.items.filter(producto => producto.id !== id);
    },
    actualizarCantidad(state, action) {
      const { id, cantidad } = action.payload;
      const producto = state.items.find(p => p.id === id);
      if (producto) {
        producto.cantidad = cantidad;
      }
    },
  },
});

export const { agregarAlCarrito, quitarDelCarrito, actualizarCantidad } = carritoSlice.actions;
export default carritoSlice.reducer;

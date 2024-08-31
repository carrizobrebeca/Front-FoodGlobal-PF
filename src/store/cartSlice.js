import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.precio;
      } else {
        state.items.push({
          id: newItem.id,
          nombre: newItem.nombre,
          precio: newItem.precio,
          quantity: 1,
          totalPrice: newItem.precio,
        });
      }
      state.totalAmount += newItem.precio;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.precio;
      }
      state.totalAmount -= existingItem.precio;
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;

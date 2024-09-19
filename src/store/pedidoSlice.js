import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPedidos = createAsyncThunk('pedido/fetchPedidos', async ({id, estado }) => {
    const response = await axios.put(`http://localhost:3001/pedidos/{id}`, estado);
    return response.data;
  });
  

  const pedidoSlice = createSlice({
    name: 'pedido',
    initialState: {
      pedidos: [], 
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPedidos.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPedidos.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.allSuper = action.payload; 
          alert('Estado del pedido actualizado exitosamente!');
        })
        .addCase(fetchPedidos.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          alert('Error al actualizar estado del pedido!');
        });
    },
  });
  
  export default pedidoSlice.reducer;
  
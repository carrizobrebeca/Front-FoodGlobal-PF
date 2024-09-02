// src/store/negociosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para obtener todos los negocios
export const fetchNegocios = createAsyncThunk('negocios/fetchNegocios', async (categoria) => {
  const response = await axios.get(`http://localhost:3001/negocios?categoria=${categoria}`);
  return response.data;
});

const negociosSlice = createSlice({
  name: 'negocios',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegocios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNegocios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNegocios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default negociosSlice.reducer;

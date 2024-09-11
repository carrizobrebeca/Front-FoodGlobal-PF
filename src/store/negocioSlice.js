import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Thunk para obtener los negocios
export const fetchNegocios = createAsyncThunk('negocios/fetchNegocios', async () => {
  const response = await axios.get(`${API_URL}/negocios`);
  return response.data;
});

// Slice de Redux
const negocioSlice = createSlice({
  name: 'negocios',
  initialState: {
    allSuper: [], // Asegúrate de que `allSuper` esté definido como un arreglo
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
        state.allSuper = action.payload; // Asegúrate de que `allSuper` se actualice correctamente
      })
      .addCase(fetchNegocios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default negocioSlice.reducer;

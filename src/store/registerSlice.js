import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk('register/registerUser', async (userData) => {
  const response = await axios.post('http://localhost:3001/usuarios', userData);
  return response.data;
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    status: 'idle', // puede ser 'idle', 'loading', 'succeeded', o 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Aquí podrías guardar la información del usuario registrado
        alert("Successfully created User: ", state);
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert("No created User. Error: ", state);
         
      });
  },
});

export default registerSlice.reducer;

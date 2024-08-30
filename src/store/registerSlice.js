import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk('register/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/usuarios', userData);
  return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
  
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
        alert("Successfully created User: ");
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert("Usuario ya registrado con ese email");
         
      });
  },
});

export default registerSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (userData) => {
  const response = await axios.post('http://localhost:3001/login', userData);
  return response.data;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Cargar usuario desde localStorage
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user'); // Limpiar localStorage en logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.usuario; // Asegúrate de que el payload contiene el usuario
        localStorage.setItem('user', JSON.stringify(state.user)); // Guardar usuario en localStorage
        alert("Successfully logged in user: " + JSON.stringify(state.user));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert("Login Error: " + action.error.message);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
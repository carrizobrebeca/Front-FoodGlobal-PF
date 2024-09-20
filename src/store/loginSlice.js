import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Función para manejar el inicio de sesión
export const fetchLogin = createAsyncThunk('login/fetchLogin', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:3001/login`, userData);
    return response.data.user; // Asegúrate de que esto devuelva el usuario correctamente
  } catch (error) {
    // Manejo de errores: Devuelve el error del servidor si la autenticación falla
    return rejectWithValue(error.response?.data || 'Error de autenticación');
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload; // Aquí debería venir el usuario con el `usuario_id`
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Limpiar errores previos
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
        // Puedes manejar la navegación aquí si es necesario
        alert(`Inicio de sesión exitosame`);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Usuario o contraseña incorrecta'; // Usar mensaje de error más específico
        alert(`Usuario o contraseña incorrecta`);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
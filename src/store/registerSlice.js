import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Acción para verificar si el usuario ya existe
export const checkUserExists = createAsyncThunk(
  "register/checkUserExists",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios`);
      const users = response.data;
      const userExists = users.some((user) => user.email === email);
      return userExists;
    } catch (error) {
      return rejectWithValue(error.message || "Error al verificar el usuario");
    }
  }
);

//registrar un nuevo usuario
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // Verifica si el usuario ya existe
      const exists = await dispatch(checkUserExists(userData.email)).unwrap();

      if (exists) {
        return rejectWithValue("Email already in use");
      }

      const response = await axios.post(`http://localhost:3001/usuarios`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || "Error al registrar el usuario"
      );
    }
  }
);
export const editUser = createAsyncThunk(
  "register/editUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/usuarios/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || "Error al modificar el usuario"
      );
    }
  }
);
// eliminar un usuario
export const deleteUser = createAsyncThunk(
  "register/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);



export const fetchUserByEmail = createAsyncThunk(
  "register/fetchUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      // Obtén todos los usuarios
      const response = await axios.get(`http://localhost:3001/usuarios`);
      const users = response.data;

      // Filtra el usuario con el email proporcionado
      const user = users.find((user) => user.email === email);

      if (!user) {
        // Si no se encuentra el usuario, se puede retornar un error
        throw new Error("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Error al buscar el usuario");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    status: "idle", // puede ser 'idle', 'loading', 'succeeded', o 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        alert("Usuario creado con éxito");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        alert("Error al crear usuario");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        alert("Usuario eliminado con éxito");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        alert("Error al eliminar usuario: " + action.payload);
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        alert("Error al buscar usuario");
      })
    
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        alert("Error al editar usuario");
      })
    
  },
});

export default registerSlice.reducer;

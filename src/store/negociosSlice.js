// src/store/negociosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Acción para obtener todos los negocios
export const fetchNegocios = createAsyncThunk(
  "negocios/fetchNegocios",
  async (categoria) => {
    const response = await axios.get(`http://localhost:3001/negocios?categoria=${categoria}`
    );
    return response.data;
  }
);
export const crearNegocio = createAsyncThunk(
  "negocios/crearNegocio",
  async (negocioData) => {
    const response = await axios.post(
      `http://localhost:3001/negocios`,
      negocioData
    );
    return response.data;
  }
);
export const editNegocio = createAsyncThunk(
  "negocios/editNegocio",
  async ({ id, negocioData }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/negocios/${id}`,
        negocioData
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al editar el negocio");
    }
  }
);


const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegocios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNegocios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNegocios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(crearNegocio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(crearNegocio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        alert("Negocio creado con éxito");
      })
      .addCase(crearNegocio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        alert("Error al crear negocio");
      })
      .addCase(editNegocio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editNegocio.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Actualiza el negocio en el estado
        state.items = state.items.map(negocio =>
          negocio.id === action.payload.id ? action.payload : negocio
        );
        alert('Producto editado exitosamente!');
      })
      .addCase(editNegocio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        alert('Error al editar producto!');
      })
    
  },
});

export default negociosSlice.reducer;

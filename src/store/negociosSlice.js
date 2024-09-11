// src/store/negociosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Acción para obtener todos los negocios
export const fetchNegocios = createAsyncThunk(
  "negocios/fetchNegocios",
  async (categoria) => {
    const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/negocios?categoria=${categoria}`
    );
    return response.data;
  }
);
export const crearNegocio = createAsyncThunk(
  "negocios/crearNegocio",
  async (negocioData) => {
    const response = await axios.post(
      `https://back-foodglobal-pf.up.railway.app/negocios`,
      negocioData
    );
    return response.data;
  }
);
export const editNegocio = createAsyncThunk(
  "negocios/editNegocio",
  async ( id, negocioData ) => {
    try {
      const response = await axios.put(
        `https://back-foodglobal-pf.up.railway.app/negocios/${id}`,
        negocioData
      );
      return response.data;
    } catch (error) {
      alert("Error al Editar Negocio")
      
      
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
      .addCase(editNegocio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        alert("Negocio editado con éxito");
      })
      .addCase(editNegocio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        alert("Error al editar negocio");
      })
  },
});

export default negociosSlice.reducer;

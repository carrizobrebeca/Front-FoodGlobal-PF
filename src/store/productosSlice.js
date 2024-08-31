// src/store/productosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción para obtener todos los productos
export const fetchProductos = createAsyncThunk(
  "productos/fetchProductos",
  async () => {
    const response = await axios.get("http://localhost:3001/productos");
    return response.data;
  }
);

// Acción para obtener un producto específico por ID
export const fetchProductoById = createAsyncThunk(
  "productos/fetchProductoById",
  async (id) => {
    const response = await axios.get(`http://localhost:3001/productos/${id}`);
    return response.data;
  }
);

// Acción para obtener productos de un supermercado específico
export const fetchProductosPorSupermercado = createAsyncThunk(
  "productos/fetchProductosPorSupermercado",
  async (supermercado) => {
    // Ajusta la URL según el endpoint que tengas
    const response = await axios.get(
      `http://localhost:3001/productos/supermercado/${supermercado}`
    );
    return response.data;
  }
);

export const fetchNewProducts = createAsyncThunk(
  "productos/fetchNewProducts",
  async (productData) => {
    // Desestructurar los datos del producto
    const { nombre, descripcion, precio, negocio_id } = productData;
    const response = await axios.post("http://localhost:3001/productos", {
      nombre,
      descripcion,
      precio,
      negocio_id,
    });
    return response.data;
  }
);

const productosSlice = createSlice({
  name: "productos",
  initialState: {
    allUsers: [],
    allProducts: [],
    selectedItem: null,
    productosPorSupermercado: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedItem = action.payload;
      })
      .addCase(fetchProductoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductosPorSupermercado.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductosPorSupermercado.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productosPorSupermercado = action.payload;
      })
      .addCase(fetchProductosPorSupermercado.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error al crear el producto:", action.error.message); 
        alert(`Error: failed Create a Product - ${action.error.message}`);
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
        alert(`Successfully Create a New Product`);
      });
  },
});

export default productosSlice.reducer;
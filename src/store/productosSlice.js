
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Acción para obtener todos los productos
export const fetchProductos = createAsyncThunk(
  "productos/fetchProductos",
  async () => {
    const response = await axios.get('https://back-foodglobal-pf.up.railway.app/productos');
    return response.data;
  }
);

// Acción para obtener un producto específico por ID
export const fetchProductoById = createAsyncThunk(
  "productos/fetchProductoById",
  async (id) => {
    const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/productos/${id}`);
    return response.data;
  }
);

// Acción para obtener productos de un supermercado específico

export const fetchProductosPorSupermercado = createAsyncThunk('productos/fetchProductosPorSupermercado', async (supermercado) => {
  const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/productos/supermercado/${supermercado}`);
  return response.data;
});


// Acción para obtener todos los negocios
export const fetchNegocios = createAsyncThunk('productos/fetchNegocios', async () => {
  const response = await axios.get('https://back-foodglobal-pf.up.railway.app/negocios');
  return response.data;
});

// Acción para obtener productos de un negocio específico por ID
export const fetchProductosPorNegocio = createAsyncThunk('productos/fetchProductosPorNegocio', async (negocioId) => {
  const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/negocios/${negocioId}/productos`);
  return response.data;
});

export const fetchNewProducts = createAsyncThunk('productos/fetchNewProducts', async (productData) => {
  const { nombre, descripcion, precio, negocio_id, imagen, categoria, stock } = productData;
  const response = await axios.post('https://back-foodglobal-pf.up.railway.app/productos', { nombre, descripcion, precio, negocio_id, imagen, categoria, stock });
  return response.data;
});

export const deleteProductos = createAsyncThunk('productos/deleteProductos', async (id) => {
  await axios.delete(`/${id}`);
  return id;
});

export const editproducto= createAsyncThunk(
  "productos/editproducto",
  async ( {id, productData }) => {
    try {
      const response = await axios.put(
        `https://back-foodglobal-pf.up.railway.app/productos/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      alert("Error al Editar Producto")
    }
  }
);

const productosSlice = createSlice({
  name: "productos",
  initialState: {

    items: [],
    selectedItem: null,
    productosPorSupermercado: [],
    productosPorNegocio: [],
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
      })
      .addCase(fetchProductosPorNegocio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductosPorNegocio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productosPorNegocio = action.payload;
      })
      .addCase(fetchProductosPorNegocio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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

        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error al crear el producto:', action.error.message);
        alert(`Error al crear producto, asegurese de completar todos los campos y crear productos con nombre unico - ${action.error.message}`);
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        alert('Producto creado exitosamente!');
      })
      .addCase(deleteProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error al eliminar el producto:', action.error.message);
        alert(`Error: failed delete Product - ${action.error.message}`);
      })
      .addCase(deleteProductos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(producto => producto.id !== action.payload);
        alert('Producto eliminado exitosamente!');
      })
      .addCase(editproducto.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(editproducto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        alert('Producto editado exitosamente!');
      })
      .addCase(editproducto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert('Error al editar poducto!');
      })
  },
});

export const selectProductos = (state) => state.productos.items;
export const selectSelectedItem = (state) => state.productos.selectedItem;
export const selectProductosPorNegocio = (state) => state.productos.productosPorNegocio;
export const selectProductosPorSupermercado = (state) => state.productos.productosPorSupermercado;
export const selectError = (state) => state.productos.error;

export default productosSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Función para cargar el carrito desde el localStorage
const loadCarritoFromLocalStorage = () => {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
};

// Acción asíncrona para validar el stock del producto
export const validarStock = createAsyncThunk(
  'carrito/validarStock',
  async ({ id, cantidad }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/productos/${id}`);
      const producto = response.data;

      if (cantidad > producto.stock) {
        return rejectWithValue(`La cantidad máxima disponible para este producto es ${producto.stock}.`);
      } else {
        return { id, cantidad };
      }
    } catch (error) {
      return rejectWithValue('Error al validar el stock.');
    }
  }
);

// Acción asíncrona para realizar la compra
export const realizarCompra = createAsyncThunk(
  'carrito/realizarCompra',
  async (productos, { dispatch, rejectWithValue }) => {
    try {
      // Aquí puedes enviar una solicitud al backend para procesar la compra
      await axios.post(`http://localhost:3001/compras`, { productos });

      // Vaciar el carrito en el localStorage y en el estado
      dispatch(vaciarCarrito());
      alert('¡Stock actualizado y compra finalizada!'); // Mostrar el mensaje

    } catch (error) {
      return rejectWithValue('Error al realizar la compra.');
    }
  }
);

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    productos: loadCarritoFromLocalStorage(), // Cargar desde localStorage
    error: null,
  },
  reducers: {
    agregarProducto: (state, action) => {
      const producto = action.payload;
      const productoExistente = state.productos.find(p => p.id === producto.id);
      if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
      } else {
        state.productos.push(producto);
      }
      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(state.productos));
    },
    eliminarProducto: (state, action) => {
      state.productos = state.productos.filter(p => p.id !== action.payload.id);
      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(state.productos));
    },
    vaciarCarrito: (state) => {
      state.productos = [];
      // Limpiar localStorage
      localStorage.removeItem('carrito');
    },
    actualizarCantidad: (state, action) => {
      const { id, cantidad } = action.payload;
      const producto = state.productos.find(p => p.id === id);
      if (producto) {
        producto.cantidad = cantidad;
      }
      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(state.productos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validarStock.fulfilled, (state, action) => {
        // Implementa la lógica para actualizar el stock en el estado del carrito
        const { id, cantidad } = action.payload;
        const producto = state.productos.find(prod => prod.id === id);
        if (producto) {
          producto.cantidad = cantidad;
        }
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(state.productos));
      })
      .addCase(validarStock.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(realizarCompra.fulfilled, (state, action) => {
        // El carrito ya se vacía en la acción asíncrona
        // Aquí puedes realizar otras acciones si es necesario
      })
      .addCase(realizarCompra.rejected, (state, action) => {
        console.error(action.payload);
      });
  }
});

export const { agregarProducto, eliminarProducto, vaciarCarrito, actualizarCantidad } = carritoSlice.actions;
export default carritoSlice.reducer;

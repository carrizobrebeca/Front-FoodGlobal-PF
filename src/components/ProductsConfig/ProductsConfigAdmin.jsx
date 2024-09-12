import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { editproducto } from "../../store/productosSlice"; // Asegúrate de importar correctamente

const ProductsConfigAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allNegocios, setAllNegocios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [negocioId, setNegocioId] = useState("");

  // Fetch all negocios
  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null); // Resetear el error
      const response = await axios.get("https://back-foodglobal-pf.up.railway.app/negocios");
      const negocios = response.data;
      setAllNegocios(negocios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://back-foodglobal-pf.up.railway.app/productos");
      const productosData = response.data;

      setProductos(productosData);
      setFilteredProductos(productosData); // Inicialmente, muestra todos los productos
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
    fetchProductos();
  }, []);

  // Handle change in negocio selection
  const handleChange = (e) => {
    const selectedNegocioId = e.target.value;
    setNegocioId(selectedNegocioId);

    if (selectedNegocioId) {
      const filtered = productos.filter(
        (producto) => producto.negocio_id === selectedNegocioId
      );
      setFilteredProductos(filtered);
    } else {
      setFilteredProductos(productos); // Reset to show all products
    }
  };

  // Handle product blocking
  const handleBlockProduct = async (id) => {
    const confirmBlock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea bloquear el producto?"
    );
 
    if (confirmBlock) {
      const productToUpdate = productos.find((producto) => producto.id === id);
      const updatedProductData = { ...productToUpdate, status: "bloqueado" };

      try {
        await dispatch(editproducto({ id, productData: updatedProductData }));
        alert("Producto bloqueado con éxito");
        fetchProductos(); // Refresh the product list
      } catch (error) {
        console.error("Error al bloquear el producto:", error);
        alert("Error al bloquear el producto");
      }
    }
    
    
  };
  const handleUnblockProduct = async (id) => {
   
    const confirmUnblock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea desbloquear el producto?"
    );
    
    if (confirmUnblock) {
      const productToUpdate = productos.find((producto) => producto.id === id);
      const updatedProductData = { ...productToUpdate, status: "activo" };

      try {
        await dispatch(editproducto({ id, productData: updatedProductData }));
        alert("Producto desbloqueado con éxito");
        fetchProductos(); // Refresh the product list
      } catch (error) {
        console.error("Error al desbloquear el producto:", error);
        alert("Error al desbloquear el producto");
      }
    }
    
  };
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea Eliminar el producto?"
    );
    
    if (confirmDelete) {
      const productToUpdate = productos.find((producto) => producto.id === id);
      const updatedProductData = { ...productToUpdate, status: "eliminado" };

      try {
        await dispatch(editproducto({ id, productData: updatedProductData }));
        alert("Producto eliminado con éxito");
        fetchProductos(); // Refresh the product list
      } catch (error) {
        console.error("Error al eliminado el producto:", error);
        alert("Error al desbloquear el producto");
      }
    }
    
  };

  return (
    <div className="p-10 bg-gray-200">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 cursor-pointer"
        >
          ❮ Back
        </button>
      </div>

      <div className="grid grid-cols-9 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
        <button className="col-span-1 cursor-pointer"></button>
        <button className="col-span-1 cursor-pointer text-orange-500"></button>
        <button className="col-span-1 cursor-pointer text-green-500"></button>
        <button className="col-span-1 cursor-pointer text-blue-500"></button>
        <label className="col-span-1 cursor-pointer text-blue-500">
          Negocio
        </label>
        <select
          onChange={handleChange}
          value={negocioId}
          name="negocio_id"
          id="negocio_id"
          className="col-span-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione Negocio</option>
          {allNegocios.map((negocio) => (
            <option key={negocio.id} value={negocio.id}>
              {negocio.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-11 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
        <button className="col-span-1 cursor-pointer">Imagen</button>
        <button className="col-span-1 cursor-pointer">Nombre</button>
        <button className="col-span-1 cursor-pointer">Categoría</button>
        <button className="col-span-1 cursor-pointer">Precio</button>
        <button className="col-span-1 cursor-pointer">Stock</button>
        <button className="col-span-1 cursor-pointer">Descripción</button>
        <button className="col-span-1 cursor-pointer">Id</button>
        <button className="col-span-1 cursor-pointer">Estado</button>
        <button className="col-span-1 cursor-pointer"></button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <div
              key={producto.id}
              className="grid grid-cols-11 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100"
            >
              <div className="flex items-center justify-center col-span-1">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.nombre}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.categoria}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.precio}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.stock}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.descripcion}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.id}
              </h2>
              <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.status}
              </h2>
              
              <button
                onClick={() => handleUnblockProduct(producto.id)}
                className="col-span-1 flex items-center justify-center text-green-600"
                 title="Desbloquear producto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleBlockProduct(producto.id)}
                className="col-span-1 flex items-center justify-center text-orange-600"
                 title="Bloquear producto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteProduct(producto.id)}
                className="col-span-1 flex items-center justify-center text-red-600"
                 title="Eliminar producto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-blue-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsConfigAdmin;

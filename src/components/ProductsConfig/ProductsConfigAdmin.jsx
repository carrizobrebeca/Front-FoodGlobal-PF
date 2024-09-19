import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { editproducto } from "../../store/productosSlice"; // Asegúrate de importar correctamente
import SidebarAdmin from "../SidebarAdmin";
import Header from "../Header";

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
      const response = await axios.get("http://localhost:3001/negocios");
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
      const response = await axios.get("http://localhost:3001/productos");
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
  // const handleDeleteProduct = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "ADVERTENCIA: ¿Está seguro que desea Eliminar el producto?"
  //   );

  //   if (confirmDelete) {
  //     const productToUpdate = productos.find((producto) => producto.id === id);
  //     const updatedProductData = { ...productToUpdate, status: "eliminado" };

  //     try {
  //       await dispatch(editproducto({ id, productData: updatedProductData }));
  //       alert("Producto eliminado con éxito");
  //       fetchProductos(); // Refresh the product list
  //     } catch (error) {
  //       console.error("Error al eliminado el producto:", error);
  //       alert("Error al desbloquear el producto");
  //     }
  //   }
  // };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <SidebarAdmin />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />

        <div className="p-10 bg-gray-200">
          <div className="grid grid-cols-9 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
            <button className="col-span-1 cursor-pointer text-green-500 font-bold"></button>
            <button className="col-span-1 cursor-pointer text-orange-500 "></button>
            <button className="col-span-1 cursor-pointer text-green-500 font-bold"></button>
            <button className="col-span-1 cursor-pointer text-blue-500 font-bold"></button>
            <label className="col-span-1 cursor-pointer text-blue-500 font-bold">
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

          <div className="grid grid-cols-10 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
            <button className="col-span-1 cursor-pointer">Imagen</button>
            <button className="col-span-1 cursor-pointer">Nombre</button>
            <button className="col-span-1 cursor-pointer">Categoría</button>
            <button className="col-span-1 cursor-pointer">Precio</button>
            <button className="col-span-1 cursor-pointer">Stock</button>
            <button className="col-span-1 cursor-pointer">Descripción</button>
            {/* <button className="col-span-1 cursor-pointer">Id</button> */}
            <button className="col-span-1 cursor-pointer">Estado</button>
            <button className="col-span-1 cursor-pointer"></button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto) => (
                <div
                  key={producto.id}
                  className="grid grid-cols-10 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4"
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
                  {/* <h2 className="m-0 flex items-center justify-center col-span-1">
                {producto.id}
              </h2> */}
                  <h2 className="m-0 flex items-center justify-center col-span-1">
                    {producto.status}
                  </h2>

                  {producto.status === "activo" && (
                    <button
                      onClick={() => handleBlockProduct(producto.id)}
                      className="col-span-1 flex items-center justify-center text-orange-600"
                      title="Bloquear producto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  {producto.status === "bloqueado" && (
                    <button
                      className="col-span-1 flex items-center justify-center text-green-600"
                      title="Activar roducto"
                      onClick={() => handleUnblockProduct(producto.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                    </button>
                  )}
              
                </div>
              ))
            ) : (
              <p className="text-blue-500">No products found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsConfigAdmin;

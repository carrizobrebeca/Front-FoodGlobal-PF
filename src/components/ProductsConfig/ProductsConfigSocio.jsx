import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsConfigSocio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allNegocios, setAllNegocios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [negocioId, setNegocioId] = useState("");

  // Obtener datos del usuario desde el estado de Redux
  const user = useSelector((state) => state.login.user);

  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null); // Resetear el error
      const response = await axios.get("/negocios");
      const negocios = response.data;

      // Filtrar negocios que pertenecen al usuario
      const userNegocios = negocios.filter(
        (negocio) => negocio.usuario_id === user.id
      );

      setAllNegocios(userNegocios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
  }, [user]);

  const handleChange = (e) => {
    setNegocioId(e.target.value);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      if (negocioId) {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `/negocios/${negocioId}/productos`
          );
          const productosData = response.data;

          setProductos(productosData);

          const categorias = [
            ...new Set(productosData.map((producto) => producto.categoria)),
          ];
          setCategories(categorias);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductos();
  }, [negocioId]);

 

  return (
    <div className="p-10 bg-gray-800">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 cursor-pointer"
        >
          ❮ Back
        </button>
        <button
          onClick={() => navigate("/createproducts")}
          className="text-blue-500 cursor-pointer"
        >
          Editar Productos
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
        <button className="cursor-pointer mr-2.5">All</button>
        <button className="cursor-pointer mr-2.5">Out of stock</button>
        <button className="cursor-pointer mr-2.5">Low stock</button>
        <button className="cursor-pointer mr-2.5">High stock</button>
        <button className="cursor-pointer mr-2.5">Categories</button>
        <select
          onChange={handleChange}
          value={negocioId}
          name="negocio_id"
          id="negocio_id"
          className="col-span-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="" className="text-blue-500">
            Seleccione negocio
          </option>
          {allNegocios.map((negocio) => (
            <option key={negocio.id} value={negocio.id}>
              {negocio.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-8 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100 mb-4">
        <button className="cursor-pointer mr-2.5">Imagen</button>
        <button className="cursor-pointer mr-2.5">Nombre</button>
        <button className="cursor-pointer mr-2.5">Categoría</button>
        <button className="cursor-pointer mr-2.5">Precio</button>
        <button className="cursor-pointer mr-2.5">Stock</button>
        <button className="cursor-pointer mr-2.5">Descripción</button>
        <button className="cursor-pointer mr-2.5">Status</button>
        <button className="cursor-pointer mr-2.5">Id</button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="grid grid-cols-8 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100"
            >
              <div className="flex items-center justify-center">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h2 className="m-0">{producto.nombre}</h2>
              <h2 className="m-0">{producto.categoria}</h2>
              <h2 className="m-0">{producto.precio}</h2>
              <h2 className="m-0">{producto.stock}</h2>
              <h2 className="m-0">{producto.descripcion}</h2>
              <h2 className="m-0">{producto.status}</h2>
              <h2 className="m-0">{producto.id}</h2>
              
            </div>
          ))
        ) : (
          <p className="text-blue-500">
            No se encontraron productos. Seleccione su negocio
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsConfigSocio;

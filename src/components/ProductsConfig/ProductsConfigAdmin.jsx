import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../UsersConfig/usersConfig.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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

  return (
    <div className={style.mainContainer}>
      <div className={style.cont}>
        <button onClick={() => navigate("/dashboard")}>❮ Back</button>
        <button onClick={() => navigate("/createproducts")}>Edit Product</button>
      </div>
      <div className={style.container}>
        <button>All</button>
        <button>Out of stock</button>
        <button>Low stock</button>
        <button>High stock</button>
        <button>Categories</button>
        <select
          onChange={handleChange}
          value={negocioId}
          name="negocio_id"
          id="negocio_id"
        >
          <option value="">Seleccione negocio</option>
          {allNegocios.map((negocio) => (
            <option key={negocio.id} value={negocio.id}>
              {negocio.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className={style.container}>
        <button>Imagen</button>
        <button>Nombre</button>
        <button>Categoría</button>
        <button>Precio</button>
        <button>Stock</button>
        <button>Descripción</button>
        <button>Id</button>
      </div>
      <div className={style.userList}>
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <div key={producto.id} className={style.container}>
              <div className={style.content}>
                 <img src={producto.imagen} alt={producto.nombre} />
              </div>
             
              <h2>{producto.nombre}</h2>
              <h2>{producto.categoria}</h2>
              <h2>{producto.precio}</h2>
              <h2>{producto.stock}</h2>
              <h2>{producto.descripcion}</h2>
              <h2>{producto.id}</h2>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsConfigAdmin;

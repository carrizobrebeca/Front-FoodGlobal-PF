import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./productsConfig.module.css";
import { useNavigate } from "react-router-dom";
import { fetchProductos } from "../../store/productosSlice";

const ProductsConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener datos del estado de Redux
  const {
    items: productos,
    status,
    error,
  } = useSelector((state) => state.productos);

  // Fetch products on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductos());
    }
  }, [dispatch, status]);


  return (
    <div className={style.mainContainer}>
      <div className={style.cont}>
        <button onClick={() => navigate("/dashBoard")}>❮ Back</button>
        <button onClick={() => navigate("/createProduct")}>Edit Product</button>
      </div>
      <div className={style.containerBarra}>
        <h2>All</h2>
        <h2>Categories</h2>
        <h2>Out of stock</h2>
        <h2>Low stock</h2>
        <h2>High stock</h2>
      </div>
      <div className={style.container}>
        <input type="text" placeholder="Search..." />
        <button>&#128269;</button>
      </div>
      <div className={style.containerBarra}>
        <button>Image</button>
        <button>Name ↑</button>

        
        <button>Category</button>
        <button>Price</button>
        
        <button>Stock</button>
     <button>Description</button>
      </div>
      <div className={style.container}>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className={style.content}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h2>{producto.nombre}</h2>
              
              <h2>{producto.categoria}</h2>
              
              <h2>{producto.precio}</h2>
              <h2>?</h2>
              <h2>{producto.descripcion}</h2>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsConfig;

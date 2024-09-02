import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./productsConfig.module.css";
import { useNavigate } from "react-router-dom";
import { fetchProductoById, fetchProductos } from "../../store/productosSlice";

const ProductsConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//Obtener datos del estado de Redux
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

//Obtener datos del estado de Redux
  // const {
  //   items: negocios,
  //   status,
  //   error,
  // } = useSelector((state) => state.negocios);



  // Fetch products on component mount
  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchNegocios());
  //   }
  // }, [dispatch, status]);


  return (
    <div className={style.mainContainer}>
      <div className={style.cont}>
        <button onClick={() => navigate(-1)}>❮ Back</button>
        <button onClick={() => navigate("/createproducts")}>
          Edit Product
        </button>
      </div>
      <div className={style.container}>
        <h2>All</h2>
        <h2>Out of stock</h2>
        <h2>Low stock</h2>
        <h2>High stock</h2>
        <h2>Categories</h2>
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
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className={style.container}>
             
              <div className={style.content}>
              
     
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

export default ProductsConfig;

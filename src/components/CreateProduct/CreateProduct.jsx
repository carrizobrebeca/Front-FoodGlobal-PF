import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./products.module.css";
import { useDispatch } from "react-redux";
import { fetchNewProducts, deleteProductos } from "../../store/productosSlice";
import Cloudinary from "../Cloudinary";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    negocio_id: "",
    imagen: "",
    categoria: "",
    stock: "",
    id: "",
  });

  const [errors, setErrors] = useState({
    nombre: "Nombre no puede estar vacío",
    descripcion: "Descripción no puede estar vacío",
    precio: "Precio no puede estar vacío",
    negocio_id: "Debe seleccionar un negocio",
    categoria: "Categoría no puede estar vacía",
    stock: "Stock no puede estar vacío",
    imagen: "",
  });

  const validate = (state, name) => {
    // Validaciones
    // Similar al código que tienes
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    validate(
      {
        ...state,
        [e.target.name]: e.target.value,
      },
      e.target.name
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchNewProducts(state));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // Mostrar un cuadro de confirmación
    const confirmDelete = window.confirm("ADVERTENCIA: ELIMINACION PERMANENTE DE PRODUCTO ¿Estás seguro de que deseas eliminar este producto?");
    
    // Si el usuario confirma, proceder con la eliminación
    if (confirmDelete) {
      if (state.id) {
        dispatch(deleteProductos(state.id));
      } else {
        alert("Por favor, ingrese un ID de producto para eliminar");
      }
    } else {
      // Si el usuario cancela, no hacer nada
      console.log("Eliminación cancelada");
    }
  };

  const handleImageUpload = (url) => {
    setState(prevState => ({ ...prevState, imagen: url }));
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cont}>
          <button onClick={() => navigate("/products")}>❮ Back</button>
          <h2>Product</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.formContainer}>
            <div className={style.inputsContainer}>
              <div className={style.inputRow}>
                <input type="text" placeholder="Search" />
                <button>&#128269;</button>
              </div>
              <div className={style.inputRow}>
                <label>Upload photo |</label>
                <Cloudinary onImageUpload={handleImageUpload} />
              </div>
              <div className={style.inputRow}>
                <label>Nombre |</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="nombre"
                  id="nombre"
                />
                <label className={style.form_error}>{errors.nombre}</label>
              </div>
              <div className={style.inputRow}>
                <label>Descripción |</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="descripcion"
                  id="descripcion"
                />
                <label className={style.form_error}>{errors.descripcion}</label>
              </div>
              <div className={style.inputRow}>
                <label>Precio |</label>
                <input
                  type="number"
                  step="any"
                  onChange={handleChange}
                  name="precio"
                  id="precio"
                />
                <label className={style.form_error}>{errors.precio}</label>
              </div>
              <div className={style.inputRow}>
                <label>Categoría |</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="categoria"
                  id="categoria"
                />
                <label className={style.form_error}>{errors.categoria}</label>
              </div>
              <div className={style.inputRow}>
                <label>Stock |</label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="stock"
                  id="stock"
                />
                <label className={style.form_error}>{errors.stock}</label>
              </div>
              <div className={style.inputRow}>
                <label>Negocio ID |</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="negocio_id"
                  id="negocio_id"
                />
                <label className={style.form_error}>{errors.negocio_id}</label>
              </div>
              <div className={style.inputRow}>
                <label>Imagen URL |</label>
                <input
                  type="text"
                  value={state.imagen}
                  name="imagen"
                  id="imagen"
                  onChange={handleChange}
                />
                <label className={style.form_error}>{errors.imagen}</label>
              </div>
            </div>
          </div>
          <div className={style.formContainer}>
            <div className={style.inputRow}>
              <h2>
                Si desea ELIMINAR un PRODUCTO, solo ingrese el ID del mismo |
              </h2>
            </div>
            <div className={style.inputRow}>
              <label>Producto ID (para eliminar) |</label>
              <input type="text" onChange={handleChange} name="id" id="id" />
            </div>
          </div>

          <div className={style.formButtons}>
            <button type="submit">Send</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
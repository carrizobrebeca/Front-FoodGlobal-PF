import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNegocios } from "../../store/negocioSlice";
import { fetchNewProducts } from "../../store/productosSlice";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allSuper, status, error } = useSelector((state) => state.negocios);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNegocios());
    }
  }, [dispatch, status]);

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    negocio_id: "",
  });

  const [errors, setErrors] = useState({
    nombre: "Nombre no puede estar vacío",
    descripcion: "Descripción no puede estar vacío",
    precio: "Precio no puede estar vacío",
    negocio_id: "Debe seleccionar un negocio",
  });

  const validate = (state, name) => {
    if (name === "nombre") {
      if (state.nombre === "")
        setErrors({ ...errors, nombre: "Nombre no puede estar vacío" });
      else setErrors({ ...errors, nombre: "" });
    }
    if (name === "descripcion") {
      if (state.descripcion === "")
        setErrors({ ...errors, descripcion: "Descripción no puede estar vacío" });
      else setErrors({ ...errors, descripcion: "" });
    }
    if (name === "precio") {
      if (state.precio === "")
        setErrors({ ...errors, precio: "Precio no puede estar vacío." });
      else setErrors({ ...errors, precio: "" });
    }
    if (name === "negocio_id") {
      if (state.negocio_id === "")
        setErrors({ ...errors, negocio_id: "Debe seleccionar un negocio" });
      else setErrors({ ...errors, negocio_id: "" });
    }
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

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cont}>
          <button onClick={() => navigate("/products")}>❮ Back</button>
          <h2>Product</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.formContainer}>
            <div className={style.imgContainer}>
              <img src="" alt="" className={style.imageCont} />
            </div>

            <div className={style.inputsContainer}>
              <div className={style.inputRow}>
                <label>
                  Upload photo
                  <input type="file" name="logo" onChange="" />
                </label>
              </div>
              <div className={style.inputRow}>
                <input type="text" placeholder="Search" />
                <button>&#128269;</button>
              </div>
              <div className={style.inputRow}>
                <input
                  type="text"
                  onChange={handleChange}
                  name="nombre"
                  id="nombre"
                  placeholder=""
                />
              </div>
              <label className={style.form_error}>{errors.nombre}</label>
              <div className={style.inputRow}>
                <input
                  type="text"
                  onChange={handleChange}
                  name="descripcion"
                  id="descripcion"
                  placeholder="Description"
                />
              </div>
              <label className={style.form_error}>{errors.descripcion}</label>

              <div className={style.inputRow}></div>
              <div className={style.inputRow}>
                <input
                  type="number"
                  onChange={handleChange}
                  name="precio"
                  id="precio"
                />
                
              </div> <label className={style.form_error}>{errors.precio}</label>
              <div className={style.inputRow}>
                <label>Categories</label>
                <select
                  onChange={handleChange}
                  name="negocio_id"
                  id="negocio_id"
                >
                  {allSuper &&
                    allSuper.map((superItem) => (
                      <option key={superItem.id} value={superItem.id}>
                        {superItem.nombre}
                      </option>
                    ))}
                </select>
                <label className={style.form_error}>{errors.negocio_id}</label>
              </div>
            </div>
          </div>
          <div className={style.btnContent}>
            <button type="submit">+ Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;

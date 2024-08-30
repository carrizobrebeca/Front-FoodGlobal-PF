import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./createUser.module.css";
import { registerUser } from "../../store/registerSlice";
import { useDispatch } from "react-redux";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    rol: "",
  });

  const optionRol = ["usuario", "socio", "admin"];

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [errors, setErrors] = useState({
    nombre: "Name cannot be empty",
    apellido: "Last Name cannot be empty",
    email: "Email cannot be empty",
    password: "Password cannot be empty",
    rol: "Debe seleccionar un Rol",
  });

  const validate = (state, name) => {
    if (name === "nombre") {
      if (state.nombre === "")
        setErrors({ ...errors, nombre: "Name cannot be empty" });
      else if (!nombreRegex.test(state.nombre))
        setErrors({ ...errors, nombre: "Name format is not valid" });
      else {
        setErrors({ ...errors, nombre: "" });
        return;
      }
    }

    if (name === "apellido") {
      if (state.apellido === "")
        setErrors({ ...errors, apellido: "Last Name cannot be empty" });
      else if (!apellidoRegex.test(state.apellido))
        setErrors({ ...errors, apellido: "Last Name format is not valid" });
      else {
        setErrors({ ...errors, apellido: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email cannot be empty" });
      else if (!emailRegex.test(state.email))
        setErrors({ ...errors, email: "Email format is not valid" });
      else {
        setErrors({ ...errors, email: "" });
        return;
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Password cannot be empty" });
      else if (!passwordRegex.test(state.password))
        setErrors({
          ...errors,
          password: "6-20, Password must contain at least one number",
        });
      else {
        setErrors({ ...errors, password: "" });
        return;
      }
    }
    if (name === "rol") {
      if (state.rol === "")
        setErrors({ ...errors, rol: "Debe seleccionar un Rol" });
      else {
        setErrors({ ...errors, rol: "" });
        return;
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (
      e.target.name === "nombre" ||
      e.target.name === "apellido" ||
      e.target.name === "email" ||
      e.target.name === "password"||
       e.target.name === "rol"
    )
    setState({
      ...state,
      [e.target.name]: e.target.value,
      imagen: state.imagen,
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
    dispatch(registerUser(state));
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cont}>
          <button onClick={() => navigate("/user")}>❮ Back</button>
          <h2>User</h2>
        </div>

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
            <form onSubmit={handleSubmit}>
              <div className={style.inputRow}>
              <label>Name |</label>
                <input type="text" onChange={handleChange} name="nombre" id="nombre" />
                <label className={style.form_error}>{errors.nombre}</label>
                <label>Last Name |</label>
                <input type="text" onChange={handleChange} name="apellido" id="apellido" />
                <label className={style.form_error}>{errors.apellido}</label>
              </div>
         
              <div className={style.inputRow}>
              <label>Email |</label>
                <input type="text" onChange={handleChange} name="email" id="email" />
                <label className={style.form_error}>{errors.email}</label>
                <label>Password |</label>
                <input type="text" onChange={handleChange} name="password" id="password"/>
                <label className={style.form_error}>{errors.password}</label>
              </div>
            
              <div className={style.inputRow}>
              <label>Role |</label>
                <select onChange={handleChange} name="rol" id="rol">
                  {optionRol.map((opc) => (
                    <option key={opc} value={opc}>
                      {opc}
                    </option>
                  ))}
                </select>
                <label className={style.form_error}>{errors.rol}</label>
              </div>
            </form>
          </div>
        </div>

        <div className={style.btnContent}>
        <button type="submit">+ Create</button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;

// <button onClick={() => navigate("/editUser")}>🖉 Edit</button>
//           <button onClick={() => navigate("/createUser")}>+ Create</button>
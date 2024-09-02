import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./createUser.module.css";
import { registerUser, deleteUser, fetchUserByEmail, checkUserExists } from "../../store/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import Cloudinary from "../Cloudinary";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.register);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const optionRol = ["admin", "socio", "usuario"];

  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    imagen: "",
    email: "",
    password: "",
    rol: "",
    id: "", // Agregado para la eliminación
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    imagen: "",
    email: "",
    password: "",
    rol: "",
  });

  useEffect(() => {
    if (status === "succeeded" && user) {
      setState({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        imagen: user.imagen || "",
        email: user.email || "",
        password: user.password || "",
        rol: user.rol || "",
        id: user.id || "",
      });
    }
  }, [status, user]);

  useEffect(() => {
    if (status === "failed" && error) {
      alert("Error: " + error);
    }
  }, [status, error]);

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const validate = (state, name) => {
    let newErrors = { ...errors };

    if (name === "nombre") {
      newErrors.nombre =
        state.nombre === ""
          ? "Nombre no puede estar vacío"
          : !nombreRegex.test(state.nombre)
          ? "Formato de nombre no válido"
          : "";
    }

    if (name === "apellido") {
      newErrors.apellido =
        state.apellido === ""
          ? "Apellido no puede estar vacío"
          : !apellidoRegex.test(state.apellido)
          ? "Formato de apellido no válido"
          : "";
    }

    if (name === "imagen") {
      newErrors.imagen =
        state.imagen === "" ? "Imagen no puede estar vacía" : "";
    }

    if (name === "email") {
      newErrors.email =
        state.email === ""
          ? "Email no puede estar vacío"
          : !emailRegex.test(state.email)
          ? "Formato de email no válido"
          : "";
    }

    if (name === "password") {
      newErrors.password =
        state.password === ""
          ? "Contraseña no puede estar vacía"
          : !passwordRegex.test(state.password)
          ? "Contraseña entre 6-20 caracteres, requiere al menos una mayúscula y un número"
          : "";
    }

    if (name === "rol") {
      newErrors.rol = state.rol === "" ? "Debe seleccionar un rol" : "";
    }

    setErrors(newErrors);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (state.email) {
      dispatch(fetchUserByEmail(state.email))
        .unwrap()
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Por favor, ingrese un email para buscar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    validate({ ...state, [name]: value }, name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Verifica si hay errores antes de intentar registrar el usuario
    if (disable()) {
      return;
    }

    // Verifica si el usuario ya existe
    dispatch(checkUserExists(state.email))
      .unwrap()
      .then((userExists) => {
        if (userExists) {
          alert("El email ya está en uso");
        } else {
          // Registra el nuevo usuario si no existe
          dispatch(registerUser(state))
            .unwrap()
            .then(() => {
              alert("Usuario creado con éxito");
              // Optionally, redirect if you wish
              // navigate("/createusers");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    
    // Confirma si el usuario quiere eliminar el usuario
    const confirmDelete = window.confirm("ADVERTENCIA: ELIMINACION PERMANENTE DE USUARIO ¿Está seguro que desea eliminar el usuario?");
    
    if (confirmDelete) {
      if (state.id) {
        dispatch(deleteUser(state.id))
          .unwrap()
          .then(() => {
            // Opcionalmente puedes limpiar el estado del usuario aquí
            setState({
              nombre: "",
              apellido: "",
              imagen: "",
              email: "",
              password: "",
              rol: "",
              id: "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Por favor, ingrese un ID de usuario para eliminar");
      }
    } else {
      // Usuario canceló la acción
      console.log("Eliminación cancelada");
    }
  };
  const handleImageUpload = (url) => {
    setState(prevState => ({ ...prevState, imagen: url }));
  };


  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.cont}>
        <button onClick={() => navigate("/users")}>❮ Back</button>
        <h2>User</h2>
      </div>

      <div className={style.formContainer}>
        <div className={style.inputsContainer}>
          <div className={style.inputRow}>
          <label>Search |</label>
            <input
              type="text"
              placeholder="Buscar usuario por email"
              value={state.email}
              onChange={handleChange}
              name="email"
              id="email"
            />
            <button onClick={handleSearch}>&#128269;</button>
          </div>
          <div>
          <div className={style.inputRow}>
                <label>Upload photo |</label>
                <Cloudinary onImageUpload={handleImageUpload} />
              </div>
          </div>
          <form>
            <div className={style.inputRow}>
              <label>Name |</label>
              <input
                type="text"
                onChange={handleChange}
                name="nombre"
                id="nombre"
                value={state.nombre}
              />
              <label className={style.form_error}>{errors.nombre}</label>
              <label>Last Name |</label>
              <input
                type="text"
                onChange={handleChange}
                name="apellido"
                id="apellido"
                value={state.apellido}
              />
              <label className={style.form_error}>{errors.apellido}</label>
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
            <div className={style.inputRow}>
              <label>Email |</label>
              <input
                type="text"
                onChange={handleChange}
                name="email"
                id="email"
                value={state.email}
              />
              <label className={style.form_error}>{errors.email}</label>
              <label>Password |</label>
              <input
                type="text"
                onChange={handleChange}
                name="password"
                id="password"
                value={state.password}
              />
              <label className={style.form_error}>{errors.password}</label>
            </div>
            <div className={style.inputRow}>
              <label>Role |</label>
              <select onChange={handleChange} name="rol" id="rol" value={state.rol}>
                <option value="">Select role</option>
                {optionRol.map((opc) => (
                  <option key={opc} value={opc}>
                    {opc}
                  </option>
                ))}
              </select>
              <label className={style.form_error}>{errors.rol}</label>
            </div>
            <p></p>
            <div className={style.formContainer}>
              <div className={style.inputRow}>
                <h2>ELIMINAR USUARIO |</h2>
              </div>
              <div className={style.inputRow}>
                <h2>Si desea eliminar un usuario, solo ingrese el ID del mismo |</h2>
              </div>
              <div className={style.inputRow}>
                <label>User ID (para eliminar) |</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="id"
                  id="id"
                  value={state.id}
                />
              </div>
            </div>
            <div className={style.btnContent}>
              <button type="submit" onClick={handleSubmit}>
                + Create
              </button>
              <button type="button" onClick={handleDelete}>
                X Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

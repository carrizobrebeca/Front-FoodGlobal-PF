import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../Cloudinary";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  deleteUser,
  fetchUserByEmail,
  checkUserExists,
  editUser,
} from "../../store/registerSlice";
import SidebarAdmin from "../SidebarAdmin";
import Header from "../Header";

const CreateUserAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.register);

  const optionRol = ["admin", "socio", "usuario"];

  const optionStatus = ["bloqueado", "eliminado", "activo", "pendiente"];
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    imagen: "",
    email: "",
    password: "",
    rol: "",
    status: "",
    id: "", // Agregado para la eliminación
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    imagen: "",
    email: "",
    password: "",
    rol: "",
    status: "",
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
        status: user.status || "",
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const validate = (state, name) => {
    let newErrors = { ...errors };

    if (name === "nombre") {
      newErrors.nombre =
        state.nombre === ""
          ? "Nombre no puede estar vacío"
          : state.nombre.length < 3 || !nombreRegex.test(state.nombre)
          ? "Formato no válido (al menos 3 letras, no se permiten caracteres especiales ni numeros)"
          : "";
    }

    if (name === "apellido") {
      newErrors.apellido =
        state.apellido === ""
          ? "Apellido no puede estar vacío"
          : state.apellido.length < 3
          ? "Formato no válido (al menos 3 letras)"
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
    if (name === "status") {
      newErrors.status =
        state.status === "" ? "Debe seleccionar un estado" : "";
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

    if (state.id) {
      dispatch(editUser({ id: state.id, userData: state }))
        .unwrap()
        .then(() => {
          alert("Usuario editado con éxito");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(checkUserExists(state.email))
        .unwrap()
        .then((userExists) => {
          if (userExists) {
            alert("El email ya está en uso");
          } else {
            dispatch(registerUser(state))
              .unwrap()
              .then(() => {
                alert("Usuario creado con éxito");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "ADVERTENCIA: ELIMINACION PERMANENTE DE USUARIO ¿Está seguro que desea eliminar el usuario?"
    );

    if (confirmDelete) {
      if (state.id) {
        dispatch(deleteUser(state.id))
          .unwrap()
          .then(() => {
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
        alert("Por favor, busque un usuario para eliminar");
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };

  const handleBlock = (e) => {
    e.preventDefault();

    // Cambiar el estado a "bloqueado"
    setState((prevState) => ({
      ...prevState,
      status: "bloqueado",
    }));
    const confirmDelete = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea bloquear el usuario?"
    );
    if (confirmDelete) {
      if (state.id) {
        // Despachar la acción editUser con el nuevo estado
        dispatch(
          editUser({
            id: state.id,
            userData: { ...state, status: "bloqueado" },
          })
        )
          .unwrap()
          .then(() => {
            alert("Usuario bloqueado con éxito");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Por favor, busquee un usuario para bloquear");
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };

  const handleImageUpload = (url) => {
    setState((prevState) => ({ ...prevState, imagen: url }));
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <SidebarAdmin />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />

        <div className="bg-gray-100 p-12">
          <div className="flex justify-between bg-gray-300 p-4 rounded-md mb-4">
            <button
              onClick={() => navigate("/users")}
              className="text-blue-500"
            >
              ❮ Back
            </button>
            <h2 className="text-lg font-bold text-blue-600">Usuario</h2>
          </div>

          <div className="flex justify-around bg-gray-300 p-2 rounded-md mb-4">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Buscar usuario por email"
                value={state.email}
                onChange={handleChange}
                name="email"
                id="email"
                className="flex-1 p-2 border rounded-md"
              />
              <button type="button" onClick={handleSearch} className="">
                &#128269;
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row bg-gray-200 p-4 rounded-lg mb-4">
              <div className="flex flex-col flex-1 md:mr-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex flex-col justify-between gap-4"></div>
                  <label className="w-32">Foto</label>
                  <Cloudinary onImageUpload={handleImageUpload} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Nombre</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="nombre"
                    id="nombre"
                    value={state.nombre}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="text-red-500">{errors.nombre}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Apellido </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="apellido"
                    id="apellido"
                    value={state.apellido}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="text-red-500">{errors.apellido}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">URL de la imagen </label>
                  <input
                    type="text"
                    value={state.imagen}
                    name="imagen"
                    id="imagen"
                    onChange={handleChange}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="text-red-500">{errors.imagen}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Email</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    id="email"
                    value={state.email}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="text-red-500">{errors.email}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Password</label>
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    id="password"
                    value={state.password}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="text-red-500">{errors.password}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Rol</label>
                  <select
                    onChange={handleChange}
                    name="rol"
                    id="rol"
                    value={state.rol}
                    className="flex-1 p-2 border rounded-md"
                  >
                    <option value="">Rol</option>
                    {optionRol.map((rol) => (
                      <option key={rol} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500">{errors.rol}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Estado</label>
                  <select
                    onChange={handleChange}
                    name="status"
                    id="status"
                    value={state.status}
                    className="flex-1 p-2 border rounded-md"
                  >
                    <option value="">Estado</option>
                    {optionStatus.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500">{errors.status}</span>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-around bg-gray-300 p-4 rounded-md mb-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 p-2 rounded-md text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6" // Cambiado a className para la compatibilidad de JSX
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              <span>Borrar Usuario</span>
            </button>
            <button
              type="button"
              onClick={handleBlock}
              className="bg-orange-500 p-2 rounded-md text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6" // Cambiado a className para la compatibilidad de JSX
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              <span>Bloquear Usuario</span>
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 p-2 rounded-md text-white flex items-center gap-2"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Editar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 p-2 rounded-md text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6" // Cambiado a className para la compatibilidad de JSX
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Crear
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateUserAdmin;

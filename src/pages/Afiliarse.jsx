import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/registerSlice";

const RegistroAfiliacion = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.register);

  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    rol: "usuario",
    status: "pendiente",
  });

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     navigate("/login"); // Redirige a la página principal o al destino deseado
  //   }
  // }, [status, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      alert(error); // Muestra el error como una alerta
    }
  }, [status, error]);

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [errors, setErrors] = useState({
    nombre: "Nombre debe tener al menos 3 letras",
    email: "Email debe ser una dirección de correo electrónico válida",
    password:
      "Contraseña debe tener entre 6 y 20 caracteres, al menos un número, al menos una letra mayúscula",
  });

  const validate = (state, name) => {
    if (name === "nombre") {
      if (state.nombre === "")
        setErrors({ ...errors, nombre: "Nombre no puede estar vacío" });
      else if (!nombreRegex.test(state.nombre))
        setErrors({ ...errors, nombre: "Formato de nombre inválido" });
      else {
        setErrors({ ...errors, nombre: "" });
        return;
      }
    }

    if (name === "apellido") {
      if (state.apellido === "")
        setErrors({ ...errors, apellido: "Apellido no puede estar vacío" });
      else {
        setErrors({ ...errors, apellido: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email no puede estar vacío" });
      else if (!emailRegex.test(state.email))
        setErrors({ ...errors, email: "Formato de Email inválido" });
      else {
        setErrors({ ...errors, email: "" });
        return;
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Password no puede estar vacía" });
      else if (!passwordRegex.test(state.password))
        setErrors({
          ...errors,
          password: "Formato de contraseña inválida",
        });
      else {
        setErrors({ ...errors, password: "" });
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
      e.target.name === "password"
    ) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        imagen: state.imagen,
      });
    }

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
    
      dispatch(registerUser(state))
        .unwrap()
        .catch((err) => {
          console.log(err);
        });
    
  };

  // const [nombreLocal, setNombreLocal] = useState('');
  // const [direccion, setDireccion] = useState('');
  // const [email, setEmail] = useState('');
  // const [productos, setProductos] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`http://localhost:3001/api/afiliacion`, {
  //       nombreLocal,
  //       direccion,
  //       email,
  //       productos,
  //     });
  //     alert('Registro exitoso');
  //   } catch (error) {
  //     console.error('Error al registrar el local:', error);
  //   }
  // };

  
  return (
    <>
      <div className="p-8 bg-gray-100">
        <section className="registro-intro text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Afíliate con FoodGlobal</h1>
          <p className="text-lg mb-8">
            Únete a nuestra plataforma y empieza a vender tus productos a nivel
            internacional. Completa el siguiente formulario para registrarte.
          </p>
        </section>

        <section className="registro-form bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4">Formulario de Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="nombre"
                id="nombre"
                className="w-full p-2 border rounded"
                placeholder="Nombre del Local"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="apellido"
                id="apellido"
                className="w-full p-2 border rounded"
                placeholder="Dirección del Local"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Correo Electrónico"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Correo Electrónico"
                required
              />
            </div>
            {/* <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="productos">Productos</label>
            <textarea
              id="productos"
              value={productos}
              onChange={(e) => setProductos(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Productos ofrecidos (descripción)"
            />
          </div> */}
            <button
              type="submit"
              name="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition duration-300"
            >
              Enviar
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default RegistroAfiliacion;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/registerSlice";
import logo from "../../assets/images/logofood.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.register);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    rol: "usuario",
  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      alert(error);
    }
  }, [status, error]);

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [errors, setErrors] = useState({
    nombre: "*",
    apellido: "*",
    email: "*",
    password: "*",
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
      else if (!apellidoRegex.test(state.apellido))
        setErrors({ ...errors, apellido: "Formato de apellido inválido" });
      else {
        setErrors({ ...errors, apellido: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email Formato de nombre inválido" });
      else if (!emailRegex.test(state.email))
        setErrors({ ...errors, email: "Formato de email inválido" });
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
          password: "Formato de contraseña inválido, debe contener entre 6-20 caracteres, al menos una mayúscula, al menos un número",
        });
      else {
        setErrors({ ...errors, password: "" });
        return;
      }
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
    setFormSubmitted(false);

    if (!disable()) {
      dispatch(registerUser(state))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };
  const hasErrors = Object.values(errors).some((error) => error === "*");
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.campdenbri.co.uk/images/food-cuisine-large.jpg')" }}
    >
      <form onSubmit={handleSubmit} className="bg-[rgba(53,51,50,0.97)] p-6 rounded-xl shadow-md w-96 relative z-10">
        <div className="text-center mb-6">
          <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto mx-auto" />
          <h1 className="text-xl font-bold text-white">Ingresa tus datos para registrarte</h1>
        </div>
        <label className="block text-white">Nombre</label>
        <input
          onChange={handleChange}
          name="nombre"
          id="nombre"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="text-red-600 mb-2">{errors.nombre}</label>
        
        <label className="block text-white">Apellido</label>
        <input
          onChange={handleChange}
          name="apellido"
          id="apellido"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="text-red-600 mb-2">{errors.apellido}</label>

        <label className="block text-white">Email</label>
        <input
          onChange={handleChange}
          name="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="text-red-600 mb-2">{errors.email}</label>

        <label className="block text-white">Contraseña</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={showPassword ? "https://img.icons8.com/ios-filled/50/000000/visible.png" : "https://img.icons8.com/ios-filled/50/000000/invisible.png"}
              alt={showPassword ? "Show" : "Hide"}
              className="w-5 h-5"
            />
          </button>
        </div>
        <label className="text-red-600 mb-4">{errors.password}</label>
        {hasErrors && (
                    <div className="text-red-500 py-5 pl-5">
                      Campos requeridos *
                    </div>
                  )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
        <Link to="/password" className="block text-center underline mt-2 text-white">
          Olvidó su contraseña?
        </Link>
        
        <p className="text-center mt-4 text-white">
          Al continuar aceptas{" "}
          <Link to="/terms" className="underline text-white">Términos y Condiciones</Link>{" "} |{" "}
          <Link to="/privacy" className="underline text-white">Política de Privacidad</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

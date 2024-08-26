import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/registerSlice";
import style from "../Login/login.module.css";
import logo from "../../assets/images/logofood.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.register);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "" ,
    rol: "usuario"
  });

  useEffect(() => {
    if (status === 'succeeded') {
      navigate("/"); // Redirige a la página principal o al destino deseado
    }
  }, [status, navigate]);

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;  
  const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [errors, setErrors] = useState({
    nombre: "Name cannot be empty",
    apellido: "Last Name cannot be empty",
    email: "Email cannot be empty",
    password: "Password cannot be empty",
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
        imagen: state.imagen 
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
    setFormSubmitted(true);

    if (!disable()) {
      dispatch(registerUser(state))
        .unwrap()
        .then(() => {
          navigate("/login"); // Redirige a la página principal o al destino deseado
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const disable = () => {
    if (formSubmitted) return true;
    let disabled = true;
    for (let error in errors) {
      if (errors[error] === "" || errors[error].length === 0) disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <div>
            <button onClick={() => navigate("/")}>❮</button>
          </div>
          <div className={style.logo}>
            <h2>Registrate y accede a nuestro sitio</h2>
          </div>
        </div>
        <div className={style.right}>
          <form onSubmit={handleSubmit}>
            <div className={style.login}>
              <h5>
                <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto" />
              </h5>
              <h1>Ingresa tus datos para continuar</h1>
              <label htmlFor="">Name</label>
              <input onChange={handleChange} name="nombre" id="nombre" />
              <label className={style.form_error}>{errors.nombre}</label>
              <label htmlFor="">Last Name</label>
              <input onChange={handleChange} name="apellido" id="apellido" />
              <label className={style.form_error}>{errors.apellido}</label>
              <label htmlFor="">Mail</label>
              <input onChange={handleChange} name="email" id="email" />
              <label className={style.form_error}>{errors.email}</label>
              <label htmlFor="">Password</label>
              <input onChange={handleChange} name="password" id="password" />
              <label className={style.form_error}>{errors.password}</label>
              <button
                type="submit"
                name="submit"
                disabled={disable()}
                className={style.buttonStyle}
              >
                Continue
              </button>
              <Link to="/password" className="underline">
                Forgot password?
              </Link>
              <h5>or continue with</h5>
              <div className={style.appBn}>
                <a href="" className={style.buttonApp}>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/012/871/371/non_2x/google-search-icon-google-product-illustration-free-png.png"
                    alt="boton"
                    className={style.resizable}
                  />
                </a>
                <a href="" className={style.buttonApp}>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/716/447/non_2x/facebook-icon-free-png.png"
                    alt="boton"
                    className={style.resizable}
                  />
                </a>
              </div>
              <p>
                Continua y aceptas{" "}
                <Link to="/terms" className="underline">
                  Términos y Condiciones
                </Link>{" "}
                |{" "}
                <Link to="/privacy" className="underline">
                  Política de Privacidad
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
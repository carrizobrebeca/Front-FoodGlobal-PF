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
  const [showPassword, setShowPassword] = useState(false);
  
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    rol: "usuario",
    status: "activo"
  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login"); // Redirige a la página principal o al destino deseado
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      alert(error); // Muestra el error como una alerta
    }
  }, [status, error]);

  // const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  // const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [errors, setErrors] = useState({
    nombre: "Campo requerido",
    apellido: "Campo requerido",
    email: "Campo requerido",
    password: "Campo requerido",
  });

  const validate = (state, name) => {
    if (name === "nombre") {
      if (state.nombre === "")
        setErrors({ ...errors, nombre: "Campo requerido" });
      else if (state.name.length < 3)
        setErrors({ ...errors, nombre: "Formato inválido (al menos 3 letras)" });
      else {
        setErrors({ ...errors, nombre: "" });
        return;
      }
    }

    if (name === "apellido") {
      if (state.apellido === "")
        setErrors({ ...errors, apellido: "Campo requerido" });
      // else if (!apellidoRegex.test(state.apellido))
      //   setErrors({ ...errors, apellido: "Formato inválido" });
      else {
        setErrors({ ...errors, apellido: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Campo requerido" });
      else if (!emailRegex.test(state.email))
        setErrors({ ...errors, email: "Formato de mail inválido" });
      else {
        setErrors({ ...errors, email: "" });
        return;
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Campo requerido" });
      else if (!passwordRegex.test(state.password))
        setErrors({
          ...errors,
          password: "Formato inválido (al menos una mayíscula, al menos un número, entre 6-20 caracteres",
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
    setFormSubmitted(false);

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
              <div className={style.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  id="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={style.showPasswordButton}
                >
                  {showPassword ? (
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/visible.png" // Icono para mostrar
                      alt="Show"
                      className={style.passwordIcon}
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/invisible.png" // Icono para ocultar
                      alt="Hide"
                      className={style.passwordIcon}
                    />
                  )}
                </button>
              </div>
              <label className={style.form_error}>{errors.password}</label>
              <button
                type="submit"
                name="submit"
                // disabled={disable()}
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

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import logo from "../../assets/images/logofood.png";
import { fetchLogin } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.status);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "Email cannot be empty",
    password: "Password cannot be empty",
  });

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      navigate("/"); // Redirige a la página principal o al destino deseado
    }
  }, [loginStatus, navigate]);

  const validate = (state, name) => {
    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email cannot be empty" });
      else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Password cannot be empty" });
      else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "email" || e.target.name === "password") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
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
      dispatch(fetchLogin(state))
        .unwrap()
        .catch((err) => {
          console.error(err);
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
          <div className={style.logo}>Ingresá para continuar !</div>
        </div>
        <div className={style.right}>
          <form onSubmit={handleSubmit}>
            <div className={style.login}>
              <h5>
                <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto" />
              </h5>
              <h1>Login</h1>
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
                Sign in
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
                Al continuar aceptas{" "}
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

export default Login;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import logo from "../../assets/images/logofood.png";
import { fetchLogin } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.login);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "Email cannot be empty",
    password: "Password cannot be empty",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "succeeded") {
      if (user.rol === "socio") {
        navigate("/dashboard");
      } else if (user.rol === "admin") {
        navigate("/dashboardadmin");
      } else {
        navigate("/");
      }
    }
  }, [status, user, navigate]);

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
    setFormSubmitted(false);

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
                Sign in
              </button>
              <Link to="/password" className="underline">
                Forgot password?
              </Link>
              <h5>or continue with</h5>
            
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

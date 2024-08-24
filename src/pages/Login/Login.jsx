import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import style from "./login.module.css";
import logo from "../../assets/images/logofood.png";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /(?=.*\d)/;

  const [errors, setErrors] = useState({
    email: "Email cannot be empty",
    password: "Password cannot be empty",
  });

  const validate = (state, name) => {
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
      else if (state.password.length < 8)
        setErrors({ ...errors, password: "Password is short" });
      else if (state.password.length > 15)
        setErrors({ ...errors, password: "Password is long" });
      else if (!passwordRegex.test(state.password))
        setErrors({
          ...errors,
          password: "Password must contain at least one number",
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
      e.target.name === "email" ||
      e.target.name === "password"
    ) {
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
   
    // dispatch(postUser());
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
          <div className={style.login}>
            <h5>
              <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto" />
            </h5>

            <h1>Login</h1>
            <label htmlFor="">Mail</label>
            <input onChange={handleChange} name="email" id="email"/>
              <label className={style.form_error}>{errors.email}</label>
              <label htmlFor="">Password</label>
              <input onChange={handleChange} name="password" id="password" />
              <label className={style.form_error}>{errors.password}</label>
            <button
              onClick={() => navigate("/")}
              className={style.buttonStyle}
            >
              Sing in
            </button>
            <Link to="/password" className="underline">
              Forgot password?
            </Link>
            <h5>or continue whit</h5>
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
        </div>
      </div>
    </>
  );
};

export default Login;

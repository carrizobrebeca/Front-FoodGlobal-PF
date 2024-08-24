import React from "react";

import { Link, useNavigate } from "react-router-dom";

import style from "../Login/login.module.css";
import logo from '../../assets/images/logofood.png'; 

const Register = () => {
  const navigate = useNavigate();
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
          <div className={style.login}>
          <h5>
                <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto" />
            </h5>
            <h1>Ingresa tus datos para continuar</h1>
            <label htmlFor="">Mail</label>
            <input type="text" />
            <label htmlFor="">Password</label>
            <input type="text" />
            <label htmlFor="">Name</label>
            <input type="text" />
            <label htmlFor="">Last name</label>
            <input type="text" />

            <button onClick={() => navigate("/dashboard")} className={style.buttonStyle}>Continue</button>
            <Link to="/password" className="underline">Forgot password?</Link>
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
            <p>Continua y aceptas <Link to="/terms" className="underline">Términos y Condiciones</Link > | <Link to="/privacy" className="underline">Política de Privacidad</Link> </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

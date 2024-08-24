import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.container}>
        
        <div className={style.left}>
        <div>
        <button onClick={() => navigate("/")}>❮</button>
        </div>
          <div className={style.logo}>
            <h2>GLOBALFOOD</h2>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.login}>
            <h1>Login</h1>
            <label htmlFor="">Mail</label>
            <input type="text" />
            <label htmlFor="">Password</label>
            <input type="text" />

            <button onClick={() => navigate("/home")} className={style.buttonStyle}>Sing in</button>
            <p>Forgot password?</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

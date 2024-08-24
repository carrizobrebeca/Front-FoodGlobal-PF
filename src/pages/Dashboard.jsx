import React from "react";
import style from "./dashBoard.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../components/Cards/Cards";


const DashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div>
        <button onClick={() => navigate("/login")}>❮ Back</button>
        </div>
        <div className={style.imgcontent}>
          <img src="" alt=""  />
        </div>
        <p>Name</p>
        <p>Role</p>
       <option  className={style.btn} onClick={() => navigate("/user")}>&#128394;</option> 

        <div className={style.optionsPanel}>
          <option className={style.btn} onClick={() => navigate("/user")}>👥 Users</option>
          <option className={style.btn} onClick={() => navigate("/products")}>🔲 Products</option>
          <option className={style.btn} onClick={() => navigate("/categories")}> ⠟  Categories</option>
          <option className={style.btn} onClick={() => navigate("/storeConfig")}> 🖉 App Config</option>
          <option className={style.btn} onClick={() => navigate("/saleshistory")}> Sales History</option>
          <option className={style.btn} onClick={() => navigate("/orders")}> Orders</option>
        </div>

        <div>
          <button className={style.buttonApp}>
            <img
              src="https://w7.pngwing.com/pngs/484/210/png-transparent-log-out-feather-icon-thumbnail.png"
              alt=""
              className={style.resizable}
            />
          </button>
          <p>Log out</p>
        </div>
      </div>

      <div className={style.mainContent}>
        <div className={style.nav}>
          <input type="text" name="" id="" placeholder="Search"/>
          <button className={style.buttonApp}>&#128269;</button>
          <button className={style.buttonApp}>&#x1F48C;</button>
          <button className={style.buttonApp}>&#128276;</button>
          <button onClick={() => navigate("/notification")} className={style.buttonApp}>&#128277;</button>
        </div>
        <div className={style.content}>
          <div>
            <h2>Payments</h2>
            <p>Completados - Pendientes- Rechazados / Demora</p>
            <Cards />
            <Link to="" className={style.view}>View More</Link>
          </div>
          <div>
            <h2>Popular Products</h2>
            <Cards />
            <Link to="" className={style.view}>View More</Link>
          </div>
          <div>
            <h2>Categories</h2>
            <Cards />
            <Link to="" className={style.view}>View More</Link>
          </div>
          <div>
            <h2>Analytics</h2>
            <p>Ventas Mensuales - Mensajes / interacciones / críticas negativas /lugares de mayor venta- usuarios nuevos - </p>
            <Cards />
            <Link to="" className={style.view}>View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";
import axios from "axios";
import Card from "../components/Card/Card"; // Asegúrate de que la ruta sea correcta

import style from "./dashBoard.module.css";

import { useDispatch } from "react-redux";

const DashBoardAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [socios, setSocios] = useState([]);
 
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/usuarios");
      const data = response.data;

      // Filtra el usuario con rol 'socio'
      const adminUser = data.find((user) => user.rol === "admin");
      setUser(adminUser);

      // Filtra los usuarios con rol 'usuario', ordénalos y toma los 5 más recientes
      const recentUsers = data
        .filter((user) => user.rol === "usuario")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setUsers(recentUsers);

      // Filtra los usuarios con rol 'socio', ordénalos y toma los 5 más recientes
      const recentSocios = data
        .filter((socio) => socio.rol === "socio")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setSocios(recentSocios);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // El array vacío asegura que solo se llame una vez al montar el componente

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div>
          <button onClick={() => navigate("/login")}>❮ Back</button>
        </div>{" "}
        <img src={user?.imagen} alt="User" />
       
        <div>
          <p>{user?.nombre + " " + user?.apellido || "Name"}</p>
          <p>{user?.rol || "Role"}</p>
        </div>
        <div className={style.optionsPanel}>
        <div>
            <button className={style.btn} onClick={() => navigate("/users")}>
              🔲 Users
            </button>
          </div>
          <div>
            <button className={style.btn} onClick={() => navigate("/products")}>
              🔲 Products
            </button>
          </div>
          <div>
            <button
              className={style.btn}
              onClick={() => navigate("/categories")}
            >
              {" "}
              ⠟ Categories
            </button>
          </div>
          <div>
            <button className={style.btn} onClick={() => navigate("/orders")}>
              Orders
            </button>
          </div>
          <div>
            <button
              className={style.btn}
              onClick={() => navigate("/saleshistory")}
            >
              Sales History
            </button>
          </div>
          <div>
            <button
              className={style.btn}
              onClick={() => navigate("/storeConfig")}
            >
              {" "}
              🖉 App Config
            </button>
          </div>
        </div>
        <div>
          <button onClick={handleLogout} className={style.buttonApp}>
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
          {/* <input type="text" name="" id="" placeholder="Search" />
          <button className={style.buttonApp}>&#128269;</button>
          <button className={style.buttonApp}>&#x1F48C;</button>
          <button className={style.buttonApp}>&#128276;</button>
          <button
            onClick={() => navigate("/notification")}
            className={style.buttonApp}
          >
            &#128277;
          </button> */}
        </div>
        <div className={style.content}>
          <h2>Recent Users</h2>
          <div className={style.cardsContainer}>
            {users.length > 0 ? (
              users.map((user) => (
                <Card key={user.id} item={user} /> // Pasa el usuario individualmente
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
          <Link to="/users" className={style.view}>
            View More
          </Link>
        </div>
        <div className={style.content}>
          <h2>Recent Socios</h2>
          <div className={style.cardsContainer}>
            {socios.length > 0 ? (
              socios.map((socio) => (
                <Card key={socio.id} item={socio} /> // Pasa el socio individualmente
              ))
            ) : (
              <p>No socios found</p>
            )}
          </div>
          <Link to="" className={style.view}>
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
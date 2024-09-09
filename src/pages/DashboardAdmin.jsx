import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";
import axios from "axios";
import Card from "../components/Card/Card";
import style from "./dashBoard.module.css";

import { useDispatch } from "react-redux";

const DashBoardAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [socios, setSocios] = useState([]);
  const [allNegocios, setAllNegocios] = useState([]);
  const [negoRec, setNegoRec] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, []);

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/negocios");
        const negocios = response.data;
        setAllNegocios(negocios);
        const negociosRecientes = negocios
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setNegoRec(negociosRecientes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocios();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <aside className="bg-gray-100 w-64 p-5 border-r-2 border-gray-200 flex-shrink-0">
        <button
          className="mb-4 text-slate-600 flex justify-between items-center w-full"
          onClick={() => navigate("/")}
          aria-label="Ir al inicio"
        >
          <span>❮</span>
          <span className="flex-1 text-center">Inicio</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center mb-10 mt-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-100 to-gray-200">
          <img
            src={user?.imagen}
            alt="User"
            className="w-20 h-20 rounded-full bg-gray-500 mb-2 mt-2"
          />
          <div className="text-left">
            <p className="text-xl">
              {user?.nombre + " " + user?.apellido || "Nombre"}
            </p>
            <p>{user?.rol || "Rol"}</p>
          </div>
        </div>
        <div className="mt-12 mb-12">
          <button
            className="w-full py-2 mb-4 text-slate-600 flex justify-between items-center"
            onClick={() => navigate("/users")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Usuarios
            <span>›</span>
          </button>
          <button
            className="w-full py-2 mb-4 text-slate-600 flex justify-between items-center"
            onClick={() => navigate("/products")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            Productos
            <span>›</span>
          </button>
          <button
            className="w-full py-2 mb-4 text-slate-600 flex justify-between items-center"
            onClick={() => navigate("/createnegocio")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
            Negocios
            <span>›</span>
          </button>
          <button
            className="w-full py-2 mb-4 text-slate-600 flex justify-between items-center"
            onClick={() => navigate("/saleshistory")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Configuración
            <span>›</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white-100 overflow-y-auto">
        <nav className="bg-gray-100 text-black pb-20 border-b-2 border-gray-200">
          {/* Agrega botones de navegación aquí si es necesario */}
        </nav>
        <div className="p-4 bg-white rounded-xl flex-1">
          <h2 className="text-2xl">Usuarios recientes de la plataforma</h2>
          <div className="flex overflow-x-auto gap-2">
            {users.length > 0 ? (
              users.map((user) => <Card key={user.id} item={user} />)
            ) : (
              <p>Parece que no hay nuevos usuarios...</p>
            )}
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl flex-1">
          <h2 className="text-2xl">Socios recientes</h2>
          <div className="flex overflow-x-auto gap-2">
            {socios.length > 0 ? (
              socios.map((socio) => <Card key={socio.id} item={socio} />)
            ) : (
              <p>Parece que no hay socios nuevos...</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl mt-4 flex-1">
          <h2 className="text-2xl mb-4">Nuevos Negocios</h2>
          <div className="flex overflow-x-auto gap-2">
            {allNegocios.length > 0 ? (
              allNegocios.map((negocio) => (
                <Card key={negocio.id} item={negocio} />
              ))
            ) : (
              <p>Parece que no hay nuevos negocios aún...</p>
            )}
          </div>
        </div>
      </main>
    </div>
    // <div className={style.container}>
    //   <div className={style.sidebar}>
    //     <div>
    //       <button onClick={() => navigate("/login")}>❮ Back</button>
    //     </div>{" "}
    //     <img src={user?.imagen} alt="User" />
    //     <div>
    //       <p>{user?.nombre + " " + user?.apellido || "Name"}</p>
    //       <p>{user?.rol || "Rol"}</p>
    //     </div>
    //     <div className={style.optionsPanel}>
    //     <div>
    //         <button className={style.btn} onClick={() => navigate("/users")}>
    //           🔲 Usuarios
    //         </button>
    //       </div>
    //       <div>
    //         <button className={style.btn} onClick={() => navigate("/products")}>
    //           🔲 Productos
    //         </button>
    //       </div>
    //       <div>
    //         <button className={style.btn} onClick={() => navigate("/createnegocio")}>
    //           🔲 Negocio
    //         </button>
    //       </div>
    //       <div>
    //         <button
    //           className={style.btn}
    //           onClick={() => navigate("/storeConfig")}
    //         >
    //           {" "}
    //           🖉 App Config
    //         </button>
    //       </div>
    //     </div>
    //     <div>
    //       <button onClick={handleLogout} className={style.buttonApp}>
    //         <img
    //           src="https://w7.pngwing.com/pngs/484/210/png-transparent-log-out-feather-icon-thumbnail.png"
    //           alt=""
    //           className={style.resizable}
    //         />
    //       </button>
    //       <p>Log out</p>
    //     </div>
    //   </div>

    //   <div className={style.mainContent}>
    //     <div className={style.nav}>
    //       {/* <input type="text" name="" id="" placeholder="Search" />
    //       <button className={style.buttonApp}>&#128269;</button>
    //       <button className={style.buttonApp}>&#x1F48C;</button>
    //       <button className={style.buttonApp}>&#128276;</button>
    //       <button
    //         onClick={() => navigate("/notification")}
    //         className={style.buttonApp}
    //       >
    //         &#128277;
    //       </button> */}
    //     </div>
    //     <div className={style.content}>
    //       <h2>Usuarios recientes de la plataforma</h2>
    //       <div className={style.cardsContainer}>
    //         {users.length > 0 ? (
    //           users.map((user) => (
    //             <Card key={user.id} item={user} /> // Pasa el usuario individualmente
    //           ))
    //         ) : (
    //           <p>Parece que no hay nuevos usuarios...</p>
    //         )}
    //       </div>
    //       <Link to="/users" className={style.view}>
    //         View More
    //       </Link>
    //     </div>
    //     <div className={style.content}>
    //       <h2>Nuevos Socios</h2>
    //       <div className={style.cardsContainer}>
    //         {socios.length > 0 ? (
    //           socios.map((socio) => (
    //             <Card key={socio.id} item={socio} />
    //           ))
    //         ) : (
    //           <p>Parece que no hay socios nuevos...</p>
    //         )}
    //       </div>
    //       <Link to="" className={style.view}>
    //         View More
    //       </Link>
    //     </div>
    //     <div className={style.content}>
    //       <h2>Nuevos Negocios</h2>
    //       <div className={style.cardsContainer}>
    //         {allNegocios.length > 0 ? (
    //           allNegocios.map((negocio) => (
    //             <Card key={negocio.id} item={negocio} />
    //           ))
    //         ) : (
    //           <p>Parece que no hay negocios nuevos...</p>
    //         )}
    //       </div>
    //       <Link to="" className={style.view}>
    //         View More
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DashBoardAdmin;

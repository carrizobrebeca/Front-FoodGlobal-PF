import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const [users, setUsers] = useState([]);
  const [allNegocios, setAllNegocios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/usuarios`);
      const data = response.data;

      const recentUsers = data
        .filter((user) => user.rol === "usuario")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setUsers(recentUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null); // Resetear el error
      const response = await axios.get(`https://back-foodglobal-pf.up.railway.app/negocios`);
      const negocios = response.data;
      // Filtrar negocios que pertenecen al usuario
      const userNegocios = negocios.filter(
        (negocio) => negocio.usuario_id === user.id
      );
      setAllNegocios(userNegocios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
    fetchData();
  }, [user]);
  return (
    <>
      <div className="bg-gray-200 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300">
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src={user?.imagen ||
              "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}
            className="w-20 h-20 object-cover rounded-full ring-4 ring-blue-300"
          />
          <h2 className="text-xl text-blue-500 font-bold">{user?.nombre}</h2>
          <h2 className="bg-blue-500 py-2 px-4 rounded-full text-white font-bol">
            {user?.rol}
          </h2>
        </div>

        <div className="bg-blue-500 p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              Dashboard <span>›</span>
            </button>
         
            <button
              onClick={() => navigate("/createnegocio")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
              Negocios <span>›</span>
            </button>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              Productos <span>›</span>
            </button>
            <button
              onClick={() => navigate("/pedidos")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              Pedidos <span>›</span>
            </button>

          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400"></p>
            <a href="#"></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

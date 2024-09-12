import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";
import axios from "axios";
import Card from "../components/Card/Card"; // Asegúrate de que la ruta sea correcta
import { useDispatch, useSelector } from "react-redux";



const DashboardSocio = () => {
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
      // Filtra los usuarios con rol 'usuario', ordénalos y toma los 5 más recientes
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
            onClick={() => navigate("/orders")}
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            Pedidos
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Historial de Ventas
            <span>›</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white-100 overflow-y-auto">
        <nav className="bg-gray-100 text-black p-4 border-b-2 border-gray-200">
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
          <Link to="/users" className="text-orange-500 flex justify-end mt-2">
            View More
          </Link>
        </div>

        <div className="p-4 bg-white rounded-xl mt-4 flex-1">
          <h2 className="text-2xl mb-4">Tu Negocio</h2>
          <div className="flex overflow-x-auto gap-2">
            {allNegocios.length > 0 ? (
              allNegocios.map((negocio) => (
                <Card key={negocio.id} item={negocio} />
              ))
            ) : (
              <p>Parece que no tienes un negocio aún...</p>
            )}
          </div>
          <Link to="/users" className="text-orange-500 flex justify-end mt-2">
            View More
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardSocio;

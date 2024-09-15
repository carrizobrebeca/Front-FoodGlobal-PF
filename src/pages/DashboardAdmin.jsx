import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import CardsProducts from "../components/CardsProducts";
import CardDashboard from "../components/CardDashboard";
import SidebarAdmin from "../components/SidebarAdmin";

const DashBoardAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [socios, setSocios] = useState([]);
  const [allNegocios, setAllNegocios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [negoRec, setNegoRec] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userStats, setUserStats] = useState({
    currentMonthCount: 0,
    previousMonthCount: 0,
    percentageChange: 0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios`);
      const data = response.data;

      // Get the current and previous months
      const now = new Date();
      const currentMonth = now.getMonth(); // 0-based month index (0 = January)
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const currentYear = now.getFullYear();
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      // Function to get month and year from a date
      const getMonthYear = (dateString) => {
        const date = new Date(dateString);
        return { month: date.getMonth(), year: date.getFullYear() };
      };

      // Filter users by the current and previous months
      const counts = data.reduce(
        (acc, user) => {
          const { month, year } = getMonthYear(user.createdAt);
          if (year === currentYear && month === currentMonth) {
            acc.currentMonth++;
          } else if (year === previousYear && month === previousMonth) {
            acc.previousMonth++;
          }
          return acc;
        },
        { currentMonth: 0, previousMonth: 0 }
      );

      // Calculate the percentage change
      const percentageChange =
        counts.previousMonth > 0
          ? ((counts.currentMonth - counts.previousMonth) /
              counts.previousMonth) *
            100
          : counts.currentMonth > 0
          ? 100
          : 0;

      // Update state with user data and statistics
      const recentUsers = data
        .filter((user) => user.rol === "usuario")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setUsers(recentUsers);
      setUserStats({
        currentMonthCount: counts.currentMonth,
        previousMonthCount: counts.previousMonth,
        percentageChange: percentageChange.toFixed(2),
      });
      const recentSocios = data
        .filter((socio) => socio.rol === "socio")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setSocios(recentSocios);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  
  };
  const fetchProductos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/productos`);
      const data = response.data;
      // Filtra los usuarios con rol 'usuario', ordénalos y toma los 5 más recientes
      const blockProducts = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setProductos(blockProducts);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/negocios`);
        const negocios = response.data;
        setAllNegocios(negocios);
        const negociosRecientes = negocios
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

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
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <SidebarAdmin />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
          <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6 bg-gradient-to-r from-green-300 via-yellow-100 to-yellow-200">
            <span className="py-1 px-3 text-green-700 rounded-full">
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
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </span>
            <h4 className="text-2xl text-green-700">Ventas totales</h4>
            <span className="text-5xl text-green-800">$ 8,350</span>
            <span className="py-1 px-3 bg-white text-green-700 rounded-full">
              + 10% mes anterior
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl bg-gradient-to-r from-orange-300 via-yellow-100 to-yellow-200">
            <div className="flex items-center gap-4 bg-white rounded-xl p-4">
              <span className="bg-orange-400 text-gray-200 text-2xl font-bold p-4 rounded-xl">
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
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </span>
              <div>
                <h3 className="font-bold">Socios</h3>
                <p className="text-gray-500">En este mes</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                
                
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-orange-400 text-gray-200 text-2xl font-bold p-4 rounded-xl">
                  {userStats.currentMonthCount}
                </span>
                <div>
                  <h3 className="font-bold">Usuarios</h3>
                  <p>nuevos este mes</p>
                  <p className="text-gray-500"></p>
                  <p>
                    
                    {userStats.percentageChange > 0
                      ? `+${userStats.percentageChange}%`
                      : `${userStats.percentageChange}%`} / mes anterior
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col justify-between ">
            <h1 className="text-2xl font-bold text-gray-500 ">
              Socios recientes
            </h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl bg-gradient-to-r from-indigo-300 via-indigo-100 to-yellow-200">
              {/* <div className="p-4 bg-white rounded-xl flex-1"> */}

              <div className="flex overflow-x-auto gap-2">
                {socios.length > 0 ? (
                  socios.map((user) => (
                    <CardDashboard key={user.id} item={user} />
                  ))
                ) : (
                  <p>Parece que no hay nuevos usuarios...</p>
                )}
              </div>

              <div className="flex justify-end">
                <a
                  href="/users"
                  className="hover:text-orange-600 transition-colors hover:underline"
                >
                  Todos los usuarios
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-8 text-gray-500 mb-8">
              Productos agregados recientemente
            </h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <CardsProducts key={producto.id} item={producto} />
                ))
              ) : (
                <p>Parece que no hay productos nuevos...</p>
              )}
              <div className="flex justify-end">
                <a
                  href="/products"
                  className="hover:text-orange-600 transition-colors hover:underline"
                >
                  Todos los productos
                </a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-500 mb-8">
              Nuevos negocio
            </h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-5">
              {negoRec.length > 0 ? (
                negoRec.map((negocio) => (
                  <CardsProducts key={negocio.id} item={negocio} />
                ))
              ) : (
                <p>Parece que no hay productos bloqueados...</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashBoardAdmin;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuarios");
        const users = response.data;

        const usuariosPendientes = users.filter(
          (user) => user.status === "pendiente"
        );

        setNotifications(usuariosPendientes);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationOpen((prev) => !prev);
  };

  const handleViewClick = (id) => {
    navigate(`/users`);
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-gray-200">
      <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
        Dashboard
      </h1>
      <form className="w-full md:w-auto">
        <div className="relative">
          <button
            className="text-orange-600 flex items-center space-x-2 mr-6 animate-pulse"
            title="Solicitud de Socios"
            onClick={handleNotificationClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </button>

          {isNotificationOpen && (
            <div
              style={{
                width: '300px',
                left: '0px', // Ajusta el valor de left para mover el panel hacia la izquierda
                transform: 'translateX(-90%)', // Mueve el panel hacia la izquierda completamente
              }}
              className="absolute top-full mt-2 bg-white shadow-lg border border-gray-300 rounded-md p-4"
            >
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="mb-4">
                    <p>{`${notification.nombre} ${notification.apellido} solicitó volverse socio de la plataforma`}</p>
                    <button
                      onClick={() => handleViewClick(notification.id)}
                      className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    >
                      Ver
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay notificaciones</p>
              )}
            </div>
          )}
        </div>
      </form>
    </header>
  );
};

export default HeaderAdmin;

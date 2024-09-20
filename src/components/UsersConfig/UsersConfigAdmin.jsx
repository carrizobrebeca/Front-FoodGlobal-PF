import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { editUser } from "../../store/registerSlice";
import { useDispatch } from "react-redux";
import Header from "../Header";
import SidebarAdmin from "../SidebarAdmin";

const UsersConfigAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://back-foodglobal-pf.up.railway.app/usuarios");
        const users = response.data;
        setUsers(users);
        setFilteredUsers(users);

        const usuariosPendientes = users.filter(
          (user) => user.status === "pendiente"
        );
        setPendientes(usuariosPendientes);
        setNotifications(usuariosPendientes);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.rol === selectedRole);
      setFilteredUsers(filtered);
    }
  }, [selectedRole, users]);

  useEffect(() => {
    if (selectedStatus === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.status === selectedStatus);
      setFilteredUsers(filtered);
    }
  }, [selectedStatus, users]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const uniqueRoles = [...new Set(users.map((user) => user.rol))];
  const uniqueStatus = [...new Set(users.map((user) => user.status))];
  const handleBlockUser = async (id) => {
    const confirmBlock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea bloquear el usuario?"
    );

    if (confirmBlock) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = { ...userToUpdate, status: "bloqueado" };

      try {
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario bloqueado con éxito");
      } catch (error) {
        console.error("Error al bloquear el usuario:", error);
        alert("Error al bloquear el usuario");
      }
    }
  };

  const handleUnblockUser = async (id) => {
    const confirmUnblock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea desbloquear el usuario?"
    );

    if (confirmUnblock) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = { ...userToUpdate, status: "activo" };

      try {
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario desbloqueado con éxito");
      } catch (error) {
        console.error("Error al desbloquear el usuario:", error);
        alert("Error al desbloquear el usuario");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea eliminar el usuario?"
    );

    if (confirmDelete) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = { ...userToUpdate, status: "eliminado" };

      try {
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Error al eliminar el usuario");
      }
    }
  };
  const handleSocio = async (id) => {
    const confirmUnblock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea asociar este usuario?"
    );

    if (confirmUnblock) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = {
        ...userToUpdate,
        status: "activo", // Asegúrate de que esto sea permitido en tu lógica
        rol: "socio",
      };

      try {
        console.log("Updating user with data:", updatedUserData); // Debugging
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario asociado con éxito");
      } catch (error) {
        console.error("Error al asociar el usuario:", error);
        alert("Error al asociar el usuario");
      }
    }
  };
  const getStockColorClass = (status) => {
    if (status === "eliminado") return "text-red-500";
    if (status === "activo") return "text-green-500";
    if (status === "pendiente") return "text-blue-500";
    return "text-orange-500"; // stock <= 50
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <SidebarAdmin />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />

        <div className="p-10 bg-gray-200">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-500 cursor-pointer"
            >
              ❮ Back
            </button>
            <button
              onClick={() => navigate("/createusers")}
              className="text-white bg-blue-500 rounded-md p-2 cursor-pointer"
            >
              Crear Usuario
            </button>
          </div>

          <div className="relative flex justify-center items-center bg-gray-100 rounded-md mb-4 p-10">
            <button
              className="text-orange-600 flex items-center space-x-2"
              title="Socios Pendientes"
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
              <span>Notificaciones</span>
            </button>

            {/* Notification panel */}
            {isNotificationOpen && (
              <div className="absolute top-full mt-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-orange-300 rounded-md p-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <p
                      key={notification.id}
                    >{`${notification.nombre} ${notification.apellido} solicita volverse socio`}</p>
                  ))
                ) : (
                  <p>No hay notificaciones</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 p-2.5 bg-gray-100 rounded-md mb-4">
            <div className="flex flex-col items-center">
              <label className="mr-2 text-blue-500">Rol</label>
              <select
                onChange={handleRoleChange}
                value={selectedRole}
                name="rol"
                id="rol"
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Todos los usuarios</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center">
              <label className="mr-2 text-blue-500">Estado</label>
              <select
                onChange={handleStatusChange}
                value={selectedStatus}
                name="status"
                id="status"
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Todos los usuarios</option>
                {uniqueStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center bg-gray-100 rounded-md mb-4"></div>

          <div className="grid grid-cols-9 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100">
            <div className="flex items-center justify-center p-2 rounded-md">
              Imagen
            </div>
            <div className="flex items-center justify-center p-2 rounded-md">
              Nombre
            </div>
            <div className="flex items-center justify-center p-2 rounded-md">
              Apellido
            </div>
            <h2></h2>
            <div className="flex items-center justify-center p-2 rounded-md">
              Email
            </div>
            <h2></h2>
            <div className="flex items-center justify-center p-2 rounded-md">
              Rol
            </div>
            <div className="flex items-center justify-center p-2 rounded-md">
              Estado
            </div>

            <div className="flex items-center justify-center p-2 rounded-md"></div>
          </div>

          <div className="flex flex-col gap-2.5">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-9 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        user.imagen ||
                        "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      }
                      alt={user.imagen}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <h2 className="m-0 flex items-center justify-center">
                    {user.nombre}
                  </h2>
                  <h2 className="m-0 flex items-center justify-center">
                    {user.apellido}
                  </h2>
                  <h2></h2>
                  <h2 className="m-0 flex items-center justify-center">
                    {user.email}
                  </h2>
                  <h2></h2>
                  <h2 className="m-0 flex items-center justify-center">
                    {user.rol}
                  </h2>
                  <h2
                    className={`m-0 flex items-center justify-center ${getStockColorClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </h2>
                  {/* <h2 className="m-0 flex items-center justify-center">
                    {user.id}
                  </h2> */}
                  <div className="relative flex items-center justify-center">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="flex items-center justify-center text-blue-600"
                      title="Más acciones"
                    >
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    {dropdownOpen[user.id] && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                        >
                          Desbloquear
                        </button>
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="block w-full text-left px-4 py-2 text-orange-600 hover:bg-gray-100"
                        >
                          Bloquear
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => handleSocio(user.id)}
                          className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                        >
                          Asociar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-blue-500">No users found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersConfigAdmin;
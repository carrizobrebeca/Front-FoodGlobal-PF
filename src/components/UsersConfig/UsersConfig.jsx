import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { editUser } from "../../store/registerSlice";
import { useDispatch } from "react-redux";

const UsersConfig = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuarios");
        const users = response.data;
        setUsers(users);
        setFilteredUsers(users); // Mostrar todos los usuarios al principio
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole === "") {
      setFilteredUsers(users); // Mostrar todos los usuarios si no se selecciona ningún rol
    } else {
      const filtered = users.filter((user) => user.rol === selectedRole);
      setFilteredUsers(filtered);
    }
  }, [selectedRole, users]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Obtener roles únicos para el <select>
  const uniqueRoles = [...new Set(users.map((user) => user.rol))];
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
      "ADVERTENCIA: ¿Está seguro que desea desbloquear el producto?"
    );

    if (confirmUnblock) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = { ...userToUpdate, status: "activo" };

      try {
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario bloqueado con éxito");
      } catch (error) {
        console.error("Error al bloquear el usuario:", error);
        alert("Error al bloquear el usuario");
      }
    }
  };
  const handleDeleteUser = async (id) => {
    const confirmBlock = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea eliminar el usuario?"
    );

    if (confirmBlock) {
      const userToUpdate = users.find((user) => user.id === id);
      const updatedUserData = { ...userToUpdate, status: "eliminado" };

      try {
        await dispatch(editUser({ id, userData: updatedUserData }));
        alert("Usuario bloqueado con éxito");
      } catch (error) {
        console.error("Error al bloquear el usuario:", error);
        alert("Error al bloquear el usuario");
      }
    }
  };
  const getStockColorClass = (status) => {
    if (status === "eliminado") return "text-red-500";
    if (status === "activo") return "text-green-500";
    return "text-orange-500"; // stock <= 50
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
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

      <div className="grid grid-cols-3 p-5 gap-2.5 bg-gray-100 rounded-md mb-4">
        <button className="flex justify-center items-center bg-gray-700 text-white p-2 rounded-md bg-green-500">
          Activos
        </button>
        <button className="flex justify-center items-center bg-gray-700 text-white p-2 rounded-md bg-orange-500">
          Bloqueados
        </button>
        <button className="flex justify-center items-center bg-gray-700 text-white p-2 rounded-md bg-red-500">
          Eliminados
        </button>
      </div>

      <div className="flex justify-center items-center bg-gray-100 rounded-md mb-4">
        <label className="mr-2 text-blue-500">Rol </label>
        <select
          onChange={handleRoleChange}
          value={selectedRole}
          name="rol"
          id="rol"
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos los usuarios</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-10 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100">
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
        <div className="flex items-center justify-center p-2 rounded-md">
          Id
        </div>
        <div className="flex items-center justify-center p-2 rounded-md">
         
        </div>
       
      </div>

      <div className="flex flex-col gap-2.5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-10 gap-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-100"
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
              <h2 className={`m-0 flex items-center justify-center ${getStockColorClass(user.status)}`}>
                {user.status}
              </h2>
              <h2 className="m-0 flex items-center justify-center">
                {user.id}
              </h2>
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
  );
};

export default UsersConfig;

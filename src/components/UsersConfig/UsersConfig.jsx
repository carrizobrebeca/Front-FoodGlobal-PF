import React, { useEffect, useState } from "react";
import style from "./usersConfig.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersConfig = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/usuarios");
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

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cont}>
          <button onClick={() => navigate("/dashboard")}>❮ Back</button>
          <button onClick={() => navigate("/createusers")}>  Editar Usuarios</button>
        </div>

        <div className={style.container}>
          <h2>All</h2>
          <h2>Active</h2>
          <h2>Pending</h2>
          <h2>Banned</h2>
          <h2>Reject</h2>
        </div>

        <div className={style.container}>
          <label>Role |</label>
          <select onChange={handleRoleChange} name="rol" id="rol" value={selectedRole}>
            <option value="">All Users</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          
        </div>

        <div className={style.container}>
          <button></button>
          <h2>Name ↑</h2>
          <h2>Last Name</h2>
          <h2>Email</h2>
          <h2>Role</h2>
          <h2>Status</h2>
        </div>

        <div className={style.userList}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className={style.container}>
                <div className={style.content}>
                  <img
                    src={
                      user.imagen ||
                      "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                    }
                    alt="User"
                  />
                </div>

                <h2>{user.nombre}</h2>
                <h2>{user.apellido}</h2>
                <h2>{user.email}</h2>
                <h2>{user.rol}</h2>
                <h2 >{user.status}</h2>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersConfig;

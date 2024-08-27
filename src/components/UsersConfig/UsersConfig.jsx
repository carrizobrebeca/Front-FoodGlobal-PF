import React, { useEffect, useState } from "react";
import style from "./usersConfig.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersConfig = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuarios");
        const users = response.data;
        // Filtra los usuarios con rol usuario
        const filteredUsers = users.filter((user) => user.rol === "usuario");
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cont}>
          <button onClick={() => navigate("/dashBoard")}>❮ Back</button>
          <button onClick={() => navigate("/createUser")}>Edit users</button>
        </div>

        <div className={style.container}>
          <h2>All</h2>
          <h2>Active</h2>
          <h2>Pending</h2>
          <h2>Banned</h2>
          <h2>Reject</h2>
        </div>

        <div className={style.container}>
          <select name="Role" id="">
            <option>Role</option>
          </select>
          <input type="text" placeholder="Search" />
          <button>&#128269;</button>
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
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className={style.container}>
                <div className={style.content}>
                  <img
                    src={
                      user.foto ||
                      "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                    }
                    alt="User"
                  />
                </div>

                <h2>{user.nombre}</h2>
                <h2>{user.apellido}</h2>
                <h2>{user.email}</h2>
                <h2>{user.rol}</h2>
                <h2 className={style.status}>Active</h2>
               
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

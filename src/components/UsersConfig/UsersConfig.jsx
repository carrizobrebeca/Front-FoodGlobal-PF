import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UsersConfigAdmin from "./UsersConfigAdmin";
import { useSelector } from "react-redux";

const UsersConfig = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (user) {
      if (user.rol !== "admin") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <>
      {user?.rol === "admin" && <UsersConfigAdmin />}
      
    </>
  );
};

export default UsersConfig;

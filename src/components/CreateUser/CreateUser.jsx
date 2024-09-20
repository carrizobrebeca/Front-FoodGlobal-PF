import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {useSelector } from "react-redux";
import CreateUserAdmin from "./CreateUserAdmin";


const CreateUser = () => {
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
      {user?.rol === "admin" && <CreateUserAdmin />}
      
    </>
  );
};

export default CreateUser;

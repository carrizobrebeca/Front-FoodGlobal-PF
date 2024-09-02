import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../store/loginSlice";
import axios from "axios";
import Card from "../components/Card/Card"; // Asegúrate de que la ruta sea correcta

import style from "./dashBoard.module.css";

import { useDispatch, useSelector } from "react-redux";
import DashBoardAdmin from "./DashboardAdmin";
import DashboardSocio from "./DashboardSocio";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.login);
  // if (usuario?.rol !== "admin" && usuario?.rol !== "socio") {
  //   return <Navigate to="/" />;
  // }

  useEffect(() => {
    if (user) {
      if (user?.rol !== "admin" && user?.rol !== "socio") {
        return <Navigate to="/" />;
      }
    }
  }, [user]);
  console.log(user);

  return (
    <>
      {user?.rol === "admin" && <DashBoardAdmin />}
      {user?.rol === "socio" && <DashboardSocio />}
    </>
  );
};

export default DashBoard;

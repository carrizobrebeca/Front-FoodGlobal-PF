import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashBoardAdmin from "./DashboardAdmin";
import DashboardSocio from "./DashboardSocio";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (user) {
      if (user.rol !== "admin" && user.rol !== "socio") {
        navigate("/");
      }
    }
  }, [user, navigate]);



  return (
    <>
      {user?.rol === "admin" && <DashBoardAdmin />}
      {user?.rol === "socio" && <DashboardSocio />}
    </>
  );
};

export default DashBoard;

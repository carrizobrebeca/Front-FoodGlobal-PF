import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CreateNegocioSocio from "./CreateNegocioSocio";
import CreateNegocioAdmin from "./CreateNegocioAdmin2";

const CreateNegocio = () => {
  const navigate = useNavigate();
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
      {user?.rol === "admin" && <CreateNegocioAdmin />}
      {user?.rol === "socio" && <CreateNegocioSocio />}
    </>
  );
};

export default CreateNegocio;

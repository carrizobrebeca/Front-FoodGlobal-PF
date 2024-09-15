import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductsConfigAdmin from "./ProductsConfigAdmin";
import ProductsConfigSocio from "./ProductsConfigSocio";

const ProductsConfig = () => {
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
      {user?.rol === "admin" && <ProductsConfigAdmin />}
      {user?.rol === "socio" && <ProductsConfigSocio />}
    </>
  );
};

export default ProductsConfig;

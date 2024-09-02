import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  
  const { user } = useSelector((state) => state.login);

  // Si el user no está autenticado
  if (!user || allowedRoles.includes(user?.rol)) {
    return <Navigate to="/home"/>;
  }

  
  return children;
};

export default ProtectedRoute;

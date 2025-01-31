import React from "react";
import { useAuth } from "./context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function Proteccion() {
  const { user, online, loading } = useAuth();
  if (loading) return <h1>Cargando....</h1>;
  if (!online && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default Proteccion;

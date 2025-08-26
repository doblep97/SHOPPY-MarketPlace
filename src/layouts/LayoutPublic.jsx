import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutPublic = () => {
  // El componente <LayoutPublic /> engloba a las rutas anidadas, actúa como estructura base
  // En <Outlet /> se renderiza el componente hijo correspondiente a la ruta y El <footer> es compartido por
  // todas las subrutas (Inicio, Contacto, Blog)
  return (
    <>
      <Header />
      <Outlet />
      <h4>footer</h4>
    </>
  );
};

export default LayoutPublic;

import { Button } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams(); // lee el parámetro dinámico ":id"
  return (
    <>
      <h1>Detalle del producto</h1>
      <p>ID:{id}</p>
    </>
  );
};

export default Products;

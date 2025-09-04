import { Button, Box, Typography, Container } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

//TODO hacer imagen del product y boton mas responsiva en pantallas pequeñas

const Product = () => {
  const { id } = useParams(); // lee el parámetro dinámico ":id" en concreto

  const { products, addToCart } = useOutletContext();

  //Encuentra dentro del array de todos los productos, el producto que seleccionamos
  const getProduct = products.find((product) => id === product.id);

  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <Container
      sx={{
        py: 5,
        width: { xs: "75%", md: "100%" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        justifyContent: "center",
      }}
    >
      <Box component={"img"} src={getProduct.image}></Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={4}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "block" },
            justifyContent: { xs: "space-between", md: "center" },
            alignItems: { xs: "center" },
          }}
        >
          <Typography variant="h4">{getProduct.name}</Typography>
          <Typography variant="h6">
            {EUR_FORMAT.format(getProduct.price)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => addToCart(getProduct)}
          sx={{
            backgroundColor: "#ff7940",
            color: "white",
            "&:hover": { backgroundColor: "#e6642e" },
            width: { xs: "60%", md: "100%" },
            margin: { xs: "auto", md: 0 },
          }}
        >
          Añadir al carrito
        </Button>
      </Box>
    </Container>
  );
};

export default Product;

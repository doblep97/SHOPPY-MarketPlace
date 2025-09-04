import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router-dom";

const Catalogo = () => {
  const { products } = useOutletContext();

  return (
    <>
      <Container sx={{ py: 3, width: { xs: "85%", md: "100%" } }}>
        <Grid container spacing={2}>
          {/*  Grid conteneder con todos los productos separados por un espacio de 2 */}
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {/*  Grid que según el tamaño de la pantalla muestra una cantidad de productos */}
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Catalogo;

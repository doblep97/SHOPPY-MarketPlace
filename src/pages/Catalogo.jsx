import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Catalogo = () => {
  const products = [
    {
      id: "1",
      name: "Auriculares Pro",
      price: 99.9,
      image: "https://picsum.photos/seed/1/600/400",
    },
    {
      id: "2",
      name: "Zapatillas Run",
      price: 79.5,
      image: "https://picsum.photos/seed/2/600/400",
    },
    {
      id: "3",
      name: "Mochila Urban",
      price: 49.0,
      image: "https://picsum.photos/seed/3/600/400",
    },
    {
      id: "4",
      name: "Reloj Sport",
      price: 129.23,
      image: "https://picsum.photos/seed/4/600/400",
    },
    {
      id: "5",
      name: "Ipad",
      price: 652.0,
      image: "https://picsum.photos/seed/5/600/400",
    },
    {
      id: "6",
      name: "Bicicleta",
      price: 359.95,
      image: "https://picsum.photos/seed/7/600/400",
    },
    {
      id: "7",
      name: "Moto de agua",
      price: 2399.0,
      image: "https://picsum.photos/seed/6/600/400",
    },
    {
      id: "8",
      name: "Horno eléctrico",
      price: 39.99,
      image: "https://picsum.photos/seed/8/600/400",
    },
    {
      id: "9",
      name: "Raqueta de padel",
      price: 222.69,
      image: "https://picsum.photos/seed/9/600/400",
    },
    {
      id: "10",
      name: "Pulsera Garmin",
      price: 159.95,
      image: "https://picsum.photos/seed/10/600/400",
    },
    {
      id: "11",
      name: "Gafas de sol",
      price: 19.33,
      image: "https://picsum.photos/seed/11/600/400",
    },
    {
      id: "12",
      name: "Libro",
      price: 15.95,
      image: "https://picsum.photos/seed/12/600/400",
    },
  ];
  return (
    <>
      <Container sx={{ py: 3 }}>
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

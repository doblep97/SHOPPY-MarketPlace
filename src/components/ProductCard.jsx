import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useOutletContext } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useOutletContext();

  //Formatea el numero a euros
  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Card sx={{ borderRadius: 3, bgcolor: "grey.300" }}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          sx={{ height: 150 }}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {EUR_FORMAT.format(product.price)}{" "}
          </Typography>
        </CardContent>
      </Link>

      <CardActions sx={{ p: 2, pt: 0 }}>
        {/*Este botón se convierte en un Link y lleva segun el id del producto*/}
        <Button
          variant="contained"
          fullWidth
          onClick={() => addToCart(product)}
        >
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

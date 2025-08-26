import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ borderRadius: 3, bgcolor: "grey.300" }}>
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
          {product.price}€
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {/*Este botón se convierte en un Link y lleva segun el id del producto*/}
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          fullWidth
        >
          Ver producto
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

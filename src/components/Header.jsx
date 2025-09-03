import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import totalPrice from "../utils/totalPriceCart";

const Header = ({ cart, onRemoveProduct, onAddProduct, onDeleteProduct }) => {
  // Estado para abrir/cerrar el Drawer del carrito
  const [openCart, setOpenCart] = useState(false);
  const [dense] = useState(false);

  //Compruebo que es un array (Al hacer el pago inicializo vacio el 'cart' y es mas seguro controlandolo asi para que no falle)
  const cleanCart = Array.isArray(cart) ? cart : [];

  //"useMemo" guarda en caché el resultado de una función mientras sus dependencias no cambien.
  // Sino se renderizarían cada vez que el Header se renderizaría, haciendo el render mas lento y pesado

  //El total de productos/items que hay en el carrito y se muestra en el mismo
  const totalItems = useMemo(
    () => cleanCart.reduce((acc, item) => acc + item.units, 0),
    [cleanCart]
  );

  //Paso a la función que calcula el precio total el array de profuctos en el carrito
  const totalPriceProducts = useMemo(() => totalPrice(cleanCart), [cleanCart]);

  //Formatea el numero a euros
  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      {/* Header: color de fondo según tu comentario (#fceadc) */}
      <AppBar position="sticky" sx={{ bgcolor: "#fceadc", top: 0 }}>
        <Toolbar>
          {/* Logo: enlace a "/" como comentaste */}
          <Link to="/">
            <img src="/logo2.png" alt="Logo SHOPPY" height={38} />
          </Link>

          {/* Botón del carrito:
              - color salmón oscuro (#ff7940) como pediste
              - al hacer clic abre el Drawer */}
          <IconButton
            aria-label="abrir carrito"
            onClick={() => setOpenCart(true)}
            sx={{ marginLeft: "auto" }}
          >
            <Badge
              badgeContent={totalItems}
              showZero
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "white", // fondo del círculo
                  color: "#ff7940", // color del número
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: "#ff7940" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Drawer para el carrito de compra*/}
      <Drawer
        anchor="right"
        open={openCart}
        onClose={() => setOpenCart(false)}
        // Paper del Drawer - donde alicamos estilos
        PaperProps={{
          sx: {
            width: 360,
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh", // Ocupa todo el viewport
            boxSizing: "border-box",
          },
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Carrito
        </Typography>
        <Divider />
        {cleanCart.length === 0 && (
          <Typography textAlign={"center"} variant="h5" marginTop={3}>
            Tu carrito está vacío
          </Typography>
        )}

        {/* Si hay productos en la lista, aparece */}
        {cleanCart.length > 0 && (
          <Box sx={{ flex: 1, overflow: "auto", mt: 2 }}>
            {/* flex:1 para ocupar espacio disponible y overflow:auto para que la lista haga scroll */}
            <List dense={dense}>
              {cleanCart.map((cartProduct) => (
                <ListItem
                  key={cartProduct.id}
                  sx={{
                    backgroundColor: "#FFF1DA", // Estilo suave de item (puedes cambiarlo)
                    borderRadius: 3,
                    mb: 1,
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onRemoveProduct(cartProduct)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={cartProduct.image}
                      alt={cartProduct.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56, borderRadius: 4, mr: 1 }}
                      imgProps={{ loading: "lazy" }}
                    />
                  </ListItemAvatar>

                  <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <ListItemText
                      primary={cartProduct.name}
                      secondary={`${EUR_FORMAT.format(
                        cartProduct.price * cartProduct.units
                      )}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#ff7940",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          color: "white",
                          "&:hover": { backgroundColor: "#e6642e" }, // hover más oscuro
                        }}
                        onClick={() => onDeleteProduct(cartProduct)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 20,
                          textAlign: "center",
                          fontSize: 18,
                        }}
                      >
                        {cartProduct.units}
                      </Typography>

                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#ff7940",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          color: "white",
                          "&:hover": { backgroundColor: "#e6642e" },
                        }}
                        onClick={() => onAddProduct(cartProduct)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Total y boton de tramitar pedido*/}
        {cleanCart.length > 0 && (
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
              pt: 1,
            }}
          >
            <Divider />
            <Typography
              variant={"h6"}
              sx={{
                mb: 1,
                mt: 2,

                textAlign: "right",
                borderRadius: 3,
              }}
            >
              Total: {EUR_FORMAT.format(totalPriceProducts)}
            </Typography>
            <Button
              component={Link}
              to={"/cart"}
              sx={{ backgroundColor: "#ff7940", color: "white" }}
              fullWidth
              onClick={() => setOpenCart(false)}
            >
              Tramitar pedido
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Header;

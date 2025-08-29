import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import totalPrice from "../utils/totalPriceCart";

const Header = ({ cart, onRemoveProduct, onAddProduct, onDeleteProduct }) => {
  // Estado para abrir/cerrar el Drawer del carrito
  const [openCart, setOpenCart] = useState(false);
  const [dense] = useState(false);

  //El total de productos/items que hay en el carrito y se muestra en el mismo
  const totalItems = cart.reduce((acc, item) => acc + item.units, 0);

  //Paso a la función que calcula el precio total el array de profuctos en el carrito
  const totalPriceProducts = totalPrice(cart);

  //Formatea el numero a euros
  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      {/* Header: color de fondo según tu comentario (#fceadc) */}
      <AppBar position="static" sx={{ bgcolor: "#fceadc" }}>
        <Toolbar>
          {/* Logo: enlace a "/" como comentaste */}
          <Link to="/">
            <img src="/logo2.png" alt="Logo SHOPPY" height={40} />
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
        {cart.length === 0 && (
          <Typography textAlign={"center"} variant="h5" marginTop={3}>
            Tu carrito está vacío
          </Typography>
        )}

        {/* Si hay productos en la lista, aparece */}
        {cart.length > 0 && (
          <Box sx={{ flex: 1, overflow: "auto", mt: 2 }}>
            {/* flex:1 para ocupar espacio disponible y overflow:auto para que la lista haga scroll */}
            <List dense={dense}>
              {cart.map((cartProduct) => (
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
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
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
                        sx={{ backgroundColor: "#ff7940" }}
                        onClick={() => onDeleteProduct(cartProduct)}
                      >
                        –
                      </IconButton>
                      <Typography
                        sx={{
                          minWidth: 20,
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        {cartProduct.units}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: "#ff7940" }}
                        onClick={() => onAddProduct(cartProduct)}
                      >
                        +
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Total y boton de tramitar pedido*/}
        {cart.length > 0 && (
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
                p: 1,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "#ff7940",
              }}
            >
              Total de compra: {EUR_FORMAT.format(totalPriceProducts)}
            </Typography>
            <Button variant="outlined" fullWidth>
              Tramitar pedido
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Header;

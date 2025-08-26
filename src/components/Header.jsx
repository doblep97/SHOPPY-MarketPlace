import * as React from "react";
import AppBar from "@mui/material/AppBar";
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

const Header = () => {
  // Estado para abrir/cerrar el Drawer del carrito
  const [openCart, setOpenCart] = useState(false);
  const [dense] = useState(false);

  // Productos mock para ver la estructura del Drawer
  const products = [
    { name: "Auriculares Pro", price: 99 },
    { name: "Mochila Nike", price: 49 },
  ];

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
            sx={{ color: "#ff7940", marginLeft: "auto" }}
          >
            <ShoppingCartIcon />
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

        {/* Lista de pedidos:
              - flex:1 para ocupar espacio disponible
              - overflow:auto para que la lista haga scroll */}
        <Box sx={{ flex: 1, overflow: "auto", mt: 2 }}>
          <List dense={dense}>
            {products.map((product) => (
              <ListItem
                key={product.name} // Esto será el ID cuando tengas datos reales
                sx={{
                  backgroundColor: "#FFF1DA", // Estilo suave de item (puedes cambiarlo)
                  borderRadius: 3,
                  mb: 1,
                }}
                // Acción secundaria (borrar) — lógica
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={product.name}
                  secondary={`${product.price}€`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Total y boton de tramitar pedido*/}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            pt: 1,
          }}
        >
          <Divider />
          <Typography sx={{ mb: 1, mt: 2 }}>Total: -</Typography>
          <Button variant="outlined" fullWidth>
            Tramitar pedido
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;

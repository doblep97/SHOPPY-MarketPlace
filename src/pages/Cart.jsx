import { Grid, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useOutletContext } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import totalPrice from "../utils/totalPriceCart";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Link } from "react-router-dom";
import StepLabel from "@mui/material/StepLabel";

const styleStepper = {
  pt: 5,
  maxWidth: "80%",
  margin: "auto",
  "& .MuiStepIcon-root": {
    color: "#d8d4d3ff", // color por defecto de los iconos inactivos
  },
  "& .MuiStepIcon-root.Mui-active": {
    color: "#ff7940", // color del paso activo
  },
  "& .MuiStepIcon-root.Mui-completed": {
    color: "#ff7940", // color de los pasos completados
  },
  "& .MuiStepConnector-line": {
    borderColor: "#f33d10ff", // color de la línea
  },
};

const Cart = () => {
  const { cart, deleteProduct, updateProduct } = useOutletContext();
  //Formatea el numero a euros
  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <>
      {cart.length === 0 && (
        <Typography textAlign={"center"} variant="h5" marginTop={3}>
          Tu carrito está vacío
        </Typography>
      )}
      {cart.length > 0 && (
        <>
          <Box sx={styleStepper}>
            <Stepper activeStep={0}>
              <Step>
                <StepLabel>Carrito</StepLabel>
              </Step>
              <Step>
                <StepLabel>Detalles de envío</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pago</StepLabel>
              </Step>
            </Stepper>
          </Box>
          <Grid
            container
            spacing={2}
            alignItems={"start"}
            sx={{ py: 5, maxWidth: "80%", margin: "auto" }}
          >
            <Grid
              size={{ xs: 12, md: 8 }}
              sx={{ border: 1.5, borderRadius: 3 }}
            >
              <Typography variant="h5" sx={{ p: 2 }}>
                Carrito
              </Typography>
              <Divider sx={{ borderColor: "black" }} />
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={3}
                padding={2}
              >
                {cart.map((product) => (
                  <Box
                    display={"flex"}
                    backgroundColor={"#fceadc"}
                    padding={2}
                    borderRadius={3}
                    key={product.id}
                  >
                    <Box display={"flex"} gap={3} flexGrow={1}>
                      <Box>
                        <img src={product.image} height={80}></img>
                      </Box>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"start"}
                        gap={0.5}
                      >
                        <Typography variant={"h6"} sx={{ pt: 1.5 }}>
                          {product.name}
                        </Typography>

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
                            onClick={() => deleteProduct(product)}
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
                            {product.units}
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
                            onClick={() => updateProduct(product)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        variant={"h6"}
                        sx={{ p: 1.5, fontWeight: "bold" }}
                      >{`${EUR_FORMAT.format(
                        product.price * product.units
                      )}`}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ border: 1.5, borderRadius: 3 }}
            >
              <Typography variant="h5" sx={{ p: 2 }}>
                Resumen
              </Typography>
              <Divider sx={{ borderColor: "black" }} />
              <Typography variant="h4" textAlign="center" sx={{ p: 2 }}>
                {EUR_FORMAT.format(totalPrice(cart))}
              </Typography>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  component={Link}
                  to={"/checkout"}
                  sx={{
                    backgroundColor: "#ff7940",
                    color: "white",
                    maxWidth: "50%",
                    marginBottom: 2,
                  }}
                  fullWidth
                >
                  Realizar compra
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Cart;

import { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Divider,
  StepLabel,
  Stepper,
  Step,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import FormCheckout from "../components/FormCheckout";
import totalPrice from "../utils/totalPriceCart";

const styleStepper = {
  pt: 5,
  maxWidth: "80%",
  margin: "auto",
  "& .MuiStepIcon-root": { color: "#d8d4d3ff" },
  "& .MuiStepIcon-root.Mui-active": { color: "#ff7940" },
  "& .MuiStepIcon-root.Mui-completed": { color: "#ff7940" },
  "& .MuiStepConnector-line": { borderColor: "#f33d10ff" },
};

const SHIPPING_PRICES = {
  standard: 0, // €0 (3–5 días)
  express: 7.99, // €7.99 (24–48h)
};

const Checkout = () => {
  const { cart } = useOutletContext();

  // Estado del tipo de envío
  const [shipping, setShipping] = useState("standard");

  // Formateador €
  const EUR_FORMAT = useMemo(
    () =>
      new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }),
    []
  );

  // Cálculos para los precios
  const subtotal = totalPrice(cart);
  const shippingCost = SHIPPING_PRICES[shipping];
  const grandTotal = subtotal + shippingCost;

  return (
    <>
      <Box sx={styleStepper}>
        <Stepper activeStep={1}>
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
        alignItems="start"
        sx={{ py: 5, maxWidth: "80%", margin: "auto" }}
      >
        {/* Columna: Detalles de envío */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ border: 1.5, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            Detalles de envío
          </Typography>
          <Divider sx={{ borderColor: "black" }} />

          <FormCheckout />
        </Grid>

        {/* Columna: Resumen */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ border: 1.5, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            Resumen
          </Typography>
          <Divider sx={{ borderColor: "black" }} />

          {/* Lista de productos */}
          <Box display="flex" flexDirection="column" gap={1} p={2}>
            {cart.map((product) => (
              <Box
                key={product.id}
                display="flex"
                alignItems="center"
                gap={2}
                bgcolor="#fceadc"
                p={1.5}
                borderRadius={3}
              >
                <img src={product.image} height={60} alt={product.name} />
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {EUR_FORMAT.format(product.price * product.units)}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Divider sx={{ borderColor: "black", mt: 2 }} />
          </Box>

          {/* Tipo de envío */}
          <Box px={2} pb={2}>
            <FormControl>
              <Typography>Tipo de envío</Typography>
              <RadioGroup
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label={`Estándar (3–5 días) — ${EUR_FORMAT.format(
                    SHIPPING_PRICES.standard
                  )}`}
                />
                <FormControlLabel
                  value="express"
                  control={<Radio />}
                  label={`Exprés (24–48h) — ${EUR_FORMAT.format(
                    SHIPPING_PRICES.express
                  )}`}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ borderColor: "black" }} />

          {/* Totales */}
          <Box px={2} py={1}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography>Subtotal</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {EUR_FORMAT.format(subtotal)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography>Envío</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {EUR_FORMAT.format(shippingCost)}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {EUR_FORMAT.format(grandTotal)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;

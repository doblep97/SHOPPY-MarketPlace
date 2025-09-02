import {
  Box,
  Grid,
  Typography,
  Divider,
  StepLabel,
  Stepper,
  Step,
} from "@mui/material";

import { useOutletContext } from "react-router-dom";
import Details from "../components/Details";
import FormPayment from "../components/FormPayment";
const styleStepper = {
  pt: 5,
  maxWidth: "80%",
  margin: "auto",
  "& .MuiStepIcon-root": { color: "#d8d4d3ff" },
  "& .MuiStepIcon-root.Mui-active": { color: "#ff7940" },
  "& .MuiStepIcon-root.Mui-completed": { color: "#ff7940" },
  "& .MuiStepConnector-line": { borderColor: "#f33d10ff" },
};

const Payment = () => {
  const { totalPriceCart } = useOutletContext();
  //Formatea el numero a euros
  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <>
      <Box sx={styleStepper}>
        <Stepper activeStep={2}>
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
        sx={{
          py: 5,
          maxWidth: { xs: "80%", lg: "70%", xl: "50%" },
          margin: "auto",
        }}
      >
        {/*Detalles de envío y contacto */}
        <Grid
          size={{ xs: 12, md: 5, xl: 5 }}
          sx={{ border: 1.5, borderRadius: 3 }}
        >
          <Details />
        </Grid>

        {/* Pago*/}
        <Grid
          size={{ xs: 12, md: 7, xl: 7 }}
          sx={{ border: 1.5, borderRadius: 3 }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Pago
            </Typography>
            <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
              {EUR_FORMAT.format(totalPriceCart)}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "black" }} />
          <FormPayment />
        </Grid>
      </Grid>
    </>
  );
};

export default Payment;

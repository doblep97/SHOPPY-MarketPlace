import { Box, Grid, Typography, Divider } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import FormCheckout from "../components/FormCheckout";

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
const Checkout = () => {
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
        alignItems={"start"}
        sx={{ py: 5, maxWidth: "80%", margin: "auto" }}
      >
        <Grid size={{ xs: 12, md: 8 }} sx={{ border: 1.5, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            Detalles de envío
          </Typography>
          <Divider sx={{ borderColor: "black" }} />
          {/* Formulario de envío */}
          <FormCheckout />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ border: 1.5, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            Resumen
          </Typography>
          <Divider sx={{ borderColor: "black" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;

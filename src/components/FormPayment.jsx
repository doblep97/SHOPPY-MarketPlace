import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useOutletContext } from "react-router-dom";
import currentDate from "../utils/currentDate";
import { Link } from "react-router-dom";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const FormPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [nameTitularTarjet, setNameTitularTarjet] = useState("");
  const [cvv, setCvv] = useState("");
  const [monthExpiration, setMonthExpiration] = useState("");
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // Funciones que controlan la visibilidad del numero de tarjeta y CVV
  const [showNumberTarjet, setShowNumberTarjet] = useState(true);
  const [showCVV, setShowCVV] = useState(true);

  const { totalPriceCart, clearCart } = useOutletContext();

  // Elimina los espacion del numero de la tarjeta para valorar el '.length' original
  const rawCard = cardNumber.replace(/\s/g, "");

  //Sao los ultimos 4 digitos del numero de la tarjeta
  const lastNumbersTarjet = rawCard.slice(-4);

  // Tarjeta
  const isCardEmpty = errorSubmit && rawCard.length === 0;
  const isCardInvalidLength =
    errorSubmit && rawCard.length > 0 && rawCard.length !== 16;

  // CVV
  const isCvvEmpty = errorSubmit && cvv.trim().length === 0;
  const isCvvInvalidLength =
    errorSubmit && cvv.trim().length > 0 && cvv.trim().length !== 3;

  // Fecha actual en formato "YYYY-MM" (viene de tu util) -> para el "min" del "monthExpiration"
  const now = currentDate();

  // Errores para la fecha de expiración
  const isExpiryEmpty = errorSubmit && monthExpiration.trim() === "";
  const isExpiryPast = errorSubmit && monthExpiration && monthExpiration <= now;

  const handleChangeNameTarjet = (event) => {
    let value = event.target.value;

    // Permite letras (may/min) y espacios
    value = value.replace(/[^a-z\s]/gi, "");

    setNameTitularTarjet(value);
  };

  const handleChangeCardNumber = (event) => {
    let value = event.target.value.replace(/\D/g, ""); // solo números
    value = value.substring(0, 16); // máximo 16 dígitos

    // separar en grupos de 4
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(formatted);
  };

  const handleChangeCVV = (event) => {
    let value = event.target.value;

    // elimina todo lo que no sea un numero
    value = value.replace(/[^0-9]/g, "");

    // si está vacío o es un número válido, lo guardamos
    if (!isNaN(value) || value === "") {
      setCvv(value);
    }
  };

  const handleClickShowNumber = () => setShowNumberTarjet((show) => !show);
  const handleClickShowCVV = () => setShowCVV((show) => !show);

  const handleMouseDownNumber = (event) => {
    event.preventDefault();
  };
  const handleMouseUpNumber = (event) => {
    event.preventDefault();
  };
  const handleMouseDownCVV = (event) => {
    event.preventDefault();
  };
  const handleMouseUpCVV = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorSubmit(true);
    if (!cardNumber || !nameTitularTarjet || !monthExpiration || !cvv) {
      return;
    }

    //Comprobamos que la fecha de objetivo sea posterior a la actual

    const now = currentDate();
    if (monthExpiration <= now) {
      return;
    }

    setErrorSubmit(false);
    setOpenModal(true);
  };

  const EUR_FORMAT = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: "80%",
          margin: "auto",
          p: 3,
        }}
      >
        <TextField
          label="Nombre del titular"
          variant="outlined"
          size="small"
          fullWidth
          onChange={handleChangeNameTarjet}
          value={nameTitularTarjet}
          error={errorSubmit && nameTitularTarjet.trim() === ""}
          helperText={
            errorSubmit && nameTitularTarjet.trim() === ""
              ? "Este campo es obligatorio"
              : ""
          }
        />
        <FormControl
          variant="outlined"
          size="small"
          error={isCardEmpty || isCardInvalidLength}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Número de la tarjeta
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showNumberTarjet ? "text" : "password"}
            onChange={handleChangeCardNumber}
            value={cardNumber}
            inputProps={{ maxLength: 19 }} // 16 dígitos + 3 espacios
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showNumberTarjet
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShowNumber}
                  onMouseDown={handleMouseDownNumber}
                  onMouseUp={handleMouseUpNumber}
                  edge="end"
                >
                  {showNumberTarjet ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Número de la tarjeta"
          />
          {isCardEmpty && (
            <Typography sx={{ ml: 2 }} variant="caption" color="error">
              Este campo es obligatorio
            </Typography>
          )}
          {isCardInvalidLength && (
            <Typography sx={{ ml: 2 }} variant="caption" color="error">
              Debe tener 16 dígitos
            </Typography>
          )}
        </FormControl>

        <Box display={"flex"} gap={3}>
          <TextField
            type="month"
            label="Fecha de expiración"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: now }} // hace que el navegador no te deje seleccionar fechas anteriores
            onChange={(event) => setMonthExpiration(event.target.value)}
            value={monthExpiration}
            error={isExpiryEmpty || isExpiryPast}
            helperText={
              isExpiryEmpty
                ? "Este campo es obligatorio"
                : isExpiryPast
                ? "La fecha debe ser posterior al mes actual"
                : ""
            }
          />

          <FormControl
            variant="outlined"
            size="small"
            error={isCvvEmpty || isCvvInvalidLength}
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-cvv">CVV</InputLabel>
            <OutlinedInput
              id="outlined-adornment-cvv"
              type={showCVV ? "text" : "password"}
              onChange={handleChangeCVV}
              value={cvv}
              inputProps={{ maxLength: 3 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showCVV ? "hide the password" : "display the password"
                    }
                    onClick={handleClickShowCVV}
                    onMouseDown={handleMouseDownCVV}
                    onMouseUp={handleMouseUpCVV}
                    edge="end"
                  >
                    {showCVV ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="CVV"
            />
            {isCvvEmpty && (
              <Typography sx={{ ml: 2 }} variant="caption" color="error">
                Este campo es obligatorio
              </Typography>
            )}
            {isCvvInvalidLength && (
              <Typography sx={{ ml: 2 }} variant="caption" color="error">
                Debe tener 3 dígitos
              </Typography>
            )}
          </FormControl>
        </Box>
        <Button
          sx={{
            backgroundColor: "#ff7940",
            color: "white",
            maxWidth: "40%",
            margin: "auto",
          }}
          fullWidth
          type="submit"
        >
          Realizar pago
        </Button>
      </Box>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h4">
            ¡Pago realizado!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Hemos realizado un cargo de ${EUR_FORMAT.format(
              totalPriceCart
            )} a la tarjeta ...${lastNumbersTarjet}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Pronto recibirá un email con el seguimiento del envio
          </Typography>
          <Button
            component={Link}
            to={"/"}
            onClick={clearCart} // vacía el carrito al volver a inicio
            sx={{
              backgroundColor: "#ff7940",
              color: "white",
              maxWidth: "40%",
              margin: "auto",
              mt: 2,
            }}
            fullWidth
          >
            Volver a inicio
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FormPayment;

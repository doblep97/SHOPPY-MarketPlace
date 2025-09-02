import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

// ...
const provinciasSpain = [
  "Álava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Girona",
  "Granada",
  "Guadalajara",
  "Gipuzkoa",
  "Huelva",
  "Huesca",
  "Illes Balears",
  "Jaén",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lleida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Murcia",
  "Navarra",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Bizkaia",
  "Zamora",
  "Zaragoza",
  "Ceuta",
  "Melilla",
];

const FormCheckout = () => {
  const { handleDataFormCheckout } = useOutletContext();

  const navigate = useNavigate();

  //submit del formulario
  const [submitedError, setSubmitedError] = useState(false);

  //Datos de contacto
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [DNI, setDNI] = useState("");
  const [numberTelephone, setNumberTelephone] = useState("");

  //Dirección de envío
  const [street, setStreet] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [floor, setFloor] = useState("");
  const [door, setDoor] = useState("");
  const [informationCustomer, setInformationCustomer] = useState("");

  const dataForm = {
    contact: {
      name: name,
      surnames: surnames,
      email: email,
      dni: DNI,
      telephone: numberTelephone,
    },
    adress: {
      street: street,
      numberStreet: numberStreet,
      province: province,
      city: city,
      zipCode: zipCode,
      floor: floor,
      door: door,
      information: informationCustomer,
    },
  };

  //Los handleChange personalizados

  const handleChangeNumberTelephone = (event) => {
    let value = event.target.value;

    // elimina todo lo que no sea un numero
    value = value.replace(/[^0-9]/g, "");

    // si está vacío o es un número válido, lo guardamos
    if (!isNaN(value) || value === "") {
      setNumberTelephone(value);
    }
  };

  const handleChangeNumberStreet = (event) => {
    let value = event.target.value;

    // elimina todo lo que no sea un numero
    value = value.replace(/[^0-9]/g, "");

    // si está vacío o es un número válido, lo guardamos
    if (!isNaN(value) || value === "") {
      setNumberStreet(value);
    }
  };

  const handleChangeZipCode = (event) => {
    let value = event.target.value;

    // elimina todo lo que no sea un numero
    value = value.replace(/[^0-9]/g, "");

    // si está vacío o es un número válido, lo guardamos
    if (!isNaN(value) || value === "") {
      setZipCode(value);
    }
  };

  const handleChangeCity = (event) => {
    let value = event.target.value;

    // elimina todo lo que no sea una letra 'gi' hace que sea min y may.
    value = value.replace(/[^a-z]/gi, "");

    if (isNaN(value) || value === "") {
      setCity(value);
    }
  };

  const handleChangeDNI = (event) => {
    let value = event.target.value.toUpperCase();

    // eliminar caracteres que no sean dígitos o letras
    value = value.replace(/[^0-9A-Z]/g, "");

    // limitarmos a 9 caracteres máximo
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    // Validación básica según lo que se va escribiendo
    if (value.length > 0) {
      const firstChar = value[0];

      // Si empieza con número → DNI
      if (/[0-9]/.test(firstChar)) {
        // hasta 8 dígitos + 1 letra
        if (value.length <= 8) {
          value = value.replace(/[^0-9]/g, ""); // solo números
        } else {
          value =
            value.slice(0, 8).replace(/[^0-9]/g, "") +
            value[8].replace(/[^A-Z]/g, "");
        }
      }

      // Si empieza con X, Y o Z → NIE
      else if (/[XYZ]/.test(firstChar)) {
        if (value.length <= 8) {
          // posición 1 es letra (X/Y/Z), luego 7 números
          value = value[0] + value.slice(1).replace(/[^0-9]/g, "");
        } else {
          // X/Y/Z + 7 números + 1 letra
          value =
            value[0] +
            value.slice(1, 8).replace(/[^0-9]/g, "") +
            value[8].replace(/[^A-Z]/g, "");
        }
      } else {
        // ningún formato válido → reset
        value = "";
      }
    }

    setDNI(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitedError(true);
    if (
      !name ||
      !surnames ||
      !email ||
      !DNI ||
      !numberTelephone ||
      !street ||
      !numberStreet ||
      !province ||
      !city ||
      !zipCode
    ) {
      return;
    }
    setSubmitedError(false);
    // Lo guarda en Layout (y sessionStorage dentro de esa función)
    handleDataFormCheckout(dataForm);
    //Navegamos a la página del pago
    navigate("/payment");
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Datos de contacto
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2.5}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" }, // En móvil serán columnas y en pantallas mas grandes filas
              }}
            >
              {/*Nombre*/}
              <TextField
                size="small"
                label="Nombre"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                name="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                error={submitedError && name.trim() === ""}
                helperText={
                  submitedError && name.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />

              {/*Apellidos*/}
              <TextField
                size="small"
                label="Apellidos"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                name="surnames"
                onChange={(event) => setSurnames(event.target.value)}
                value={surnames}
                error={submitedError && surnames.trim() === ""}
                helperText={
                  submitedError && surnames.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />
            </Box>

            {/*Email*/}
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              error={submitedError && email.trim() === ""}
              helperText={
                submitedError && email.trim() === ""
                  ? "Este campo es obligatorio"
                  : ""
              }
            />

            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" }, // En móvil serán columnas y en pantallas mas grandes filas
              }}
            >
              {/*DNI*/}
              <TextField
                size="small"
                label="DNI / NIE"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                name="DNI"
                onChange={handleChangeDNI}
                value={DNI}
                error={submitedError && DNI.trim() === ""}
                helperText={
                  submitedError && DNI.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />

              {/*Teléfono*/}
              <FormControl
                size="small"
                sx={{ flexGrow: 1 }}
                name="telephone"
                error={submitedError && numberTelephone.trim() === ""}
              >
                <InputLabel htmlFor="outlined-adornment-telephone">
                  Número de teléfono
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-telephone"
                  value={numberTelephone}
                  onChange={handleChangeNumberTelephone}
                  startAdornment={
                    <InputAdornment position="start">+34</InputAdornment>
                  }
                  label="Número de teléfono"
                />
                {submitedError && numberTelephone.trim() === "" && (
                  <Typography variant="caption" color="error">
                    Este campo es obligatorio
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "black" }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Dirección de envío
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2.5}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" }, // En móvil serán columnas y en pantallas mas grandes filas
              }}
            >
              {/*Calle*/}
              <TextField
                sx={{ flexGrow: 1 }}
                size="small"
                label="Calle"
                variant="outlined"
                name="street"
                onChange={(event) => setStreet(event.target.value)}
                value={street}
                error={submitedError && street.trim() === ""}
                helperText={
                  submitedError && street.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />

              {/*Numero de calle*/}
              <TextField
                sx={{ width: { xs: "100%", sm: "32%" } }}
                size="small"
                label="Numero"
                variant="outlined"
                name="street"
                onChange={handleChangeNumberStreet}
                value={numberStreet}
                error={submitedError && numberStreet.trim() === ""}
                helperText={
                  submitedError && numberStreet.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />
            </Box>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" }, // columna en móvil, fila en desktop
              }}
            >
              {/*Provincia*/}
              <FormControl sx={{ flex: 1 }} size="small" name="province">
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-label"
                  label="Provincia"
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  error={submitedError && province.trim() === ""}
                >
                  {provinciasSpain.map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
                {submitedError && province.trim() === "" && (
                  <Typography variant="caption" color="error">
                    Este campo es obligatorio
                  </Typography>
                )}
              </FormControl>

              {/*Ciudad*/}
              <TextField
                sx={{ flex: 1 }}
                size="small"
                label="Ciudad"
                variant="outlined"
                name="city"
                onChange={handleChangeCity}
                value={city}
                error={submitedError && city.trim() === ""}
                helperText={
                  submitedError && city.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />

              {/*Código postal*/}
              <TextField
                sx={{ flex: 1 }}
                size="small"
                label="Código postal"
                variant="outlined"
                name="zipCode"
                onChange={handleChangeZipCode}
                value={zipCode}
                error={submitedError && zipCode.trim() === ""}
                helperText={
                  submitedError && zipCode.trim() === ""
                    ? "Este campo es obligatorio"
                    : ""
                }
              />
            </Box>

            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {/*Piso*/}
              <TextField
                sx={{ width: { xs: "100%", sm: "15%" } }}
                size="small"
                label="Piso"
                variant="outlined"
                name="floor"
                onChange={(event) => setFloor(event.target.value)}
                value={floor}
              />

              {/*Puerta*/}
              <TextField
                size="small"
                label="Puerta"
                variant="outlined"
                sx={{ width: { xs: "100%", sm: "15%" } }}
                name="door"
                onChange={(event) => setDoor(event.target.value)}
                value={door}
              />

              {/*Info adicional*/}
              <TextField
                size="small"
                label="Información adicional"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                name="information"
                onChange={(event) => setInformationCustomer(event.target.value)}
                value={informationCustomer}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "black" }} />
        <Button
          sx={{
            backgroundColor: "#ff7940",
            color: "white",
            maxWidth: "28%",
            margin: "auto",
          }}
          fullWidth
          type="submit"
        >
          Ir al pago
        </Button>
      </Box>
    </>
  );
};

export default FormCheckout;

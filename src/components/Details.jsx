import { Box, Divider, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Details = () => {
  const { dataFormCheckout } = useOutletContext() || {};
  const detailsContact = dataFormCheckout.contact;
  const detailsAdress = dataFormCheckout.adress;

  console.log(dataFormCheckout);
  return (
    <>
      <Box sx={{ px: 2, py: 1 }}>
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="h6" sx={{ pt: 1, fontWeight: "bold" }}>
            Detalles de contacto
          </Typography>
          <Typography>
            {detailsContact.name} {detailsContact.surnames}
          </Typography>
          <Typography>{detailsContact.email}</Typography>
          <Typography>{detailsContact.dni}</Typography>
          <Typography>{detailsContact.telephone}</Typography>
        </Box>
        <Divider sx={{ borderColor: "black", my: 1 }} />
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="h6" sx={{ pt: 1, fontWeight: "bold" }}>
            Detalles de envío
          </Typography>
          <Typography>
            {detailsAdress.street} {detailsAdress.numberStreet},{" "}
            {detailsAdress.floor}
            {detailsAdress.door}
          </Typography>
          <Typography>
            {detailsAdress.zipCode} {detailsAdress.city} (
            {detailsAdress.province})
          </Typography>
          {detailsAdress.information && (
            <Typography>"{detailsAdress.information}"</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Details;

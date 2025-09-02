import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: "#fceadc",
          py: 4,
          px: 3,
          mt: "auto",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Typography variant="body2" sx={{ marginLeft: "auto" }}>
          © {new Date().getFullYear()} SHOPPY. Todos los derechos reservados.
        </Typography>{" "}
      </Box>
    </>
  );
};

export default Footer;

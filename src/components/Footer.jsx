import { Typography, Box, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter"; // lo usaremos para X
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  //TODO pegar el footerabajo
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fceadc",
        py: 2,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box display={"flex"}>
        <Box display={"flex"} justifyContent={"center"}>
          <IconButton
            component="a"
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#E4405F" }} // color oficial de Instagram
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }} // X en negro
          >
            <TwitterIcon />{" "}
            {/* hasta que MUI saque un icono de "X", usamos Twitter */}
          </IconButton>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <IconButton
            component="a"
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#1877F2" }} // color oficial de Facebook
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#0A66C2" }} // color oficial de LinkedIn
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2">
        © {new Date().getFullYear()} SHOPPY. Todos los derechos reservados.
      </Typography>{" "}
    </Box>
  );
};

export default Footer;

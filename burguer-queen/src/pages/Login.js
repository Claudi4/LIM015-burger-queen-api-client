import React from "react"; //{ useState }
import logo from "../assets/img/Logo.svg";
import useAuth from "../services/auth/useAuth";
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
// import { makeStyles } from '@mui/system';
import fondo from "../assets/img/fondoHamburguesas.jpg";
// import VisibilityIcon from '@mui/icons-material/Visibility';

/* const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  container: {
    opacity: "0.8",
    height: "60%",
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      with: "100%",
      height: "100%",
    },
  },
  div: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
})); */

const Login = () => {
  const auth = useAuth();
  /* const [body, setBody] = useState({ email: "", password: "" }); */
  // const classes = useStyles();

  /* const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = auth.login(data.get("email"), data.get("password"));
    user
      .then((response) => {
        if (response.err) {
          console.error(response);
        } // Mostrar errores
        else {
          // hacer algo con la data login o nada
        }
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: `linear-gradient( 91.7deg, rgba(50,25,79,0.75) -4.3%, rgba(33, 23, 82,0.75) 101.8% ), url(${fondo}) no-repeat center center`,
          backgroundSize: "cover"
        }}
        alt="brand"
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            py: 8,
            mx: 4,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <img src={logo} style={{ width: 200, m: "1rem" }} alt="logo" />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

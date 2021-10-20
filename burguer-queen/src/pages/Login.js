import React from "react";
import { Grid, Paper, Box, TextField, Button, CssBaseline, InputAdornment } from "@mui/material";
// import { makeStyles } from '@mui/styles';
import fondo from '../assets/img/fondo4.png';
import logo from '../assets/img/Logo.svg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useAuth from "../services/auth/useAuth";
import IconButton from '@mui/material/IconButton';

/* const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: '3rem',
    backgroundColor: theme?.palette?.primary.main
  }
})) */

const Login = () => {
  // const classes = useStyles()
  const auth = useAuth();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: `url(${fondo}) no-repeat center center`,
            backgroundSize: "cover"
          }}
          alt="brand">
        </Grid>
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
            }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
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
                value={values.email}
                onChange={handleChange("email")}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <IconButton>
                        <AccountCircleIcon />
                      </IconButton>
                    </InputAdornment>
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={values.showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
                value={values.password}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                }}
              />
              <Button
                id="signInButton"
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
    </div>
  )
}

export default Login;
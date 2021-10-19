import React, { useState } from "react";
import logo from "../assets/img/Logo.svg";
import useAuth from "../services/auth/useAuth";
import {
  Grid,
  Paper,
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fondo from "../assets/img/fondoHamburguesas.jpg";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
}));

const Login = () => {
  const [body, setBody] = useState({ nickname: "", password: "" });
  const classes = useStyles();
  const auth = useAuth();

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    // @parameters email, password
    const user = auth.login('mesero@gmail.com','Mesero#2021');
    user
      .then((response) => {
        if(response.err) {
          console.error(response);
        } // Mostrar errores
        else {
          // hacer algo con la data login o nada
        }
      });
  };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={6}>
          <img
            src={fondo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="brand"
          />
        </Grid>
        <CssBaseline />
        <Grid item xs={12} sm={6} style={{ padding: 10 }}>
          <Grid container justifyContent="center">
            <img src={logo} style={{ width: 200 }} alt="logo" />
          </Grid>
          <Container
            component={Paper}
            elevation={5}
            maxWidth="xs"
            className={classes.container}
          >
            <div className={classes.div}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <form className={classes.from}>
                <TextField
                  fullWidth
                  autoFocus
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  label="Nickname"
                  name="nickname"
                  value={body.nickname}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  type="password"
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={body.password}
                  onChange={handleChange}
                />
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => onSubmit()}
                >
                  Sign In
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
        </Grid>
    </div>
  );
};
export default Login;

import React from 'react';
import { Grid, CssBaseline, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  let history = useHistory();

  function goLogin() {
    history.push('/login');
  }
  return (
    <Grid
      textAlign="center"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Typography variant="h6">
        Parece que te perdiste el rumbo, dale click al boton de abajo.
      </Typography>
      <img
        src="./images/notFound.png"
        className="notFound"
        alt="notFound404"
        position=" absolute"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        aria-label="return"
        sx={{ mt: 0, mb: 2, p: 2 }}
        onClick={goLogin}
      >
        Volver al inicio
      </Button>
    </Grid>
  );
};

export default NotFound;

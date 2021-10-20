import React, { useState } from "react";
import { Grid, Paper, Container, Typography, TextField, Button, CssBaseline, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fondo from '../assets/img/fondo4.png';
import logo from '../assets/img/Logo.svg';
import {AccountCircle, LockRounded} from '@material-ui/icons'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import {LockOutlined as LockOutlinedIcon} from '@material-ui/icons'
import { useHistory, useLocation} from 'react-router-dom';
import useAuth from "../services/auth/useAuth";
import IconButton from '@mui/material/IconButton';




const useStyles = makeStyles(theme => ({
    root: {
        //backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    container: {
        opacity: '0.8',
        marginTop: theme.spacing(10),
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
            marginTop: 0,
            with: '100%',
            height: '100%'
        }
    },
    div: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(3, 0, 2),
        marginBottom: '3rem',
        backgroundColor: theme.palette.primary.main
    }

}))

const Login = () => {
    const classes = useStyles()

    const history = useHistory();
    const location = useLocation();
    const previusObjectURL = location.state?.from;
    const auth = useAuth();




    const [values, setValues] = React.useState({
        nickname: '',
        password: '',
        showPassword: false,
    });
      
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
      
    const handleNicknameChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handlePasswordChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const onSubmit = () => {
      console.log(values);
      // @parameters email, password
      auth.login('amelanie.trillo27@gmail.com', 'Melanie#27');
      history.push(previusObjectURL || "/admin")
  }

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} sm={6}>
                    <img src={fondo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='brand' />
                </Grid>
                <CssBaseline />
                <Grid item xs={12} sm={6} style={{ padding: 10 }}>
                    <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
                        <div className={classes.div}>
                            <Grid container justifyContent='center'>
                                <img src={logo} style={{ width: 200, height: 180 }} alt='logo' />
                            </Grid>
                            <Typography component='h1' variant='h5'>Sign In</Typography>
                            <form className={classes.form}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Nickname'
                                    name='nickname'
                                    value={values.nickname}
                                    onChange={handleNicknameChange("nickname")}
                                    InputProps={{
                                      endAdornment:
                                      <InputAdornment position='end'>
                                        <IconButton>
                                          <AccountCircle/>
                                        </IconButton>
                                      </InputAdornment>
                                    }}
                                />
                                <TextField
                                    type={values.showPassword ? "text" : "password"}
                                    onChange={handlePasswordChange("password")}
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Password'
                                    name='password'
                                    value={values.password}
                                    
                                    InputProps={{
                                      endAdornment:
                                      <InputAdornment position='end'>
                                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                          { values.showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </IconButton>
                                      </InputAdornment>
                                    }}
                                />






                                <Button
                                    fullWidth
                                    variant='contained'
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
    )
}
export default Login;
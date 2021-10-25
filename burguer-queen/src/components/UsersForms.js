import * as React from 'react';
import { Backdrop, Box, Button, InputAdornment, Modal, FormControl } from '@mui/material';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ modal, setModal, title }) {
  const { handleSubmit, control } = useForm();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    rol: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (event) => {
    console.log(event)
  };

  const handleClose = () => setModal(false);
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="email"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton>
                            <AccountCircleIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                )}
                rules={{
                  required: 'Email required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Debes usar un email válido',
                  },
                }}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={values.showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                )}
                rules={{
                  required: 'Contraseña requerida',
                  minLength: {
                    value: 8,
                    message: 'Contraseña debe tener al menos 8 caracteres',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'Contraseña debe tener al menos 1 caracter alfabético ,1 caracter numérico y un caracter eapecial',
                  },
                  validate: {
                    equals: password =>
                      password !== 'password123#' || 'Escoge una contraseña mas segura',
                  },
                }}
              />
              <Controller
                name="rol"
                control={control}
                defaultValue="mesero"
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth sx={{ marginTop: 2}}>
                    <InputLabel id="roles">Rol</InputLabel>
                    <Select
                      labelId="roles"
                      id="rol"
                      value={value}
                      label="Rol"
                      onChange={onChange}
                    >
                      <MenuItem value="mesero">Mesero</MenuItem>
                      <MenuItem value="chef">Chef</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    </FormControl>
                )}
                rules={{ required: 'Rol requerido' }}
              />
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  id="signInButton"
                  fullWidth
                  sx={{ mt: 3, mb: 2, p: 2 }}>
                  Iniciar sesión
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
  )
}
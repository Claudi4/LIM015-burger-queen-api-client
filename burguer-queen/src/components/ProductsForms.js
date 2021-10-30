import * as React from "react";
import {
  Fade,
  Backdrop,
  Box,
  ButtonGroup,
  Button,
  Modal,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  Select,
  Grid,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../helpers/post";
import { deleteDataById } from "../helpers/delete";
import { updateData } from "../helpers/put";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddProductsForm = ({ table, setTable, handleClose }) => {
  const { handleSubmit, control } = useForm();
  const [values] = React.useState({
    image: "",
    name: "",
    type: "",
    price: "",
  });

  const onSubmit = (products) => {
    const data = {
      image: products.image,
      name: products.name,
      type: products.type,
      price: products.price,
    };
    postData("products", data).then((response) => {
      if (!response.err) {
        // TODO: Agregar modal se agrego producto
        // setError(null);
        console.log("se agrego PRODUCTO");
        const { _id, image, name, type, price, } = response;
        //const { image, name, type, price } = response;
        const newProducts = {
          _id,
          image,
          name,
          type,
          price,
        };
        setTable({
          ...table,
          body: [newProducts, ...table.body],
        });
        handleClose();
        //agregar funcion para modal de agrgado exitoso
      } else {
        // setError(response);
        console.log(response);
      }
      //setLoading(false);
    });
  };

  return (
    <Box
      id="modal-description"
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="name"
            margin="normal"
            fullWidth
            id="name"
            label="Nombre producto"
            name="name"
            autoComplete="name"
            autoFocus
          />
        )}
        rules={{
          required: "Products required",
          pattern: {
            value: /^[A-Za-z\s]+$/ + /^[0-9.]+$/,
            message: "Debes ingresar un producto válido",
          },
        }}
      />
      <Controller
        name="price"
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
            name="price"
            label="Precio"
            type={values ? "text" : "price"}
            id="price"
            autoComplete="current-price"
          />
        )}
        rules={{
          required: "Precio requerida",
          pattern: {
            value: /^[0-9.]+$/,
            message: "Debes ingresar solo numeros",
          },
        }}
      />
      <Controller
        name="image"
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
            name="image"
            label="Imagen"
            type={values ? "text" : "image"}
            id="image"
            autoComplete="current-image"
          />
        )}
        rules={{
          required: "Imagen requerida",
          pattern: {
            value: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Debes ingresar la imagen",
          },
        }}
      />

      <Controller
        name="type"
        control={control}
        defaultValue="Desayuno"
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="type">Categoria</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={value}
              label="Categoria"
              onChange={onChange}
            >
              <MenuItem value="Desayuno">Desayuno</MenuItem>
              <MenuItem value="Almuerzo y cena">Almuerzo y cena</MenuItem>
            </Select>
          </FormControl>
        )}
        rules={{ required: "Categoria Requerida" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="signInButton"
        fullWidth
        sx={{ mt: 3, mb: 2, p: 2 }}
      >
        Crear producto
      </Button>
    </Box>
  );
};

const DeleteProductsForm = ({ data, table, setTable, handleClose }) => {
  const [loading, setLoading] = React.useState(false);
  const deleteProduct = () => {
    setLoading(true);
    deleteDataById("products", data).then((response) => {
      if (!response.err) {
        setTable({
          ...table,
          body: table.body.filter((item) => item._id !== data),
        });
      } else {
        console.log(response);
      }
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Box>
      <Box py="1rem">Producto: {data}</Box>
      <ButtonGroup
        fullWidth
        sx={{ marginTop: 1 }}
        disableElevation
        variant="contained"
      >
        <Button
          sx={{ opacity: 0.7, backgroundColor: "#696969" }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button variant="contained" disabled={loading} onClick={deleteProduct}>
          Borrar producto
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const UpdateProductsForm = ({ data, table, setTable, handleClose }) => {
  console.log("DATA PARA ACTUALIZAR: ", data);
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = React.useState(false);

  const updateProdutds = (event) => {
    const newData = {};
    console.log('event.image', event.image);
    if (data.name !== event.producto) newData.name = event.producto;
    if (data.price !== event.precio && event.precio !== "") newData.price = event.precio;
    if (data.image !== event.image && event.image !== "") newData.image = event.image;
    if (event.type !== "") newData.type = event.type;
    /*if (event.type !== 'select') newData.type = {
            type: event.type,
            desayuno: event.type === 'desayuno',
        }*/
    setLoading(true);
    updateData("products", data._id, newData).then((response) => {
      if (!response.err) {
        setTable({
          ...table,
          body: table.body.map((item) => {
            if (item._id === data._id) {
              return {
                ...response,
              };
            } else {
              return item;
            }
          }),
        });
      } else {
        console.log(response);
      }
      setLoading(false);
      handleClose();
    });
    handleOpen2();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(true);

  return (
    <div>
      <Box>
      <Box
        id="modal-description"
        component="form"
        noValidate
        onSubmit={handleSubmit(updateProdutds)}
      >
        <Controller
          name="producto"
          control={control}
          defaultValue={data.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="producto"
              margin="normal"
              fullWidth
              id="producto"
              label="producto"
              name="producto"
              autoComplete="producto"
              autoFocus
            />
          )}
          rules={{
            required: "Products required",
            pattern: {
              value: /^[A-Za-z\s]+$/ + /^[0-9.]+$/,
              message: "Debes ingresar un producto válido",
            },
          }}
        />
        <Controller
          name="precio"
          control={control}
          defaultValue={data.price}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              margin="normal"
              fullWidth
              name="precio"
              label="Precio"
              type="text"
              id="precio"
            />
          )}
          rules={{
            required: "Precio requerida",
            pattern: {
              value: /^[0-9.]+$/,
              message: "Debes ingresar solo numeros",
            },
          }}
        />
        <Controller
          name="image"
          control={control}
          defaultValue={data.image.toString()}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
              margin="normal"
              fullWidth
              id="image"
              label="image"
              name="image"
              autoComplete="image"
              autoFocus
            />
          )}
          rules={{
            required: "Images required",
            pattern: {
              value: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Debes ingresar un imagen válida",
            },
          }}
        />
        <Controller
          name="type"
          control={control}
          defaultValue={data.type}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="type">Categoria</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={value}
                label="Categoria"
                onChange={onChange}
              >
                <MenuItem value="Desayuno">Desayuno</MenuItem>
                <MenuItem value="Almuerzo y cena">Almuerzo y cena</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <ButtonGroup
          fullWidth
          sx={{ marginTop: 1 }}
          disableElevation
          variant="contained"
        >
          <Button
            sx={{ opacity: 0.7, backgroundColor: "#696969" }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button variant="contained" disabled={loading} type="submit">
            Actualizar producto
          </Button>
        </ButtonGroup>
      </Box>
      </Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* mostarmos la data almacenada en el servicio */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              actualizar producto
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              el producto ha sido actualizado
            </Typography>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default function BasicModal({
  modal,
  setModal,
  actionForm,
  table,
  setTable,
}) {
  const handleClose = () => setModal(false);
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
          <Typography id="modal-title" variant="h6" component="h2">
            {actionForm?.title}
          </Typography>
          {actionForm?.nameForm === "add" && (
            <AddProductsForm
              handleClose={handleClose}
              table={table}
              setTable={setTable}
            />
          )}
          {actionForm?.nameForm === "delete" && (
            <DeleteProductsForm
              data={actionForm?.data}
              handleClose={handleClose}
              table={table}
              setTable={setTable}
            />
          )}
          {actionForm?.nameForm === "update" && (
            <UpdateProductsForm
              data={actionForm?.data}
              handleClose={handleClose}
              table={table}
              setTable={setTable}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export function BasicModalSucces({ modal, setModal, title, message }) {
  const handleClose = () => setModal(false);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 5000,
      }}
    >
      <Fade in={modal}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

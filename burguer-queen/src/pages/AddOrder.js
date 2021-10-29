import React, { useReducer, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SpanningTable from "../components/SpanningTable";
import Tabs from "../components/Tabs";
import useAuth from "../services/auth/useAuth";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../services/orders/useAddOrder";
import { TYPES } from "../services/orders/actions";
import { getData } from "../helpers/get";
import { postData } from "../helpers/post";

export default function AddOrder() {
  const auth = useAuth();
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    let cancel = false;
    getData("products?limit=1000").then((response) => {
      if(cancel) return;
      if (!response.err) {
        dispatch({ type: TYPES.READ_PRODUCTS, payload: response });
        //setError(null);
      } else {
        dispatch({ type: TYPES.NO_DATA });
        // setError(response);
      }
    });
    // setLoading(false);
    return () => { cancel = true };
  }, []);

  const handleChange = (event) => {
    setClient(event.target.value);
  };

  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const delFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const addOrder = () => {
    setLoading(true);
    const data = { client };
    if (cart !== undefined && cart.length !== 0) {
      data.userId = auth.user._id;
      data.products = cart.map((product) => ({
        qty: product.quantity,
        productId: product.id,
      }));
      postData("orders", data)
        .then((response) => {
          if (!response.err) {
            // TODO: Agregar modal se agrego producto
            clearCart();
            // setError(null);
          } else {
            // setError(response);
            console.log(response)
          }
          setLoading(false);
        });
    }
  };

  return (
    <Grid
      container
      component="main"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12} sm={6}>
        <Tabs products={products} addProduct={addToCart} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Pedido
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          id="outlined-client"
          label="Cliente"
          value={client}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <SpanningTable products={cart} deleteProduct={delFromCart} />
        <ButtonGroup
          fullWidth
          sx={{ marginTop: 1 }}
          disableElevation
          variant="contained"
        >
          <Button
            sx={{ opacity: 0.7, backgroundColor: "#696969" }}
            onClick={clearCart}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            onClick={addOrder}
          >
            Pedir orden
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

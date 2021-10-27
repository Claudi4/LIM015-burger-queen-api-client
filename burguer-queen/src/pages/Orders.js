import React from "react";
import { Box, Typography } from "@mui/material";
import OrderCard from "../components/OrderCard";
const Orders = () => {
  const order = {
    _id: "5a15s1d",
    client: "Anghel",
    products: [
      {
        qty: 2,
        product: {
          name: "hamburguesa",
          price: 5,
        },
      },
      {
        qty: 2,
        product: {
          name: "hamburguesa doble",
          price: 5,
        },
      },
    ],
    status: "pendiente",
    dateEntry: Date.now(),
    dateProcessed: Date.now(),
  };
  return (
    <Box>
      <Typography variant="h4">Orders</Typography>
      <Box>
        <OrderCard order={order} action={{name:'Enviar', color: 'success'}} />
      </Box>
    </Box>
  );
};

export default Orders;

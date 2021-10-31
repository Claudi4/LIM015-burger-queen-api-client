import React from "react";
// import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import OrderTabs from '../components/OrderTabs';

const Orders = () => {
  const updateOrder = () => {};
  return (
    <Grid
      container
      component="main"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <OrderTabs updateOrder={updateOrder}/>
      </Grid>
    </Grid>
  );
};

export default Orders;

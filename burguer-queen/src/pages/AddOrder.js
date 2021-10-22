import React from "react";
import { Grid } from "@mui/material";
import SpanningTable from "../components/SpanningTable";
import Tabs from "../components/Tabs";

export default function AddOrder() {
  return (
    <Grid container component="main" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6}>
        <Tabs />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SpanningTable />
      </Grid>
    </Grid>
  );
};
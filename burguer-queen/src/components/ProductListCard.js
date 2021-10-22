import * as React from "react";
import Grid from '@mui/material/Grid';
import Card from "./ProductCard";

export default function BasicList({ products }) {

  return (
    <Grid container spacing={{ xs: 2 }} columns={{ sm: 8, md: 12 }}>
      {
        products.map((item) => (
          <Grid item xs={12} sm={4} md={6} key={item.id}>
            <Card
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

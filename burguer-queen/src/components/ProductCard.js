import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard({product, addProduct}) {
  const { id, name, price, image } = product;
  return (
    <Card sx={{ display: 'flex' }} onClick={() => addProduct(id)}>
      <CardMedia
        component="img"
        sx={{ width: "58px" }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2" sx={{ fontWeight: '300' }}>
            {name}
            <br />
            S/.{price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
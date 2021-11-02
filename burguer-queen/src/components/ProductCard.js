import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function ProductCard({ product, addProduct }) {
  const { id, name, price, image } = product;
  return (
    <Card
      sx={{
        display: 'flex',
        cursor: 'pointer',
        maxWidth: { xs: '150px', md: 'initial' },
      }}
      onClick={() => addProduct(id)}
    >
      <CardMedia
        component="img"
        sx={{
          height: { xs: '80px', md: 'inherit' },
          width: { xs: '100%', md: '58px' },
        }}
        image={image || '../images/sinImagen.webp'}
        alt={name}
      />
      <Box sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto', width: '100%' }}>
          <Typography
            component="div"
            variant="body2"
            sx={{ fontWeight: '300' }}
          >
            {name}
            <br />
            S/.{price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

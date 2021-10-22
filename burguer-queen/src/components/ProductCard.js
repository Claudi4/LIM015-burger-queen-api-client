import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard(props) {
  const { id, name, price, img } = props;
  const getId = (id) => {
    console.log(id)
  }
  return (
    <Card sx={{ display: 'flex' }} onClick={() => getId(id)}>
      <CardMedia
        component="img"
        sx={{ width: "58px" }}
        image={img}
        alt="Hamburguesa"
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
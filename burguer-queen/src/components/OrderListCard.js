import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Card from './OrderCard';
import { getData } from '../helpers/get';

export default function BasicList({ type, updateOrder }) {
  let action = { color: 'primary', name: 'Enviar' };
  switch (type) {
    case 'pendiente':
      action = { color: 'warning', name: 'Preparar' };
      break;
    case 'cancelado':
      action = { color: 'info', name: 'Pedir' };
      break;
    case 'entregado':
      action = { color: 'info', name: '' };
      break;
    case 'preparando':
      action = { color: 'info', name: 'Listo' };
      break;
    case 'listo':
      action = { color: 'success', name: 'Entregar' };
      break;
    default:
      break;
  }
  const [orders, setOrders] = useState();
  useEffect(() => {
    let cancel = false;
    getData(`orders?limit=1000&status=${type}`).then((response) => {
      if (cancel) return;
      setOrders(response);
    });
    return () => {
      cancel = true;
    };
  }, [type]);
  return (
    <Grid container spacing={{ xs: 2 }} columns={{ sm: 8, md: 12 }}>
      {orders?.map((order) => (
        <Grid item xs={12} sm={4} md={4} key={order._id}>
          <Card order={order} action={action} updateOrder={updateOrder} />
        </Grid>
      ))}
      {orders?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No hay pedidos con estado {type}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

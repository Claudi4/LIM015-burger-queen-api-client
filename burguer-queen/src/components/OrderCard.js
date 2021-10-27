import * as React from "react";
import {
  Box,
  Card,
  ButtonGroup,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";

export default function OrderCard({ order, action }) {
  const { _id, client, products, status, dateEntry, dateProcessed } = order;
  const subtotal = products.reduce((sum, item) => item.product.price + sum, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Box></Box>
        <b>Pedido:</b> {_id} <br />
        <b>Cliente:</b> {client} <br />
        <b>Estado:</b>
        <Chip variant="outlined" color="warning" size="small" label={status} />
        <br />
        <b>Dia de entrada:</b> {dateEntry} <br />
        <b>Dia procesado:</b> {dateProcessed} <br />
        <b>Total a pagar:</b> S/.{total.toFixed(2)}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.product._id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonGroup
          fullWidth
          sx={{ marginTop: 1 }}
          disableElevation
          variant="contained"
        >
          <Button
            sx={{
              opacity: 0.7,
              backgroundColor: "#696969",
              "&:hover": {
                backgroundColor: "#696969",
                opacity: 0.5,
              },
            }}
            // onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color={action.color}
            // disabled={loading}
          >
            {action.name}
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

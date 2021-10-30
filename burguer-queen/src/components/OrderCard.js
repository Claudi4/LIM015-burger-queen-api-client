import * as React from "react";
import {
  Box,
  Typography,
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
import TimerIcon from "@mui/icons-material/Timer";
import getTime from "../helpers/date";

export default function OrderCard({ order, action }) {
  const { _id, client, products, status, dateEntry, dateProcessed } = order;
  const subtotal = products.reduce(
    (sum, item) => item.product?.price ?? 0 + sum,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const time = getTime(dateProcessed, dateEntry);
  let color = "info";
  switch (status) {
    case "pendiente" || "preparando":
      color = "warning";
      break;
    case "listo":
      color = "info";
      break;
    case "entregado":
      color = "success";
      break;
    case "cancelado":
      color = "error";
      break;
    default:
      color = "info";
      break;
  }

  const styled = {
    marginRight: '10px'
  };
  return (
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            my: 1,
          }}
        >
          <TimerIcon color={time.color} />
          <Typography color={time.color}>{time.message}</Typography>
        </Box>
        <Box>
          <Typography variant="p" >
            <b>Pedido:</b> {_id} <br />
            <b>Cliente:</b> {client} <br />
            <b style={styled}>Estado:</b>
            <Chip
              variant="outlined"
              color={color}
              size="small"
              label={status}

            />
            <br />
            <b>Total a pagar:</b> S/.{total.toFixed(2)}
          </Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item) => (
              <TableRow key={item.product?._id ?? 0}>
                <TableCell>
                  {item.product?.name ?? "Producto Borrado"}
                </TableCell>
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

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

export default function BasicTable({ table, updateProduct, deleteProduct}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table" size="small">
        <TableHead>
          <TableRow>
          {table?.header.map((header, index) => <TableCell align="center" key={index}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {table?.body?.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{product._id}</TableCell>
              <TableCell align="center">{product.image}</TableCell>
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="center">{product.type}</TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell size="small" align="center">
                <IconButton onClick={() => updateProduct(product._id)}>
                  <CreateIcon color="secondary"/>
                </IconButton>
              </TableCell>
              <TableCell size="small" align="center">
                <IconButton onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon color="secondary"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

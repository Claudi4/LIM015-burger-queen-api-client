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

export default function BasicTable({ table, deleteUser, updateUser }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table" size="small">
        <TableHead>
          <TableRow>
          {table?.header?.map((header, index) => <TableCell align="center" key={index}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {table?.body?.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{user._id}</TableCell>
              <TableCell component="th" scope="row">{user.email}</TableCell>
              <TableCell>{user.roles}</TableCell>
              <TableCell size="small" align="center">
                <IconButton onClick={() => updateUser(user._id)}>
                  <CreateIcon color="secondary"/>
                </IconButton>
              </TableCell>
              <TableCell size="small" align="center">
                <IconButton onClick={() => deleteUser(user.email)}>
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

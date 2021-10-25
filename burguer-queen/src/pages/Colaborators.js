// TODO
import React, { useState } from "react";
import { Box } from "@mui/material";
import Table from "../components/UsersTable";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UsersForms from '../components/UsersForms';

const Colaborators = () => {
  const table = {
    header: ['Id', 'Correo electrónico', 'Rol', 'Editar', 'Borrar'],
    body: [
      {
        _id: 'id1',
        email: 'chef@a.com',
        roles: {
          rol: 'chef',
        }
      },
      {
        _id: 'id2',
        email: 'mesero@a.com',
        roles: {
          rol: 'mesero',
        }
      },
      {
        _id: 'id3',
        email: 'admin@a.com',
        roles: {
          rol: 'admin',
        }
      }
    ]
  }
  table.body = table.body.map((user) => ({
    ...user,
    roles: user.roles.rol
  }))
  const [ modal, setModal ] = useState(true);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>Colaboradores</h1>
        <IconButton>
          <AddCircleIcon color="success"/>
        </IconButton>
      </Box>
      <UsersForms modal={modal} setModal={setModal} title="Hola" message="hi"/>
      <Table table={table}/>
    </Box>
  );
};

export default Colaborators;

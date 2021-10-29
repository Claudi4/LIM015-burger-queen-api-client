import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/UsersTable";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UsersForms from "../components/UsersForms";
import Modal from "../components/Modal";
import { getData } from "../helpers/get";

const Colaborators = () => {
  const [table, setTable] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [actionForm, setActionForm] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData("users?limit=1000").then((response) => {
      if (cancel) return;
      if (!response.err) {
        setTable({
          header: ["Id", "Correo electrónico", "Rol", "Editar", "Borrar"],
          body: response.map((user) => ({
            ...user,
            roles: user.roles.rol,
          })),
        });
        setError(null);
      } else {
        setError({
          title: "Error",
          message: response.message,
        });
        setModalError(true);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  const addUser = () => {
    setActionForm({
      title: "Agregar usuario",
      nameForm: "add",
    });
    setModal(true);
  };

  const deleteUser = (email) => {
    setActionForm({
      title: "¿Seguro que desea borrar usuario?",
      nameForm: "delete",
      data: email,
    });
    setModal(true);
    // setError({ title: 'delete', message: email });
    // setModalError(true);
  };

  const updateUser = (user) => {
    setActionForm({
      title: "Actualizar usuario",
      nameForm: "update",
      data: user,
    });
    setModal(true);
    // setModalError(true);
    // setError({ title: 'update', message: email });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Colaboradores</h1>
        <IconButton onClick={addUser}>
          <AddCircleIcon color="success" />
        </IconButton>
      </Box>
      <Table table={table} deleteUser={deleteUser} updateUser={updateUser} />
      <UsersForms
        modal={modal}
        setModal={setModal}
        actionForm={actionForm}
        table={table}
        setTable={setTable}
      />
      <Modal
        modal={modalError}
        setModal={setModalError}
        title={error?.title}
        message={error?.message}
      />
    </Box>
  );
};

export default Colaborators;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/ProductsTable";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProdutctsForms from '../components/ProductsForms';
import Modal from '../components/Modal';
import { getData } from "../helpers/get";

const Products = () => {
    const [ table, setTable] = useState(null);
    const [ modal, setModal ] = useState(false);
    const [ modalError, setModalError ] = useState(false);
    const [ actionForm, setActionForm ] = useState();
    const [ error, setError ] = useState(null);
    
    useEffect(() => {
      let controller = new AbortController();
      getData("products?limit=1000").then((response) => {
        if (!response.err) {
          setTable({
            header: ['Id', 'Imagen', 'Producto','Categoria','Precio', 'Editar', 'Borrar'],
            body:  response.map((products) => ({
              ...products,
              type: products.type
            }))
          })
          setError(null);
      } else {
        setError({
          title: 'Error',
          message: response.message
        });
        setModalError(true);
      }
      controller = null;
    });
    return () => controller?.abort();
  }, []);

  const addProducts = () => {
    setActionForm({
      title: 'Agregar Producto',
      nameForm: 'add'
    })
    setModal(true);
  }
  
  const deleteProduct = (products) => {
    setActionForm({
      title: '¿Seguro que desea borrar producto?',
      nameForm: 'delete',
      data: products,
    })
    setModal(true);
    }
  
    const updateProduct = (products) => {
      setActionForm({
      title: 'Actualizar producto',
      nameForm: 'update',
      data: products,
      })
    setModal(true);

    }

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1>Productos</h1>
          <IconButton onClick={addProducts}>
            <AddCircleIcon color="success"/>
          </IconButton>
        </Box>
        <Table table={table} deleteProduct={deleteProduct} updateProduct={updateProduct}/>
        <ProdutctsForms modal={modal} setModal={setModal} actionForm={actionForm} table={table} setTable={setTable}/>
        <Modal modal={modalError} setModal={setModalError} title={error?.title} message={error?.message}/>
      </Box>
    );
  };

export default Products;

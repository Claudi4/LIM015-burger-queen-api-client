import React from "react";
import { Switch, Route} from "react-router-dom";
import Box from '@mui/material/Box';
import MainBar from '../components/Layout/MainBar';
import SideBar from "../components/Layout/SideBar";
import Topic from "../components/Layout/Content";

import BookIcon from '@mui/icons-material/Book';

const ChefRouter = () => {
  const routes = [
    {
      text: 'Pedidos',
      icon: <BookIcon />
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <MainBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} routes={routes} />
      <Box component="main" sx={{
          flexGrow: 1,
          p: 2,
          height: '100vh',
          marginTop: '80px',
          overflow: 'auto',
      }}>
        <Switch>
          <Route exact path="/chef">
            <h1>Hola chef</h1>
          </Route>
          <Route path="/chef/:topicId" children={<Topic routes={routes}/>}/>
        </Switch>
      </Box>
    </Box>
  );
};

export default ChefRouter;

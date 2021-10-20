import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Box from '@mui/material/Box';
import MainBar from '../components/Layout/MainBar';
import SideBar from "../components/Layout/SideBar";
import Topic from "../components/Layout/Content";
import useAuth from "../services/auth/useAuth";

import BookIcon from '@mui/icons-material/Book';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const WaiterRouter = () => {
  const routes = [
    {
      route: '/perfil',
      text: 'Perfil',
      icon: <AccountCircleIcon />,
      main: <h2>Perfil</h2>
    },
    {
      route: '/mesas',
      text: 'Mesas',
      icon: <RestaurantIcon />,
      main: <h2>Mesas</h2>
    },
    {
      route: '/pedidos',
      text: 'Pedidos',
      icon: <BookIcon />,
      main: <h2>Pedidos</h2>
    },
  ];
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {auth.urlRol() !== "/waiter" && <Redirect to={auth.urlRol()}/>}
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
          <Route exact path="/waiter">
            <h1>Hola waiter</h1>
          </Route>
          <Route path="/waiter/:topicId" children={<Topic routes={routes}/>}/>
        </Switch>
      </Box>
    </Box>
  );
};

export default WaiterRouter;

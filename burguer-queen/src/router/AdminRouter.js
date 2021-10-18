import React from "react";
import { Switch, Route} from "react-router-dom";
import Box from '@mui/material/Box';
import MainBar from '../components/Layout/MainBar';
import SideBar from "../components/Layout/SideBar";
import Topic from "../components/Layout/Content";

import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AdminRouter = () => {
  const routes = [
    {
      text: 'Colaboradores',
      icon: <GroupIcon />,
      main: () => <h2>Colaborators</h2>
    },
    {
      text: 'Productos',
      icon: <ShoppingCartIcon />,
      main: () => <h2>Products</h2>
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
          <Route exact path="/admin">
            <h1>Hola admin</h1>
          </Route>
          <Route path="/admin/:topicId" children={<Topic routes={routes}/>}/>
        </Switch>
      </Box>
    </Box>
  );
};

export default AdminRouter;

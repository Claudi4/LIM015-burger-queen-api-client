import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DrawerList = ({routes, url}) => {
  const newUrl = url.slice(-1) === '/' ? url.slice(0, -1): url;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      <ListItem
        button
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0)}
        component={RouterLink}
        to={`${newUrl}`}
      >
        <ListItemIcon sx={{ minWidth: '40px' }}>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component={RouterLink}
        to={`${newUrl}/perfil`}
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1)}
      >
        <ListItemIcon sx={{ minWidth: '40px' }}>
          <AccountCircleIcon/>
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
        {
          routes.map((item, index) => {
            const { text, icon } = item;
            return (
              <ListItem
                button
                key={text}
                component={RouterLink}
                to={`${newUrl}/${text.toLowerCase()}`}
                selected={selectedIndex === (index + 2)}
                onClick={() => handleListItemClick((index + 2))}
              >
                {icon && <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })
        }
    </List>
  )
};

export default DrawerList;
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';

const DrawerList = ({routes, url}) => {
  const newUrl = url.slice(-1) === '/' ? url.slice(0, -1): url;
  let { pathname } = useLocation();
  const path = pathname.replace(newUrl, '');
  const route = routes.map((item, index) => {
    if (path === item.route) {
      return index + 1;
    }
    return 0;
  })
  const initialSelectedIndex = route.filter((item) => item !== 0)[0]??0;
  const [selectedIndex, setSelectedIndex] = React.useState(initialSelectedIndex);

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
        {
          routes.map((item, index) => {
            const { text, icon } = item;
            return (
              <ListItem
                button
                key={text}
                component={RouterLink}
                to={`${newUrl}/${text.toLowerCase()}`}
                selected={selectedIndex === (index + 1)}
                onClick={() => handleListItemClick((index + 1))}
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
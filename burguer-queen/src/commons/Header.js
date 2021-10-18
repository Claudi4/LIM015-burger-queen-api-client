import { AppBar, Toolbar, Typography  } from "@material-ui/core";
import React from 'react';

const Header = () => {
    return(
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant ='h6'>
                        bluee
                    </Typography>
                </Toolbar>
            </AppBar>
    </div>
    ) 
}






/*function Header ({titulo}) {
    return ( 
        <nav>
            <div className = "nav-wrapper light-blue darken-2">
                <a href ="#!" className = "brand-logo">{titulo}</a>
            </div>
        </nav>
    )
}*/
export default Header;
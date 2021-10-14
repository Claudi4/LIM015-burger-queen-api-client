import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Admin from "../pages/Admin";
import EditPpofile from "../pages/EditProfile";
import HeadChef from "../pages/HeadChef";
import Login from "../pages/Login";
import Waiter from "../pages/Waiter";
import Button from '@mui/material/Button';

function RouterPage() {
    return (
        <Router>
            <div className="App">
                <div>
                    <Link to="/">
                        <Button variant="contained">Login</Button>
                    </Link>
                    <Link to="/edit-profile">
                        <Button variant="contained">Edit</Button>
                    </Link>
                    <Link to="/admin">
                        <Button variant="contained">Admin</Button>
                    </Link>
                    <Link to="/head-chef">
                        <Button variant="contained">Chef</Button>
                    </Link>
                    <Link to="/waiter">
                        <Button variant="contained">Waiter</Button>
                    </Link>
                </div>
                <Switch>
                    <Route path="/edit-profile">
                        <EditPpofile />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/head-chef">
                        <HeadChef />
                    </Route>
                    <Route path="/waiter">
                        <Waiter />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default RouterPage;

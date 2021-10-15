import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Admin from "../pages/Admin";
import EditProfile from "../pages/EditProfile";
import HeadChef from "../pages/HeadChef";
import Login from "../pages/Login";
import Waiter from "../pages/Waiter";


function RouterPage() {
  /*
  import Button from '@mui/material/Button';
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
    </div> */
  return (
    <Router>
      <Switch>
        <Route path="/edit-profile">
          <EditProfile />
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
    </Router>
  );
}

export default RouterPage;

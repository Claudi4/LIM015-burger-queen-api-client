import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Admin from "../pages/Admin";
import EditPpofile from "../pages/EditProfile";
import HeadChef from "../pages/HeadChef";
import Login from "../pages/Login";
import Waiter from "../pages/Waiter";

function RouterPage() {
    return (
        <Router>
            <div className="App">
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

import React, { useState } from "react";
import {BrowserRouter as Router, Redirect, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import AdminRouter from "./AdminRouter";
import ChefRouter from "./ChefRouter";
import WaiterRouter from "./WaiterRouter";

function AppRouter() {
  const [modal, setModal] = useState(null);
  const [loader, setLoader] = useState(null);
  return (
    <Router>
      {loader && <Loader />}
      {modal && <Modal modal={modal} setModal={setModal} setLoader={setLoader}/>}
      <Switch>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute path="/admin" component={AdminRouter} />
        <PrivateRoute path="/chef" component={ChefRouter} />
        <PrivateRoute path="/waiter" component={WaiterRouter} />
        <Route path="/404" component={NotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;

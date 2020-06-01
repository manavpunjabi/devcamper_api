import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import Bootcamps from "../layout/Bootcamp/Bootcamps";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/bootcamps" component={Bootcamps} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

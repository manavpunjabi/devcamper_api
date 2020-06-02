import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import Bootcamps from "../layout/Bootcamp/Bootcamps";
import Bootcamp from "../layout/Bootcamp/Bootcamp";
const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/bootcamps" component={Bootcamps} />
        <PrivateRoute exact path="/bootcamps/:id" component={Bootcamp} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

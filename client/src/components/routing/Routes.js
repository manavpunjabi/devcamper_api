import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

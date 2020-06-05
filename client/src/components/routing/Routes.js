import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import PublisherRoute from "./PublisherRoute";
import UserRoute from "./UserRoute";
import Bootcamps from "../layout/Bootcamp/Bootcamps";
import Bootcamp from "../layout/Bootcamp/Bootcamp";
import Reviews from "../layout/Review/Reviews";
import AddBootcamp from "../layout/Bootcamp/AddBootcamp";
import AddCourse from "../layout/Bootcamp/AddCourse";
import AddReview from "../layout/Bootcamp/AddReview";
const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/bootcamps" component={Bootcamps} />
        <PrivateRoute exact path="/bootcamps/:id" component={Bootcamp} />
        <PrivateRoute exact path="/bootcamps/:id/reviews" component={Reviews} />
        <PublisherRoute exact path="/add-bootcamp" component={AddBootcamp} />
        <PublisherRoute
          exact
          path="/bootcamps/:id/add-course"
          component={AddCourse}
        />
        <UserRoute
          exact
          path="/bootcamps/:id/reviews/add-review"
          component={AddReview}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

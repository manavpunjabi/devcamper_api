import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/LandingPage/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import "./style/css/App.css";
import "./style/css/bootstrap.css";
import "./style/css/style.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;

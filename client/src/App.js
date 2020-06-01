import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/LandingPage/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
// CSS
import "./style/css/bootstrap.css";
import "./style/css/style.css";
// import "./style/css/App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
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
};

export default App;

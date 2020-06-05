import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublisherRoute = ({
  auth: {
    isAuthenticated,
    loading,
    user: { role },
  },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      role === "user" ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

PublisherRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PublisherRoute);

import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const UserRoute = ({
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
      role === "publisher" ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

UserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserRoute);

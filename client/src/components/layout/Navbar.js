import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
        >
          <i className="fas fa-user"></i> Account
        </Link>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/manage-bootcamp">
            Manage Bootcamp
          </Link>
          <Link className="dropdown-item" to="/manage-reviews">
            Manage Reviews
          </Link>
          <Link className="dropdown-item" to="/manage-account">
            Manage Account
          </Link>
          <div className="dropdown-divider"></div>
          <Link onClick={logout} className="dropdown-item" to="/login">
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-laptop-code"></i> DevCamper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
            <li className="nav-item d-none d-sm-block">
              <Link className="nav-link" to="#">
                |
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bootcamps">
                Browse Bootcamps
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

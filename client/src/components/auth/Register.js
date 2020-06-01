import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { Redirect } from "react-router-dom";

const Register = ({ auth: { isAuthenticated }, setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, role });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <section className="form mt-8">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-user-plus"></i> Register
                </h1>
                <p>
                  Register to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      required
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      required
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label for="password2">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      className="form-control"
                      placeholder="Confirm password"
                      required
                      value={password2}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="card card-body mb-3">
                    <h5>User Role</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="user"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="form-check-label">
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="publisher"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="form-check-label">
                        Bootcamp Publisher
                      </label>
                    </div>
                  </div>
                  <p className="text-danger">
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

import React, { useState } from "react";
import PropTypes from "prop-types";
import { forgotPassword } from "../../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const ForgotPassword = ({ forgotPassword, history }) => {
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    forgotPassword(formData, history);
  };
  return (
    <section class="container mt-7">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <Link to="/login.">Back to login</Link>
              <h1 class="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password using the registered email
                address.
              </p>
              <form onSubmit={(e) => onSubmit(e)}>
                <div class="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Reset Password"
                    class="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword })(ForgotPassword);

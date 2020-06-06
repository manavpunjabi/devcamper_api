import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../../actions/auth";
import Spinner from "../../spinner/Spinner";
import { updateUser } from "../../../actions/user";
import { Link, withRouter } from "react-router-dom";

const ManageAccount = ({
  updateUser,
  getCurrentUser,
  user: { loading, user },
  history,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    getCurrentUser();
    setFormData({
      name: loading || !user.name ? "" : user.name,
      email: loading || !user.email ? "" : user.email,
    });
  }, [loading, getCurrentUser]);

  const { name, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, history);
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className="container mt-7">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ManageAccount.propTypes = {
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getCurrentUser, updateUser })(
  ManageAccount
);

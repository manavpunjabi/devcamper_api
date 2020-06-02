import React, { Fragment, useState } from "react";
import LatestBootcamp from "./LatestBootcamps";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getBootcampsByDistance } from "../../../actions/bootcamp";

const Landing = ({ getBootcampsByDistance, history }) => {
  const [formData, setFormData] = useState({ kms: "", pincode: "" });

  const { kms, pincode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getBootcampsByDistance(kms, pincode, history, true);
    return <Redirect to="/bootcamps" />;
  };

  return (
    <Fragment>
      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <h1 className="display-4">Find a Code Bootcamp</h1>
            <p className="lead">
              Find, rate and read reviews on coding bootcamps
            </p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="kms"
                      placeholder="Kilometres From"
                      value={kms}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </section>

      <LatestBootcamp />
    </Fragment>
  );
};

Landing.propTypes = {
  getBootcampsByDistance: PropTypes.func.isRequired,
};

export default connect(null, { getBootcampsByDistance })(Landing);

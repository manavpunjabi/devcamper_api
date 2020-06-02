import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import Filter from "./Filter";
import { getBootcampsByDistance } from "../../../actions/bootcamp";

const Sidebar = ({ getBootcampsByDistance, history }) => {
  const [formData, setFormData] = useState({ kms: "", pincode: "" });

  const { kms, pincode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getBootcampsByDistance(kms, pincode, history);
  };

  return (
    <div className="col-md-4">
      <div className="card card-body mb-4">
        <h4 className="mb-3">By Location</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="kms"
                  placeholder="Kms From"
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
      {/* <Filter /> */}
    </div>
  );
};

Sidebar.propTypes = {
  getBootcampsByDistance: PropTypes.func.isRequired,
};

export default connect(null, { getBootcampsByDistance })(Sidebar);

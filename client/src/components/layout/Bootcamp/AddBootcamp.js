import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBootcamp } from "../../../actions/bootcamp";

const AddBootcamp = ({ addBootcamp, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    careers: ["Web Development", "Mobile Development"],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
  });
  const {
    name,
    address,
    phone,
    email,
    website,
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addBootcamp(formData, history);
  };
  return (
    <section className="container mt-7">
      <h1 className="mb-2">Add Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Location & Contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Bootcamp Name"
                    required
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Full Address"
                    required
                    value={address}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Contact Email"
                    value={email}
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="Website URL"
                    value={website}
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    maxlength="500"
                    value={description}
                    required
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                {/* Careers */}
                <div class="form-group">
                  <label>Careers</label>
                  <select
                    name="careers"
                    class="custom-select"
                    multiple
                    value={careers}
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Select all that apply</option>
                    <option
                      value={careers[0]}
                      onChange={(e) => onChange(e)}
                      name="Web Development"
                    >
                      Web Development
                    </option>
                    <option value={careers[1]}>Mobile Development</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Facilities */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="housing"
                    id="housing"
                    value={!housing}
                    onChange={(e) => onChange(e)}
                  />
                  <label className="form-check-label" for="housing">
                    Housing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobAssistance"
                    id="jobAssistance"
                    value={!jobAssistance}
                    onChange={(e) => onChange(e)}
                  />
                  <label className="form-check-label" for="jobAssistance">
                    Job Assistance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobGuarantee"
                    id="jobGuarantee"
                    value={!jobGuarantee}
                    onChange={(e) => onChange(e)}
                  />
                  <label className="form-check-label" for="jobGuarantee">
                    Job Guarantee
                  </label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Bootcamp"
            className="btn btn-success btn-block my-4"
          />
        </div>
      </form>
    </section>
  );
};

AddBootcamp.propTypes = {
  addBootcamp: PropTypes.func.isRequired,
};

export default connect(null, { addBootcamp })(AddBootcamp);

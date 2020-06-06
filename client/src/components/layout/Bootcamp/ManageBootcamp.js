import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../spinner/Spinner";
import { getBootcampByUser } from "../../../actions/bootcamp";

const ManageBootcamp = ({
  getBootcampByUser,
  bootcamp: { bootcamp, loading },
}) => {
  useEffect(() => {
    getBootcampByUser();
  }, [getBootcampByUser]);

  return loading ? (
    <Spinner />
  ) : bootcamp ? (
    <section className="container mt-7">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Bootcamp</h1>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={bootcamp.photo} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="bootcamp.html">
                          {bootcamp.name}
                          <span className="float-right badge badge-success">
                            {bootcamp.averageRating}
                          </span>
                        </a>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        {bootcamp.location.city}, {bootcamp.location.state}
                      </span>
                      <p className="card-text">
                        {bootcamp.careers.map((career) => (
                          <small className="text-muted">{career}, </small>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="mb-4">
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="photo"
                      className="custom-file-input"
                      id="photo"
                    />
                    <label className="custom-file-label" for="photo">
                      Add Bootcamp Image
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-light btn-block"
                  value="Upload Image"
                />
              </form>
              <Link to="/edit-bootcamp" className="btn btn-primary btn-block">
                Edit Bootcamp Details
              </Link>
              <Link
                to="/manage-courses"
                className="btn btn-secondary btn-block"
              >
                Manage Courses
              </Link>
              <Link className="btn btn-danger btn-block">Remove Bootcamp</Link>
              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="container mt-7">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Bootcamp</h1>
              <p className="lead">You have not yet added a bootcamp</p>
              <Link to="/add-bootcamp" className="btn btn-primary btn-block">
                Add Bootcamp
              </Link>
              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ManageBootcamp.propTypes = {
  getBootcampByUser: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcampByUser })(ManageBootcamp);

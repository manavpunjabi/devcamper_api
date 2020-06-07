import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../spinner/Spinner";
import { Link } from "react-router-dom";
import { getCoursesForBootcamp } from "../../../actions/course";
import { getBootcampByUser } from "../../../actions/bootcamp";
import ManageCourseItem from "./ManageCourseItem";
const ManageCourses = ({
  bootcamp,
  course: { courses, loading },
  getBootcampByUser,
  getCoursesForBootcamp,
  history,
}) => {
  useEffect(() => {
    getBootcampByUser();
    getCoursesForBootcamp(bootcamp.bootcamp._id);
  }, [getCoursesForBootcamp, bootcamp.loading, getBootcampByUser, loading]);

  return loading ? (
    <Spinner />
  ) : courses.length > 0 ? (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={bootcamp.bootcamp.photo}
                      className="card-img"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to="bootcamp.html">
                          {bootcamp.bootcamp.name}
                          <span className="float-right badge badge-success">
                            {bootcamp.bootcamp.averageRating}
                          </span>
                        </Link>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        {bootcamp.bootcamp.location.city},{" "}
                        {bootcamp.bootcamp.location.state}
                      </span>
                      <p className="card-text">
                        {bootcamp.bootcamp.careers.map((career) => (
                          <small className="text-muted">{career}, </small>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to={`/bootcamps/${bootcamp.bootcamp._id}/add-course`}
                className="btn btn-primary btn-block mb-4"
              >
                Add Bootcamp Course
              </Link>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <ManageCourseItem key={c._id} course={c} />
                  ))}
                </tbody>
              </table>
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
              <h1 className="mb-2">Manage Courses</h1>
              <p className="lead">You have not yet added any courses</p>
              <Link
                to={`/bootcamps/${bootcamp.bootcamp._id}/add-course`}
                className="btn btn-primary btn-block"
              >
                Add Your first course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ManageCourses.propTypes = {
  getCoursesForBootcamp: PropTypes.func.isRequired,
  getBootcampByUser: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, {
  getBootcampByUser,
  getCoursesForBootcamp,
})(ManageCourses);

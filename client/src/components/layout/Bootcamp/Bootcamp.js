import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamp } from "../../../actions/bootcamp";
import { getCoursesForBootcamp } from "../../../actions/course";
import Spinner from "../../spinner/Spinner";
import { Link } from "react-router-dom";
import Courses from "./Courses";
const Bootcamp = ({
  getBootcamp,
  getCoursesForBootcamp,
  match,
  course: { courses },
  bootcamp: { loading, bootcamp },
}) => {
  useEffect(() => {
    getBootcamp(match.params.id);
    getCoursesForBootcamp(match.params.id);
  }, [getBootcamp, getCoursesForBootcamp, match.params.id]);

  return loading || bootcamp === null ? (
    <Spinner />
  ) : (
    <section className="bootcamp mt-7">
      <div className="row">
        <div className="col-md-8">
          <h1>{bootcamp.name}</h1>
          <p>{bootcamp.description}</p>
          <p className="lead mb-4">
            Average Course Cost:{" "}
            <span className="text-primary">₹{bootcamp.averageCost}</span>
          </p>
          {/* Courses*/}
          {courses.map((c) => (
            <Courses key={c._id} course={c} />
          ))}
        </div>
        {/* Image */}
        <div className="col-md-4">
          <img src={bootcamp.photo} alt="" className="img-thumbnail" />
          {/* <!-- Rating --> */}
          <h1 class="text-center my-4">
            <span className="badge badge-secondary badge-success rounded-circle p-3">
              {bootcamp.rating}
            </span>{" "}
            Rating
          </h1>
          {/* <!-- Buttons --> */}
          <Link
            to={`/bootcamps/${bootcamp.id}/reviews`}
            replace
            className="btn btn-dark btn-block my-3"
          >
            <i className="fas fa-comments"></i> Read Reviews
          </Link>
          <Link
            to={`/add-review/${bootcamp.id}`}
            className="btn btn-light btn-block my-3"
          >
            <i className="fas fa-pencil-alt"></i> Write a Review
          </Link>
          <Link
            to={bootcamp.website}
            target="_blank"
            className="btn btn-secondary btn-block my-3"
          >
            <i className="fas fa-globe"></i> Visit Website
          </Link>
          {/* <!-- Map --> */}
          {/* <div id="map" style={{ width: "100%", height: "300px" }}></div> */}
          {/* Perks */}
          <ul className="list-group list-group-flush mt-4">
            <li className="list-group-item">
              {bootcamp.housing ? (
                <i className="fas fa-check text-success" />
              ) : (
                <i className="fas fa-times text-danger" />
              )}{" "}
              Housing
            </li>
            <li className="list-group-item">
              {bootcamp.jobAssistance ? (
                <i className="fas fa-check text-success" />
              ) : (
                <i className="fas fa-times text-danger" />
              )}{" "}
              Job Assistance
            </li>
            <li className="list-group-item">
              {bootcamp.jobGuarantee ? (
                <i className="fas fa-check text-success" />
              ) : (
                <i className="fas fa-times text-danger" />
              )}{" "}
              Job Guarantee
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

Bootcamp.propTypes = {
  getBootcamp: PropTypes.func.isRequired,
  getCoursesForBootcamp: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
  course: state.course,
});

export default connect(mapStateToProps, { getBootcamp, getCoursesForBootcamp })(
  Bootcamp
);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../../actions/course";
import { getBootcamp } from "../../../actions/bootcamp";
import Spinner from "../../spinner/Spinner";

const AddCourse = ({
  getBootcamp,
  bootcamp: { bootcamp, loading },
  addCourse,
  match,
  history,
}) => {
  useEffect(() => {
    getBootcamp(match.params.id);
  }, [getBootcamp, match.params.id]);

  const [formData, setFormData] = useState({
    title: "",
    weeks: "",
    tuition: "",
    minimumSkill: "beginner",
    description: "",
    scholarshipAvailable: false,
  });
  const {
    title,
    weeks,
    tuition,
    minimumSkill,
    description,
    scholarshipAvailable,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCourse(match.params.id, formData, history);
  };
  return loading ? (
    <Spinner />
  ) : (
    <section className="container mt-7">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <a
                href="manage-courses.html"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Courses
              </a>
              <h1 className="mb-2">{bootcamp.name}</h1>
              <h3 className="text-primary mb-4">Add Course</h3>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="number"
                    name="weeks"
                    placeholder="Duration"
                    className="form-control"
                    value={weeks}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Enter number of weeks course lasts
                  </small>
                </div>
                <div className="form-group">
                  <label>Course Tuition</label>
                  <input
                    type="number"
                    name="tuition"
                    placeholder="Tuition"
                    className="form-control"
                    value={tuition}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">INR Currency</small>
                </div>
                <div className="form-group">
                  <label>Minimum Skill Required</label>
                  <select
                    onChange={(e) => onChange(e)}
                    name="minimumSkill"
                    className="form-control"
                    value={minimumSkill}
                  >
                    <option value="beginner" selected>
                      Beginner (Any)
                    </option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Course description summary"
                    maxlength="500"
                    onChange={(e) => onChange(e)}
                    value={description}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="scholarshipAvailable"
                    id="scholarshipAvailable"
                    onChange={(e) => onChange(e)}
                    value={!scholarshipAvailable}
                  />
                  <label
                    className="form-check-label"
                    for="scholarshipAvailable"
                  >
                    Scholarship Available
                  </label>
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-dark btn-block"
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

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getBootcamp: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { addCourse, getBootcamp })(AddCourse);

import React from "react";
import PropTypes from "prop-types";

const Courses = ({
  course: {
    title,
    weeks,
    description,
    tuition,
    minimumSkill,
    scholarshipAvailable,
  },
}) => {
  return (
    <div className="card mb-3">
      <h5 className="card-header bg-primary text-white">{title}</h5>
      <div className="card-body">
        <h5 className="card-title">Duration: {weeks} Weeks</h5>
        <p className="card-text">{description}</p>
        <ul className="list-group mb-3">
          <li className="list-group-item">Cost: ₹{tuition} </li>
          <li className="list-group-item">
            Skills Required:{" "}
            {minimumSkill.charAt(0).toUpperCase() + minimumSkill.slice(1)}{" "}
          </li>
          <li className="list-group-item">
            Scholarship Available:{" "}
            {scholarshipAvailable ? (
              <i class="fas fa-check text-success" />
            ) : (
              <i class="fas fa-times text-danger" />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

Courses.propTypes = {};

export default Courses;

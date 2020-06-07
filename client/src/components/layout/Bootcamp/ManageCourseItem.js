import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteCourse } from "../../../actions/course";
import { connect } from "react-redux";

const ManageCourseItem = ({
  deleteCourse,
  course: { title, _id },
  history,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <Link to="add-course.html" className="btn btn-secondary">
          <i className="fas fa-pencil-alt"></i>
        </Link>
        <button
          onClick={(e) => deleteCourse(_id, history)}
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  );
};

ManageCourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default connect(null, { deleteCourse })(ManageCourseItem);

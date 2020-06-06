import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../spinner/Spinner";
import { Link } from "react-router-dom";
import { getCoursesForBootcamp } from "../../../actions/course";
import { getBootcampByUser } from "../../../actions/bootcamp";

const ManageCourses = ({
  bootcamp,
  course: { courses, loading },
  getBootcampByUser,
  getCoursesForBootcamp,
}) => {
  useEffect(() => {
    getBootcampByUser();
    getCoursesForBootcamp(bootcamp.bootcamp._id);
  }, [bootcamp.loading, getBootcampByUser, getCoursesForBootcamp]);

  return loading ? <Spinner /> : <div className="mt-7">hii</div>;
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

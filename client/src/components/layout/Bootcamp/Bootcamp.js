import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamp } from "../../../actions/bootcamp";

const Bootcamp = ({
  getBootcamp,
  match,
  bootcamp: {
    location,
    careers,
    photo,
    housing,
    jobAssistance,
    jobGuarantee,
    name,
    description,
    website,
    phone,
    email,
    averageCost,
  },
}) => {
  useEffect(() => {
    getBootcamp(match.params.id);
  }, [getBootcamp, match.params.id]);
  return <div></div>;
};

Bootcamp.propTypes = {
  getBootcamp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcamp })(Bootcamp);

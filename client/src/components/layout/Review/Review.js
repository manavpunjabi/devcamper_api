import React from "react";
import PropTypes from "prop-types";

const Review = ({ review: { title, text, rating } }) => {
  return (
    <div className="card mb-3">
      <div className="card-header bg-dark text-white">{title}</div>
      <div className="card-body">
        <h5 className="card-title">
          Rating <span className="text-success">{rating} </span>
        </h5>
        <p className="card-text">{text}</p>
        <p className="text-muted">Written By</p>
      </div>
    </div>
  );
};

Review.propTypes = {};

export default Review;

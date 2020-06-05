import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Review = ({ review: { title, rating, text } }) => {
  return (
    <div className="card mb-3">
      <div className="card-header bg-dark text-white">{title}</div>
      <div className="card-body">
        <h5 className="card-title">
          Rating <span className="text-success">{rating} </span>
        </h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;

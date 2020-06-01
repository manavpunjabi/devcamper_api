import React from "react";
import PropTypes from "prop-types";

const BootcampItem = ({
  bootcamp: {
    name,
    rating,
    location: { city, state },
    photo,
    careers,
  },
}) => {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={photo} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <a href="bootcamp.html">
                {name}
                <span className="float-right badge badge-success">
                  {rating}
                </span>
              </a>
            </h5>
            <span className="badge badge-dark mb-2">
              {city}, {state}
            </span>
            <p className="card-text">
              {careers.map((career) => (
                <small className="text-muted">{career}, </small>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

BootcampItem.propTypes = {};

export default BootcampItem;

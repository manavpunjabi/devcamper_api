import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const BootcampItem = ({
  bootcamp: {
    name,
    averageRating,
    location: { city, state },
    photo,
    careers,
    id,
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
              <Link to={`/bootcamps/${id}`}>
                {name}
                <span className="float-right badge badge-success">
                  {averageRating}
                </span>
              </Link>
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

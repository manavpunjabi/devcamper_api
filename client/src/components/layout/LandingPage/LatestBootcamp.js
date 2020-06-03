import React from "react";
import { Link } from "react-router-dom";

const LatestBootcamp = ({
  bootcamp: {
    photo,
    name,
    location: { city, state },
    rating,
    description,
    careers,
    id,
  },
}) => {
  return (
    <div className="card">
      <img src={photo} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/bootcamps/${id}`}>
            {name}
            <span className="float-right badge badge-success">{rating}</span>
          </Link>
        </h5>
        <span className="badge badge-dark mb-2">
          {city}, {state}
        </span>
        <p className="card-text">{description}</p>
        <p className="card-text">
          {careers.map((career) => (
            <small className="text-muted">{career}, </small>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LatestBootcamp;

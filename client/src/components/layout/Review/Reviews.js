import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getReviews } from "../../../actions/review";
import { getBootcamp } from "../../../actions/bootcamp";
import Spinner from "../../spinner/Spinner";
import Review from "./Review";

const Reviews = ({
  getBootcamp,
  bootcamp: { bootcamp },
  match,
  getReviews,
  review: { reviews, loading },
}) => {
  useEffect(() => {
    getReviews(match.params.id);
    getBootcamp(match.params.id);
  }, [getReviews, getBootcamp, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="bootcamp mt-7">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Link
              to={`/bootcamps/${match.params.id}`}
              replace
              class="btn btn-secondary my-3"
            >
              <i class="fas fa-chevron-left"></i> Bootcamp Info
            </Link>
            <h1 className="mb-4">{bootcamp.name} Reviews </h1>
            {reviews.map((r) => (
              <Review key={r._id} review={r} />
            ))}
          </div>
          <div className="col-md-4">
            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                {bootcamp.averageRating}
              </span>
              Rating
            </h1>
            <Link
              to={`/bootcamps/:id/reviews/add-review`}
              replace
              className="btn btn-primary btn-block my-3"
            >
              <i class="fas fa-pencil-alt"></i> Review This Bootcamp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  getBootcamp: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getReviews, getBootcamp })(Reviews);

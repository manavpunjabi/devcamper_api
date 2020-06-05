import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../../actions/review";
import { getBootcamp } from "../../../actions/bootcamp";
import Spinner from "../../spinner/Spinner";
import { Link } from "react-router-dom";

const AddReview = ({
  bootcamp: { bootcamp, loading },
  addReview,
  match,
  history,
  getBootcamp,
}) => {
  useEffect(() => {
    getBootcamp(match.params.id);
  }, [getBootcamp, match.params.id]);

  const [formData, setFormData] = useState({
    rating: "5",
    title: "",
    text: "",
  });
  const { rating, title, text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addReview(match.params.id, formData, history);
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className="container mt-7">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to={`/bootcamps/${match.params.id}`}
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Bootcamp Info
              </Link>
              <h1 className="mb-2">{bootcamp.name}</h1>
              <h3 className="text-primary mb-4">Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label for="rating">
                    Rating: <span className="text-primary">{rating}</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    step="1"
                    value={rating}
                    name="rating"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Review title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="text"
                    rows="10"
                    className="form-control"
                    placeholder="Your review"
                    value={text}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit Review"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  getBootcamp: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { addReview, getBootcamp })(AddReview);

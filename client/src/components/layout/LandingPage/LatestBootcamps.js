import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LatestBootcamp from "./LatestBootcamp";
import { connect } from "react-redux";
import { getLatestBootcamps } from "../../../actions/bootcamp";
import Spinner from "../../spinner/Spinner";

const LatestBootcamps = ({
  getLatestBootcamps,
  bootcamp: { bootcamps, loading },
}) => {
  useEffect(() => {
    getLatestBootcamps();
  }, [getLatestBootcamps]);

  return loading ? (
    <Spinner />
  ) : (
    <section className="latest py-5 bg-light">
      <div className="container">
        <h3>Latest Bootcamps</h3>
        <div className="card-group">
          {bootcamps.map((bootcamp) => (
            <LatestBootcamp key={bootcamp._id} bootcamp={bootcamp} />
          ))}
        </div>
      </div>
    </section>
  );
};

LatestBootcamps.propTypes = {
  getLatestBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getLatestBootcamps })(
  LatestBootcamps
);

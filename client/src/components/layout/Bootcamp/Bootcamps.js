import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamps } from "../../../actions/bootcamp";
import BootcampItem from "./BootcampItem";
import Siderbar from "./Sidebar";
import Spinner from "../../spinner/Spinner";
import Pagination from "./Pagination";

const Bootcamps = ({ bootcamp: { bootcamps, loading }, getBootcamps }) => {
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);

  return loading ? (
    <Spinner />
  ) : (
    <section className="browse my-6">
      <div className="container">
        <div className="row">
          {/* Sidebar  */}
          <Siderbar />

          {/* Main col  */}
          <div className="col-md-8">
            {/* Bootcamps  */}

            {bootcamps.map((bc) => (
              <BootcampItem key={bc._id} bootcamp={bc} />
            ))}

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
};

Bootcamps.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcamps })(Bootcamps);

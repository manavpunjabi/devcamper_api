import React, { Fragment } from "react";
import LatestBootcamp from "./LatestBootcamps";
const Landing = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <h1 className="display-4">Find a Code Bootcamp</h1>
            <p className="lead">
              Find, rate and read reviews on coding bootcamps
            </p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="kms"
                      placeholder="Kilometres From"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      placeholder="Enter Pincode"
                    />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </section>

      <LatestBootcamp />
    </Fragment>
  );
};

export default Landing;

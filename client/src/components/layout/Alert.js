import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alert: { id, msg, alertType } }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((alert) => (
    <div key={id} className={`alert alert-${alertType}`}>
      {msg}
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);

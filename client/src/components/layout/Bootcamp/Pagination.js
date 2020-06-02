import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Pagination = (props) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" to="#">
            Previous
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {};

export default Pagination;

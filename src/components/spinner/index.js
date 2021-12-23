import React from 'react';
import propTypes from "prop-types";
import './styles.css';
import PropTypes from "prop-types";

function Spinner({ active, children }) {

  if (active) {
    return (
      <div className="Spinner">
        {children}
      </div>
    )
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: PropTypes.node,
}

export default React.memo(Spinner);

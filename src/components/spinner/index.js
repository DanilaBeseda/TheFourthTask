import React from 'react';
import propTypes from "prop-types";
import './styles.css';
import PropTypes from "prop-types";

function Spinner({ arrOfWaiting, children }) {

  if (arrOfWaiting.find(active => active === true)) {
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
  arrOfWaiting: propTypes.arrayOf(propTypes.bool).isRequired,
  children: PropTypes.node,
}

export default React.memo(Spinner);

import React from "react";
import propTypes from 'prop-types';
import { cn } from '@bem-react/classname'
import './styles.css';

function Error({ error }) {
  const className = cn('Error');

  return (
    <div className={className()}>
      <div className={className('message')}>{error}</div>
    </div>
  )
}

Error.propTypes = {
  error: propTypes.string
}

Error.defaultProps = {
  error: ''
}

export default React.memo(Error);

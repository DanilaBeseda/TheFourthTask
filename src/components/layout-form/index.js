import React from "react";
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import './styles.css';

function LayoutForm({ children }) {

  // CSS классы по БЭМ
  const className = cn('LayoutForm');

  return (
    <div className={className()}>
      {React.Children.map(children, (child) => (
        <>
          <div>{child.props.label}</div>
          <div key={child.key} className={className('item')}>{child}</div>
        </>
      ))}
    </div>
  )
}

LayoutForm.propTypes = {
  children: PropTypes.node,
}

LayoutForm.defaultProps = {

}

export default React.memo(LayoutForm);

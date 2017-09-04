import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Progress({
  size,
  type,
  className,
  children,
  value,
  ...other
}) {
  const classnames = classNames(
    'progress',
    {
      [`is-${size}`]: size,
      [`is-${type}`]: type
    },
    className
  );

  return (
    <progress className={classnames} value={value} max="100" {...other}>{children}</progress>
  );
}


Progress.PropTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  value: PropTypes.number.isRequired,
};

export default Progress;

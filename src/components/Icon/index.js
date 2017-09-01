import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Icon({
  size,
  className,
  children,
  ...other
}) {
  const classnames = classNames(
    'icon',
    {
      [`is-${size}`]: size,
    },
    className
  );

  return (
    <span className={classnames} {...other}>
      {children}
    </span>
  );
}

Icon.PropTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Icon;

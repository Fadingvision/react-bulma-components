import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Button({
  size,
  type,
  className,
  component: Component,
  fullWidth,
  loading,
  style,
  children,
  ...other
}) {
  const classnames = classNames(
    'button',
    {
      [`is-${size}`]: size,
      [`is-${type}`]: type,
      'is-loading': loading
    },
    className
  );

  const fullWidthStyle = {
    width: '100%'
  };

  let conditionStyle;
  if (fullWidth) {
    conditionStyle = style ? Object.assign(fullWidthStyle, style) : fullWidthStyle;
  }

  return (
    <Component className={classnames} style={conditionStyle} {...other}>
      {children}
    </Component>
  );
}

Button.defaultProps = {
  loading: false,
  fullWidth: false,
  disabled: false,
  component: 'button'
};

Button.PropTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf([
    'white',
    'light',
    'dark',
    'black',
    'link',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  component: PropTypes.string,
};

export default Button;

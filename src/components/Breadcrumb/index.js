import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Breadcrumb({
  children,
  separator,
  size,
  className
}) {
  const breadClass = classNames('breadcrumb', {
    [`has-${separator}-separator`]: separator,
    [`is-${size}`]: size
  }, className);

  return (
    <nav className={breadClass} aria-label="breadcrumbs">
      <ul>
        {children}
      </ul>
    </nav>
  );
}

Breadcrumb.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  separator: PropTypes.oneOf(['arrow', 'bullet', 'dot', 'succeeds']),
};

Breadcrumb.defaultProps = {
  size: null,
  separator: null,
};

Breadcrumb.Item = function Item(props, className) {
  const itemClass = classNames({
    'is-active': props.active
  }, className);
  return <li className={itemClass}>{props.children}</li>;
};

export default Breadcrumb;

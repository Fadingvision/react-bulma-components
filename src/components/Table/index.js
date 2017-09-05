import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';

function Table({
  className,
  ...other
}) {
  const classnames = classNames(
    'table',
    className
  );

  return (
    <table className={classnames} {...other} />
  );
}

Table.PropTypes = {

};

export default Table;

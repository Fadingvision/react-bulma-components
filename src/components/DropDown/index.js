import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import recompose from 'recompose';

function DropDown({
  isActive,
  className,
  title,
  children
}) {
  const dropDownClass = classNames('dropdown', {
    'is-active': isActive
  }, className);

  return (
    <div className={dropDownClass}>
      <DropDown.Trigger>{title}</DropDown.Trigger>
      {children}
    </div>
  )
}


// DropDown.propTypes = {
//   isActive: PropTypes.bool,
//   disabled: PropTypes.bool,
//   onMenuChanged: PropTypes.func,
//   triggerAction: PropTypes.oneOf(['click', 'hover']),
// }

DropDown.defaultProps = {
  isActive: false,
  disabled: false,
  onMenuChanged: () => {},
  triggerAction: 'hover',
}

DropDown.Trigger = function DropDownTrigger(props) {
  return (
    <div className="dropdown-trigger">
      <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{props.children}</span>
        <span className="icon is-small">
          <i className="fa fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
  )
};

// DropDown.Menu = function DropDownMenu(props) {
//   return (
//     <div className="dropdown-menu" role="menu" onClick={() => props.onClick()}>
//       <div className="dropdown-content">
//         {props.children}
//       </div>
//     </div>
//   )
// }

DropDown.MenuItem = function DropDownMenuItem(props) {
  return (
    <div className="dropdown-item">
      {props.children}
    </div>
  )
}

export default DropDown;

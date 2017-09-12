import React, { Component, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import outsideClick from './outsideClick';

class DropDown extends Component {
  handleClickOutside = evt => {
    this.props.hideMenu(evt);
  }

  render() {
    const {
      className,
      title,
      isActive,
      children,
      triggerAction,
      showMenu,
      hideMenu,
      toggleMenu
    } = this.props;

    const dropDownClass = classNames('dropdown', {
      'is-active': isActive
    }, className);

    const kids = cloneElement(children, {
      onClick: hideMenu
    })

    let dropDown;
    if (triggerAction === 'hover') {
      dropDown = (
        <div className={dropDownClass} onMouseOver={showMenu} onMouseOut={hideMenu}>
          <DropDown.Trigger>{title}</DropDown.Trigger>
          {kids}
        </div>
      )
    } else {
      dropDown = (
        <div className={dropDownClass}>
          <DropDown.Trigger onClick={toggleMenu}>{title}</DropDown.Trigger>
          {kids}
        </div>
      )
    }

    return dropDown;
  }
}


DropDown.propTypes = {
  triggerAction: PropTypes.oneOf(['click', 'hover']),
}

DropDown.defaultProps = {
  triggerAction: 'hover',
}

DropDown.Trigger = function DropDownTrigger({
  children,
  ...other
}) {
  return (
    <div className="dropdown-trigger" {...other}>
      <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{children}</span>
      </button>
    </div>
  )
};

export const Menu = function Menu(props) {
  return (
    <div className="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {props.children}
      </div>
    </div>
  )
}

Menu.Item = function Item(props) {
  return (
    <div  // eslint-disable-line
      className="dropdown-item"
      onClick={() => { props.onClick && props.onClick(props) }} // eslint-disable-line
      disabled={props.disabled}
    >
      {props.children}
    </div>
  )
}

Menu.Divider = function Divider() {
  return (
    <hr className="dropdown-divider" />
  )
}

export default compose(
  withState('isActive', 'setIsActive', false),
  withHandlers({
    showMenu: ({ setIsActive }) => () => setIsActive(true),
    hideMenu: ({ setIsActive }) => () => setIsActive(false),
    toggleMenu: ({ setIsActive }) => () => setIsActive(prevState => !prevState)
  }),
  outsideClick
)(DropDown);


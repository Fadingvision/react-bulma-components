import React, { Component, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import recompose from 'recompose';
import outsideClick from './outsideClick';

class DropDown extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    }
  }

  handleClickOutside = evt => {
    this.hideMenu(evt);
  }

  showMenu = () => {
    this.setState({
      isActive: true
    });
  };

  hideMenu = () => {
    this.setState({
      isActive: false
    });
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  };

  render() {
    const {
      className,
      title,
      children,
      triggerAction
    } = this.props;

    const dropDownClass = classNames('dropdown', {
      'is-active': this.state.isActive
    }, className);

    const kids = cloneElement(children, {
      onClick: this.hideMenu
    })

    let dropDown;
    if (triggerAction === 'hover') {
      dropDown = (
        <div className={dropDownClass} onMouseOver={this.showMenu} onMouseOut={this.hideMenu}>
          <DropDown.Trigger>{title}</DropDown.Trigger>
          {kids}
        </div>
      )
    } else {
      dropDown = (
        <div className={dropDownClass}>
          <DropDown.Trigger onClick={this.toggleMenu}>{title}</DropDown.Trigger>
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

export default outsideClick(DropDown);


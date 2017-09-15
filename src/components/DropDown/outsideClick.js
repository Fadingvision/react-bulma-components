import React from 'react';
import { findDOMNode } from 'react-dom';

const outsideClick = BaseComponent =>
  class extends React.Component {
    static displayName = `OutSideClick${BaseComponent.displayName || BaseComponent.name}`;

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = evt => {
      if (!findDOMNode(this.baseComponentIns).contains(evt.target) &&  // eslint-disable-line
        typeof this.baseComponentIns.handleClickOutside === 'function') {
        this.baseComponentIns.handleClickOutside(evt);
      }
    };

    render() {
      return (
        <BaseComponent
          ref={baseComponentIns => { this.baseComponentIns = baseComponentIns }}
          {...this.props}
        />
      )
    }
  }

export default outsideClick;

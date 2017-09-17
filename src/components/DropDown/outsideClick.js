import React from 'react';
import { findDOMNode } from 'react-dom';
import { toClass } from 'recompose';

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
      const ClassBaseComponent = toClass(BaseComponent);
      return (
        <ClassBaseComponent
          ref={baseComponentIns => { this.baseComponentIns = baseComponentIns }}
          {...this.props}
        />
      )
    }
  }

export default outsideClick;

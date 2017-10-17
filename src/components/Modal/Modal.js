import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import outsideClick from '../DropDown/outsideClick';

const Delete = styled.a`
  position: absolute;
  top: 15px;
  right: 15px;
`;

function Modal({
  children,
  className,
  open,
  overlay,
  overlayClassName,
  overlayStyle,
  close,
  closable,
  onCancel,
  closeByOverlay
}) {
  const classnames = classNames(
    'modal',
    {
      'is-active': open,
    },
    className
  );

  const overlayclass = classNames(
    'modal-background animated fadeIn',
    overlayClassName
  );

  function closeModal() {
    close();
    if (onCancel) onCancel();
  }

  class ModalContent extends Component {
    handleClickOutside = () => {
      closeModal();
    }

    render() {
      return (
        <div
          className="modal-content animated zoomIn"
          style={{
            position: 'relative',
          }}
        >
          {closable && <Delete className="delete" onClick={closeModal} />}
          {children}
        </div>
      )
    }
  }

  const Content = closeByOverlay ? outsideClick(ModalContent) : ModalContent;
  return (
    <div className={classnames}>
      {overlay && <div className={overlayclass} style={overlayStyle} />}
      <Content />
    </div>
  )
}

Modal.PropTypes = {
  open: PropTypes.bool,
  overlay: PropTypes.bool,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.object,
  onCancel: PropTypes.func,
  closeByOverlay: PropTypes.bool,
};

Modal.defaultProps = {
  overlay: true,
  closeByOverlay: true,
  closable: true,
  open: false,
};

export default Modal

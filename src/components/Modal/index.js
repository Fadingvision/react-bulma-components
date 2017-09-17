import React, { Component } from 'react';
import Modal from './ModalContainer';

class ModalContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.open,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.state.open) {
      this.setState({ open: true });
    }
  }

  close = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Modal
        {...this.props}
        close={this.close}
        open={this.state.open}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default ModalContainer;

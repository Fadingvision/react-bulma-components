import React, { Component } from 'react';
import './App.css';

import {
  Button,
  notification,
  LinearProgress,
  Breadcrumb,
  DropDown,
  Menu,
  Modal
} from '../../src';
class App extends Component {
  state = {
    open: false
  };

  openNotification(msg) {
    notification({
      msg,
      type: 'primary',
      closeTimeoutMS: 2000
    })
  }

  render() {
    return <div>
      <Button type="primary" onClick={() => this.openNotification('notification')}>open Notification</Button>
      <LinearProgress value="50" mode="indeterminate" type="primary" />
      <Breadcrumb separator="succeeds">
        <Breadcrumb.Item><a>Documentation</a></Breadcrumb.Item>
        <Breadcrumb.Item><a>Bulma</a></Breadcrumb.Item>
        <Breadcrumb.Item><a>Components</a></Breadcrumb.Item>
        <Breadcrumb.Item active><a>Breadcrumb</a></Breadcrumb.Item>
      </Breadcrumb>

      <DropDown title="hover me!" triggerAction="click">
        <Menu>
          <Menu.Item onClick={() => this.openNotification('enu.Item')}>
            <a target="_blank" rel="noopener noreferrer">1st menu item</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">2nd menu item</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">3d menu item</a>
          </Menu.Item>
        </Menu>
      </DropDown>
      <hr/>
      <Button type="primary" onClick={() => this.setState({open: true})}>open Modal</Button>
      <Modal open={this.state.open}>
        <div className="example-modal">123</div>
      </Modal>
    </div>;
  }
}

export default App;

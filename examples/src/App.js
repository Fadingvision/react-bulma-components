import React, { Component } from 'react';
import './App.css';

import { Button, notification, LinearProgress, Breadcrumb } from '../../src';

class App extends Component {
  componentDidMount() {
  }

  openNotification() {
    notification({
      msg: 'notification',
      type: 'primary',
      closeTimeoutMS: 0
    })
  }

  render() {
    return <div>
      <Button type="primary" onClick={this.openNotification}>open Notification</Button>
      <LinearProgress value="50" mode="indeterminate" type="primary" />
      <Breadcrumb separator="succeeds">
        <Breadcrumb.Item><a>Documentation</a></Breadcrumb.Item>
        <Breadcrumb.Item><a>Bulma</a></Breadcrumb.Item>
        <Breadcrumb.Item><a>Components</a></Breadcrumb.Item>
        <Breadcrumb.Item active><a>Breadcrumb</a></Breadcrumb.Item>
      </Breadcrumb>
    </div>;
  }
}

export default App;

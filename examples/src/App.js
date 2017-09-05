import React, { Component } from 'react';
import './App.css';

import { Button, notification, LinearProgress } from '../../src';

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
    </div>;
  }
}

export default App;

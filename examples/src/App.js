import React, { Component } from 'react';
import './App.css';

import { Button, notification, LinearProgress } from '../../src';

class App extends Component {
  componentDidMount() {
    notification({
      msg: 'type',
      type: 'primary',
      closeTimeoutMS: 0
    })
  }

  render() {
    return <div>
      <Button type="primary">123</Button>
      <LinearProgress value="50" mode="determinate" type="primary" />
    </div>;
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import { Button, notification, Progress } from '../../src';

class App extends Component {
  componentDidMount() {
    notification({
      msg: 'type',
      type: 'primary',
      closeTimeoutMS: 0,
    })
  }

  render() {
    return <div>
      <Button type="primary">123</Button>
      <Progress value="80" type="primary"></Progress>
    </div>;
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import { Button, notification } from '../../src';

class App extends Component {
  componentDidMount() {
    notification({
      msg: 'type',
      type: 'primary',
      closeTimeoutMS: 0,
      animation: false,
    })
  }

  render() {
    return <Button type="primary">123</Button>;
  }
}

export default App;

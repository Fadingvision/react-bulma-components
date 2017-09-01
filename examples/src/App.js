import React, { Component } from 'react';
import './App.css';

import { Button, notification } from '../../src';

class App extends Component {
  componentDidMount() {
    notification('asd')
  }

  render() {
    return <Button type="primary">123</Button>;
  }
}

export default App;

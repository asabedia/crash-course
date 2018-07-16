import React, { Component } from 'react';
import UserControl from './components/user/UserControl';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserControl/>
      </div>
    );
  }
}

export default App;

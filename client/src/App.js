import React, { Component } from 'react';
import UserControl from './components/user/UserControl';
import DashboardControl from './components/dashboard/DashboardControl';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserControl/>
        <br/>
        <DashboardControl/>
      </div>
    );
  }
}

export default App;

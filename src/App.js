import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import PageView from './PageView.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <PageView/>
      </div>
    );
  }
}

export default App;

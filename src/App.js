import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import VizContainer from './components/viz-container/VizContainer';
import Home from './components/home/Home';

import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/viz/:vizKey" component={VizContainer} />
        </div>
      </Router>
    );
  }
}

export default App;

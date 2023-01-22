import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NoMatch extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-logo">404</h1>
          <p>
            You aren't supposed to be here...
          </p>
            <Link to={'/'} >Back Home</Link>
        </header>
      </div>
    );
  }
}

export default NoMatch;

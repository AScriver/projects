import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Banned extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-logo">Banned</h1>
          <p>
            Looks like you've been banned for breaking the rules!
          </p>
          <p>In the future, this page will let you know if its permanent :)! </p>
            <Link to={'/'} >Back Home</Link>
        </header>
      </div>
    );
  }
}

export default Banned;
// this component is sharing CSS with NoMatch
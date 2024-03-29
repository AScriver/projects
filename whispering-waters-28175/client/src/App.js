import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/////
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:make" component={Posts} />
          <Route exact path="/posts/:make/:model" component={Posts} />
          <Route exact path="/posts/:make/:model/:year" component={Posts} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

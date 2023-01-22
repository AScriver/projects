import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavbarFix from './components/NavbarFix';
import AlreadyAuth from "./utils/AlreadyAuth";
import AuthRoute from "./utils/AuthRoute";
import AdminAuth from "./utils/AdminAuth";
import React, { Component } from "react";
import Navbar from './components/Navbar';
import NoMatch from "./pages/NoMatch";
import SignUp from "./pages/SignUp";
import Submit from './pages/Submit';
import Banned from "./pages/Banned";
// import Test from "./pages/Test";
import Admin from './pages/Admin';
import LogIn from "./pages/LogIn";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Item from "./pages/Item";
import "./App.css";

class App extends Component {  
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <NavbarFix />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/submit" component={AuthRoute(Submit)} />
            <Route exact path="/signup" component={AlreadyAuth(SignUp)} />
            <Route exact path="/login" component={AlreadyAuth(LogIn)} />
            <Route exact path="/user/:id" component={AuthRoute(User)} />
            <Route exact path="/item/:id" component={AuthRoute(Item)} />
            <Route exact path="/admin" component={AdminAuth(Admin)} />
            <Route exact path="/banned" component={Banned} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;


////////////////////////////////////////////// N O T E S ///////////////////////////////////////////////////////
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

/*Each router creates a history object, which it uses to keep track of the current location[1] 
and re-render the website whenever that changes. The other components provided by React Router 
rely on having that history object available through React’s context, so they must be rendered 
as descendants of a router component. A React Router component that does not have a router as one 
of its ancestors will fail to work. */

/* A <Route> expects a path prop, which is a string that describes the pathname that the route 
matches — for example, <Route path='/roster'/> should match a pathname that begins with /roster.
When the current location’s pathname is matched by the path, the route will render a React element.
When the path does not match, the route will not render anything.*/

/* 
To collect data from multiple children, or to have two child components communicate with each other, 
you need to declare the shared state in their parent component instead. The parent component can pass 
the state back down to the children by using props; this keeps the child components in sync with each 
other and with the parent component.
*/


// https://www.youtube.com/watch?v=IXVURoGB59E - React JS Front-End + MySQL/MongoDB Login Registration Components Example

// https://www.youtube.com/watch?v=oRL-pttfNSc - React Client Side Authentication

// let Users save posts by id
//
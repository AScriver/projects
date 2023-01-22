import React, { Component } from 'react';
import { Link } from "react-router-dom";

// This does nothing but push the rest of the page content down while having the other 
// navbar fixed to the top of the page! There are better ways of doing this, but I didn't
// have time to mess around with the css.

class NavbarFix extends Component {
    render() {
        return (
            <div className="mb-3">
            <nav className="navbar navbar-expand navbar-light bg-light">
                <Link to="/" className="navbar-brand"> PartOut </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav-pills nav-fill">
                    <li className="nav-item">
                            {/* <Link to="/" className="nav-link">{this.props.user}</Link> */}
                        </li>
                        <li className="nav-item">
                            {/* <Link to="/submit" className="nav-link"> /submit </Link> */}
                        </li>
                        <li className="nav-item">
                            {/* <Link to="/" className="nav-link"> / </Link> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default NavbarFix;


import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class sideBar extends Component {
    render() {
        return (
            <div id="mySidebar" className="sidenav">
                <ul>
                    <Link className="links" to="/">
                        <li>Home</li>
                    </Link>
                    <Link className="links" to="/game">
                        <li>Games</li>
                    </Link>
                    <Link className="links" to="/pictures">
                        <li>Pictures</li>
                    </Link>
                    <Link className="links" to="/Options">
                        <li>Options</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

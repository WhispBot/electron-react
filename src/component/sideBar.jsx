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
                </ul>
            </div>
        );
    }
}

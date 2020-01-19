import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class sideBar extends Component {
    setActive = item => {
        const active = document.querySelector(".active");
        if (active === null) {
            document.getElementById(item.target.id).className = "active";
        } else if (active.id !== item.target.id) {
            document.getElementById(item.target.id).className = "active";
            document.getElementById(active.id).className = "";
        }
    };

    render() {
        return (
            <div id="mySidebar" className="sidenav">
                <ul>
                    <Link
                        className="active"
                        id="1"
                        to="/"
                        onClick={this.setActive}
                    >
                        <li>Home</li>
                    </Link>
                    <Link id="2" to="/todos" onClick={this.setActive}>
                        <li>Todo List</li>
                    </Link>
                    <Link id="3" to="/options" onClick={this.setActive}>
                        <li>Options</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

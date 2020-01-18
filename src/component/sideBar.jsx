import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class sideBar extends Component {
    home() {
        document.getElementById("1").className = "active";
        document.getElementById("2").className = "";
    }
    todos() {
        document.getElementById("1").className = "";
        document.getElementById("2").className = "active";
    }

    render() {
        return (
            <div id="mySidebar" className="sidenav">
                <ul>
                    <Link className="active" id="1" to="/" onClick={this.home}>
                        <li>Home</li>
                    </Link>
                    <Link id="2" to="/todos" onClick={this.todos}>
                        <li>Todo List</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

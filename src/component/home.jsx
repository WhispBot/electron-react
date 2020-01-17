import React, { Component } from "react";
const electron = window.require("electron");

export default class home extends Component {
    render() {
        return (
            <div id="main" className="wrapper-home">
                <h1>Home</h1>
            </div>
        );
    }
}

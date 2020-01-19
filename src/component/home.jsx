import React, { Component } from "react";
const electron = window.require("electron");

const ipcRenderer = electron.ipcRenderer;

export default class home extends Component {
    componentDidMount() {}
    render() {
        return (
            <div id="main" className="wrapper-home">
                <h1>Home</h1>
            </div>
        );
    }
}

import React, { Component } from "react";
const electron = window.require("electron");

const ipcRenderer = electron.ipcRenderer;

export default class home extends Component {
    render() {
        return (
            <div id="main" className="wrapper-options">
                <div id="box-background-color" className="box-options"></div>
                <div id="box-background-color" className="box-options1">
                    <span>Font size</span>
                </div>
                <div id="box-background-color" className="box-options2"></div>
            </div>
        );
    }
}

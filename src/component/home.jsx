import React, { Component } from "react";
const electron = window.require("electron");

const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

export default class home extends Component {
    componentDidMount() {
        const backgroundColor = settings.get("settings.backgroundColor");
        document.body.style.background = backgroundColor;
    }
    render() {
        return (
            <div id="main" className="wrapper-home">
                <h1>Home</h1>
            </div>
        );
    }
}

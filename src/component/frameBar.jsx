import React, { Component } from "react";
const electron = window.require("electron");
const { remote } = electron;

export default class frameBar extends Component {
    quitBtn() {
        remote.getCurrentWindow().close();
    }

    miniMize() {
        remote.getCurrentWindow().minimize();
    }
    maximize() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize();
        } else {
            currentWindow.maximize();
        }
    }

    render() {
        return (
            <div className="frame-bar">
                <div className="logo">
                    <header>
                        <h4>Void</h4>
                    </header>
                </div>
                <ul className="frame-bar-links">
                    <li className="min" onClick={this.miniMize}>
                        <p>&#xE921;</p>
                    </li>
                    <li className="max" onClick={this.maximize}>
                        <p>&#xE922;</p>
                    </li>
                    <li className="quit" onClick={this.quitBtn}>
                        <p>&#xE8BB;</p>
                    </li>
                </ul>
            </div>
        );
    }
}

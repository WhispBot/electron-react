import React, { Component } from "react";
import { Link } from "react-router-dom";

const electron = window.require("electron");
const { remote } = electron;
window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
export default class frameBar extends Component {
    quitBtn() {
        remote.getCurrentWindow().close();
    }

    miniMize() {
        remote.getCurrentWindow().minimize();
    }
    maxiMize() {
        /* const currentWindow = remote.getCurrentWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize();
        } else {
            currentWindow.maximize();
        } */
    }

    // Close the dropdown menu if the user clicks outside of it

    render() {
        return (
            <div className="frame-bar">
                <ul className="menu">
                    <li className="burger" onclick={this.myFunction}>
                        <p>&#xE700;</p>
                    </li>
                    <li className="Home">
                        <Link draggable="false" to="/">
                            <p>HOME</p>
                        </Link>
                    </li>
                    <li className="todos-menu">
                        <Link draggable="false" to="/todos">
                            <p>TODOS</p>
                        </Link>
                    </li>
                    <li className="settings">
                        <Link draggable="false" to="/settings">
                            <p>&#xE713;</p>
                        </Link>
                    </li>
                </ul>

                <ul className="frame-bar-buttons">
                    <li className="min-btn" onClick={this.miniMize}>
                        <p>&#xE921;</p>
                    </li>
                    <li className="max-btn" onClick={this.maxiMize}>
                        <p>&#xE922;</p>
                    </li>
                    <li className="quit-btn" onClick={this.quitBtn}>
                        <p>&#xE8BB;</p>
                    </li>
                </ul>
            </div>
        );
    }
}

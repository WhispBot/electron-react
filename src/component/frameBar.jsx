import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSS, DynamicCSS } from "electron-css";
import { darkTheme, lightTheme } from "../ui/theme";
const { remote, ipcRenderer } = window.require("electron");

const Theme = DynamicCSS();
Theme.use(darkTheme.Theme);
const framebar = CSS({
    color: Theme.mainColor,
    background: Theme.mainBackground
});

const li = CSS({
    color: Theme.mainColor,
    onHover: {
        backgroundColor: Theme.onHover
    }
});

const notInUse = CSS({
    color: Theme.notInUse
});

ipcRenderer.on("light:theme", e => {
    Theme.use(lightTheme.Theme);
});
ipcRenderer.on("dark:theme", e => {
    Theme.use(darkTheme.Theme);
});

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

    openMenu = e => {
        ipcRenderer.send("display-app-menu", {
            x: e.x,
            y: e.y
        });
    };

    render() {
        return (
            <div id="frame-bar" className={framebar}>
                <ul id="menu">
                    <li id="burger" className={li} onClick={this.openMenu}>
                        <p>&#xE700;</p>
                    </li>
                    <li id="Home" className={li}>
                        <Link className={li} draggable="false" to="/">
                            <p>HOME</p>
                        </Link>
                    </li>
                    <li id="todos-menu" className={li}>
                        <Link className={li} draggable="false" to="/todos">
                            <p>TODOS</p>
                        </Link>
                    </li>
                    <li id="settings" className={li}>
                        <Link className={li} draggable="false" to="/settings">
                            <p>&#xE713;</p>
                        </Link>
                    </li>
                </ul>

                <ul className="frame-bar-buttons">
                    <li className="min-btn" onClick={this.miniMize}>
                        <p>&#xE921;</p>
                    </li>
                    <li className="max-btn" onClick={this.maxiMize}>
                        <p className={notInUse}>&#xE922;</p>
                    </li>
                    <li className="quit-btn" onClick={this.quitBtn}>
                        <p>&#xE8BB;</p>
                    </li>
                </ul>
            </div>
        );
    }
}

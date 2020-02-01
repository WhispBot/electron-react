import React, { Component } from "react";
const { remote, ipcRenderer } = window.require("electron");
const { dialog } = remote;
const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

export default class home extends Component {
    componentDidMount() {
        const fontSize = settings.get("settings.font_size");
        document.querySelector(".change-font").placeholder = fontSize;
        const backgroundColor = settings.get("settings.backgroundColor");
        document.querySelector(".change-color").value = backgroundColor;
    }

    enterKeyPressed = target => {
        const font_size = document.querySelector(".change-font");
        if (target.charCode === 13) {
            if (font_size.value !== "") {
                ipcRenderer.send("save:font", font_size.value);
            }
        }
    };

    limitNumber = item => {
        if (item.target.value > 2) {
            item.target.value = item.target.value.slice(0, 2);
        }
    };

    openSettings = () => {
        settings.openInEditor();
    };

    changeColor = item => {
        const color = item.target.value;
        ipcRenderer.send("save:color", color);
        document.body.style.background = color;
    };

    openimg = () => {
        let mainWindow = remote.getCurrentWindow();
        dialog
            .showOpenDialog(mainWindow, {
                properties: ["openFile"],
                filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }]
            })
            .then(result => {
                if (!result.canceled) {
                    const data = settings.get("settings");
                    document.querySelector(".img").src = result.filePaths[0];
                    settings.set({
                        settings: { ...data, imgUrl: result.filePaths[0] }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    removeImg = () => {
        const data = settings.get("settings");
        document.querySelector(".img").src = "";
        settings.set({
            settings: { ...data, imgUrl: "" }
        });
    };

    render() {
        return (
            <div id="main" className="wrapper-options">
                <div id="box-background-color" className="box-options">
                    <div className="inner-box">
                        <section>
                            <span>Font size in textbox</span>
                            <input
                                maxLength="3"
                                className="change-font"
                                onKeyPressCapture={this.enterKeyPressed}
                                onChange={this.limitNumber}
                                type="number"
                            />
                        </section>
                        <section>
                            <span>Background color</span>
                            <input
                                type="color"
                                className="change-color"
                                onChange={this.changeColor}
                            />
                        </section>
                        <section>
                            <span>Change background image</span>
                            <button onClick={this.openimg}>Change</button>
                            <button onClick={this.removeImg}>Remove</button>
                        </section>
                    </div>
                    <button className="openFile" onClick={this.openSettings}>
                        Open settings file in editor
                    </button>
                </div>
            </div>
        );
    }
}

import React, { Component } from "react";
const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

export default class image extends Component {
    componentDidMount() {
        document.querySelector(".img").src = settings.get("settings.imgUrl");
    }
    render() {
        return (
            <div>
                <img src="" className="img" alt="" />
            </div>
        );
    }
}

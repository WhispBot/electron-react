import React, { Component } from "react";

import gamelist from "../gamesList.json";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default class game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentDidMount() {
        gamelist.game.forEach(element => {
            this.setState({
                games: gamelist.game
            });
        });
    }

    startGame = e => {
        ipcRenderer.send("test", "grim dawn");
    };

    getGameList = items =>
        items.map((item, i) => (
            <div className="box-game" key={item.appid}>
                <span>{item.name}</span>
            </div>
        ));

    render() {
        return (
            <div id="main" className="wrapper">
                {this.getGameList(this.state.games)}
            </div>
        );
    }
}

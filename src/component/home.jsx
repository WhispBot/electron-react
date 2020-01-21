import React, { Component } from "react";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

export default class home extends Component {
    customSort(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        ipcRenderer.send("get-old-todos");
        ipcRenderer.on("old-todos", (e, data) => {
            data.sort(this.customSort);
            this.setState({
                todos: data
            });
        });
    }

    componentDidMount() {
        const backgroundColor = settings.get("settings.backgroundColor");
        document.body.style.background = backgroundColor;
    }

    getList = items =>
        items.map((item, i) => (
            <li
                id={`${item.key}`}
                key={`${item.key}`}
                onDoubleClick={this.removeItem}
                onClick={this.setActive}
            >
                {item.name}

                <span className="date">{item.date}</span>
            </li>
        ));

    changeSize = () => {
        const div = document.querySelector(".draggable");
        div.style.width = "400px";
        div.style.height = "200px";
    };

    render() {
        return (
            <div id="main" className="wrapper-home">
                <div onDoubleClick={this.changeSize} className="todos">
                    <h4>Old todos</h4>
                    <ul>{this.getList(this.state.todos)}</ul>
                </div>
                <div className="completed">
                    <h4>Completed</h4>
                </div>
            </div>
        );
    }
}

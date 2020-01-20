import React, { Component } from "react";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        ipcRenderer.send("get-old-todos");
        ipcRenderer.on("old-todos", (e, data) => {
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

    mouseDown = e => {
        const el = document.querySelector(".box-1");

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
        let prevX = e.clientX;
        let prevY = e.clientY;
        function mouseMove(e) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = el.getBoundingClientRect();

            el.style.left = rect.left - newX + "px";
            el.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function mouseUp() {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
        }
    };

    render() {
        return (
            <div id="main" className="wrapper-home">
                <div onMouseDown={this.mouseDown} className="box-1">
                    <h4>Old todos</h4>
                    <ul>{this.getList(this.state.todos)}</ul>
                </div>
            </div>
        );
    }
}

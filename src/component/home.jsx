import React, { Component } from "react";
const Store = window.require("electron-store");
const completed = new Store({ name: "completed" });
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
            todos: [],
            completed: []
        };
    }

    componentDidMount() {
        const item = completed.get("completed");
        if (item !== undefined) {
            this.setState({
                completed: item
            });
        } else {
            completed.set({ completed: [] });
        }
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

    render() {
        return (
            <div id="main" className="wrapper-home">
                <div onDoubleClick={this.changeSize} className="todos">
                    <h4>Old todos</h4>
                    <ul>{this.getList(this.state.todos)}</ul>
                </div>
                <div className="completed">
                    <h4>Completed</h4>

                    <ul>{this.getList(this.state.completed)}</ul>
                </div>
            </div>
        );
    }
}

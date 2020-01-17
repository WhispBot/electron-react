import React, { Component } from "react";

const { ipcRenderer } = window.require("electron");

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            non_completed: [],
            completed: []
        };
    }

    componentDidMount() {
        ipcRenderer.send("get-todos");
        ipcRenderer.on("data", (e, data) => {
            this.setState({
                non_completed: data.non_completed,
                completed: []
            });
        });
    }

    addtodo = () => {
        const input_item = document.querySelector(".input-item");
        if (input_item.value !== "") {
            ipcRenderer.send("add-todo", input_item.value);
        }
        input_item.value = "";
        ipcRenderer.send("get-todos");
        ipcRenderer.on("data", (e, data) => {
            this.setState({
                non_completed: data.non_completed,
                completed: []
            });
        });
    };

    getList = items =>
        items.map((item, i) => (
            <li key={`${item.name}`} className="todo">
                {item.name}
            </li>
        ));

    render() {
        return (
            <div id="main" className="wrapper-todos">
                <div className="box-1">
                    <section>
                        <input
                            type="text"
                            className="input-item"
                            placeholder="Add someting to do!"
                        />
                        <button onClick={this.addtodo}>Add</button>
                    </section>
                    <ul>{this.getList(this.state.non_completed)}</ul>
                </div>
                <div className="box-2">
                    <h4>Completed</h4>
                    <ul></ul>
                </div>
            </div>
        );
    }
}

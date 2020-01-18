import React, { Component } from "react";
const { ipcRenderer } = window.require("electron");

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }
    componentWillMount() {
        ipcRenderer.send("get-todos");
        ipcRenderer.on("data", (e, data) => {
            this.setState({
                todos: data
            });
        });
    }

    removeItem = item => {
        ipcRenderer.send("remove-todo", item.target.id);
        document.querySelector(
            ".not-saved"
        ).innerHTML = `${item.target.innerHTML} was removed!`;
        ipcRenderer.on("removed", (e, item) => {
            document.querySelector(".text").value = "";
            document.querySelector(".text").style.pointerEvents = "none";
        });
    };

    addtodo = () => {
        const input_item = document.querySelector(".input-item");
        if (input_item.value !== "") {
            ipcRenderer.send("add-todo", input_item.value);
        }
        input_item.value = "";
        ipcRenderer.send("get-todos");
        ipcRenderer.on("data", (e, data) => {
            this.setState({
                todos: data
            });
        });
    };

    enterKeyPressed = target => {
        const input_item = document.querySelector(".input-item");
        if (target.charCode === 13) {
            if (input_item.value !== "") {
                ipcRenderer.send("add-todo", input_item.value);
            }
            input_item.value = "";
            ipcRenderer.send("get-todos");
            ipcRenderer.on("data", (e, data) => {
                this.setState({
                    todos: data
                });
            });
        }
    };

    setActive = item => {
        const notSaved = document.querySelector(".not-saved");

        let active = document.querySelector(".active-li");
        console.log();
        if (active === null) {
            document.querySelector(".text").style.pointerEvents = "auto";
            notSaved.style.display = "inline";
            notSaved.innerHTML = `${item.target.innerHTML} is selected!`;
            document.getElementById(item.target.id).className = "active-li";
        } else if (active.id !== item.target.id) {
            document.querySelector(".text").style.pointerEvents = "auto";
            notSaved.style.display = "inline";
            notSaved.innerHTML = `${item.target.innerHTML} is selected!`;
            document.getElementById(item.target.id).className = "active-li";
            document.getElementById(active.id).className = "";
        }
        ipcRenderer.send("add-text", item.target.id);
        ipcRenderer.on("text", (e, data) => {
            document.querySelector(".text").value = data;
        });
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

    save = item => {
        const notSaved = document.querySelector(".not-saved");
        try {
            const id = document.querySelector(".active-li").id;
            let data = document.querySelector(".text").value;
            let list = [data, id];
            ipcRenderer.send("save-text", list);
            notSaved.style.display = "inline";
            notSaved.innerHTML = "Changes saved!";
        } catch (error) {
            notSaved.style.display = "inline";
            notSaved.innerHTML = "Select or add and select a todo!";
        }
    };

    text = () => {
        const notSaved = document.querySelector(".not-saved");

        try {
            const _ = document.querySelector(".active-li").id;
            notSaved.style.display = "inline";
            notSaved.innerHTML = "Not saved!";
        } catch (error) {
            notSaved.style.display = "inline";
            notSaved.innerHTML = "Select or add and select a todo!";
            document.querySelector(".text").value = "";
        }
    };

    render() {
        return (
            <div id="main" className="wrapper-todos">
                <div className="box-1">
                    <section>
                        <input
                            onKeyPressCapture={this.enterKeyPressed}
                            type="text"
                            className="input-item"
                            placeholder="Add someting to do!"
                        />
                        <button className="input-btn" onClick={this.addtodo}>
                            Add
                        </button>
                    </section>
                    <ul>{this.getList(this.state.todos)}</ul>
                </div>
                <div className="box-2">
                    <textarea
                        placeholder="select a todo and enter some text"
                        className="text"
                        onChange={this.text}
                    />
                    <button className="savebtn" onClick={this.save}>
                        save
                    </button>
                    <span className="not-saved"></span>
                </div>
            </div>
        );
    }
}

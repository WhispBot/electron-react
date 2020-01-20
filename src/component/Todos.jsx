import React, { Component } from "react";
const { ipcRenderer } = window.require("electron");
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
        ipcRenderer.send("get-todos");
        ipcRenderer.on("todos", (e, data) => {
            this.setState({
                todos: data
            });
        });
    }
    loadSettings = () => {
        const fontSize = settings.get("Font_size");
        document.querySelector(".text").style.fontSize = `${fontSize}pt`;
    };

    componentDidMount() {}

    removeItem = item => {
        const text = document.querySelector(".text");
        ipcRenderer.send("remove-todo", item.target.id);
        document.querySelector(
            ".not-saved"
        ).innerHTML = `${item.target.innerHTML} was removed!`;
        ipcRenderer.on("removed", (e, item) => {
            text.value = "";
            text.style.pointerEvents = "none";
            text.placeholder = "select a todo and enter some text";
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
        const selected = document.querySelector(".not-saved");
        let active = document.querySelector(".active-li");
        document.querySelector(".savebtn").innerHTML = "Save";

        console.log();
        if (active === null) {
            const text = document.querySelector(".text");
            text.focus();
            text.style.pointerEvents = "auto";
            text.placeholder = "Add some text...";
            selected.style.display = "inline";
            selected.innerHTML = `${item.target.innerHTML} is selected!`;
            document.getElementById(item.target.id).className = "active-li";
        } else if (active.id !== item.target.id) {
            selected.style.display = "inline";
            selected.innerHTML = `${item.target.innerHTML} is selected!`;
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
                <p className="show-me">X</p>
            </li>
        ));

    save = item => {
        const selected = document.querySelector(".not-saved");
        const notSavedbtn = document.querySelector(".savebtn");

        try {
            const active_li = document.querySelector(".active-li");
            let data = document.querySelector(".text").value;
            let list = [data, active_li.id];
            ipcRenderer.send("save-text", list);
            selected.style.display = "inline";
            notSavedbtn.innerHTML = "Saved";
        } catch (error) {
            selected.style.display = "inline";
            selected.innerHTML = "Select or add and select a todo!";
        }
    };

    text = () => {
        const selected = document.querySelector(".savebtn");
        try {
            selected.innerHTML = "Not saved";
        } catch (error) {
            selected.innerHTML = "Select or add and select a todo!";
            document.querySelector(".text").value = "";
        }
    };

    test = () => {};

    render() {
        return (
            <div id="main" className="wrapper-todos">
                <div id="box-background-color" className="box-1">
                    <section>
                        <input
                            maxLength="20"
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
                <div className="draggable"></div>
                <div id="box-background-color" className="box-2">
                    <textarea
                        placeholder="select a todo and enter some text"
                        className="text"
                        onChange={this.text}
                    />
                    <button className="savebtn" onClick={this.save}>
                        Save
                    </button>
                    <span className="not-saved"></span>
                </div>
            </div>
        );
    }
}

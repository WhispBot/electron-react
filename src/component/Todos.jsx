import React, { Component } from "react";
const { ipcRenderer } = window.require("electron");
const Store = window.require("electron-store");
const save = new Store({ name: "save" });
const settings = new Store({
    name: "settings"
});
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        const test = save.get("todos");
        this.setState({
            todos: test
        });
    }

    customSort = (a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    };

    getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    dateFormat = () => {
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        // current hours
        let hours = date_ob.getHours();
        // current minutes
        let minutes = date_ob.getMinutes();
        let format = `${year}-${month}-${date} ${hours}:${minutes}`;
        let minutesWith0 = `${year}-${month}-${date} ${hours}:0${minutes}`;
        let hoursWith0 = `${year}-${month}-${date} 0${hours}:${minutes}`;
        let hourAndmunitssWith0 = `${year}-${month}-${date} 0${hours}:0${minutes}`;
        if (hours < 9 && minutes < 9) {
            return hourAndmunitssWith0;
        }
        if (minutes < 9) {
            return minutesWith0;
        }
        if (hours < 9) {
            return hoursWith0;
        }
        return format;
    };
    loadSettings = () => {
        const fontSize = settings.get("Font_size");
        document.querySelector(".text").style.fontSize = `${fontSize}pt`;
    };

    removeItem = item => {
        const text = document.querySelector(".text");
        this.setState({
            todos: this.state.todos.filter(todo => todo.key !== item.target.id)
        });
        save.set({
            todos: this.state.todos.filter(todo => todo.key !== item.target.id)
        });
        text.value = "";
        text.style.pointerEvents = "none";
        text.placeholder = "select a todo and enter some text";
    };

    addtodo = () => {
        const item = document.querySelector(".input-item");
        if (item.value !== "") {
            let num = this.getRandomInt(10000).toString();
            this.setState({
                todos: [
                    {
                        name: item.value,
                        key: num,
                        date: this.dateFormat(),
                        text: ""
                    },
                    ...this.state.todos
                ]
            });
            save.set({
                todos: [
                    {
                        name: item.value,
                        key: num,
                        date: this.dateFormat(),
                        text: ""
                    },
                    ...this.state.todos
                ]
            });
            item.value = "";
        }
    };

    enterKeyPressed = target => {
        if (target.charCode === 13) {
            this.addtodo();
        }
    };

    setActive = item => {
        const text = document.querySelector(".text");
        let active = document.querySelector(".active-li");
        document.querySelector(".savebtn").innerHTML = "Save";
        console.log();
        if (active === null) {
            text.focus();
            text.style.pointerEvents = "auto";
            text.placeholder = "Add some text...";
            document.getElementById(item.target.id).className = "active-li";
        } else if (active.id !== item.target.id) {
            text.focus();
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

    saveText = item => {
        const notSavedbtn = document.querySelector(".savebtn");
        notSavedbtn.innerHTML = "Saved";
    };

    text = () => {
        const selected = document.querySelector(".savebtn");
        try {
            selected.innerHTML = "Not saved";
        } catch (error) {
            document.querySelector(".text").value = "";
        }
    };

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
                        <button className="add-btn" onClick={this.addtodo}>
                            Add
                        </button>
                    </section>
                    <ul>{this.getList(this.state.todos)}</ul>
                </div>

                <div id="box-background-color" className="box-2">
                    <textarea
                        placeholder="select a todo and enter some text"
                        className="text"
                        onChange={this.text}
                    />
                    <button className="savebtn" onClick={this.save}>
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

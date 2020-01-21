import React, { Component } from "react";
import interact from "interactjs";
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
        // target elements with the "draggable" class
        interact(".draggable")
            .draggable({
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: "parent",
                        endOnly: true
                    })
                ],
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener
            })
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },

                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: "parent"
                    }),

                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 400, height: 200 }
                    })
                ],

                inertia: false
            })
            .on("resizemove", function(event) {
                var target = event.target;
                var x = parseFloat(target.getAttribute("data-x")) || 0;
                var y = parseFloat(target.getAttribute("data-y")) || 0;

                // update the element's style
                target.style.width = event.rect.width + "px";
                target.style.height = event.rect.height + "px";

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    "translate(" + x + "px," + y + "px)";

                target.setAttribute("data-x", x);
                target.setAttribute("data-y", y);
            });

        function dragMoveListener(event) {
            const target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            const x =
                (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y =
                (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform = target.style.transform =
                "translate(" + x + "px, " + y + "px)";

            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
        }

        // this is used later in the resizing and gesture demos
        window.dragMoveListener = dragMoveListener;

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
                {
                    <div onDoubleClick={this.changeSize} className="draggable">
                        <h4>Old todos</h4>
                        <ul>{this.getList(this.state.todos)}</ul>
                    </div>
                }
            </div>
        );
    }
}

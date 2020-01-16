import React, { Component } from "react";
const electron = window.require("electron");
const remote = electron.remote;

export default class home extends Component {
    opendialog = () => {
        remote.dialog
            .showOpenDialog({
                filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }]
            })
            .then(data => {
                console.log(data.filePaths[0]);
                document.body.style.backgroundImage = `url(${data.filePaths[0]})`;
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div id="main" className="wrapper-options">
                <div className="box-1">
                    <h4>Background </h4>
                    <button onClick={this.opendialog}>change image</button>
                </div>
                <div className="box-2">1</div>
                <div className="box-3">1</div>
                <div className="box-4">1</div>
            </div>
        );
    }
}

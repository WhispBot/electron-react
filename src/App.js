import React from "react";
import "./App.css";
import Home from "./component/home";
import Game from "./component/game";
import Pictures from "./component/pictures";
import FrameBar from "./component/frameBar";
import SideBar from "./component/sideBar";
import Options from "./component/options";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <FrameBar />
                <SideBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/game" component={Game} />
                    <Route path="/pictures" component={Pictures} />
                    <Route path="/Options" component={Options} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

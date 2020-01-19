import React from "react";
import "./App.css";
import Home from "./component/home";
import FrameBar from "./component/frameBar";
import SideBar from "./component/sideBar";
import Todos from "./component/Todos";
import Options from "./component/options";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <FrameBar />
                <SideBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/todos" exact component={Todos} />
                    <Route path="/options" exact component={Options} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

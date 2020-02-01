import React from "react";
import "./App.css";
import Home from "../component/home";
import FrameBar from "../component/frameBar";
import Todos from "../component/Todos";
import Settings from "../component/settings";
import Image from "../component/image";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <FrameBar />
                <Image />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/todos" exact component={Todos} />
                    <Route path="/settings" exact component={Settings} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

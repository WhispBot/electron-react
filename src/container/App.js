import React from "react";
import "./App.css";
import FrameBar from "../component/frameBar";
import Image from "../component/image";
import Home from "../component/pages/home";
import Todos from "../component/pages/Todos";
import Settings from "../component/pages/settings";
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

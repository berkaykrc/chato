import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Join from "./components/Join";
import Room from "./components/Room";

function App() {
    let { url } = useRouteMatch();
    return (
        <Router>
            <Switch>
                <Route path={`${url}`}>
                    <Join />
                </Route>
                <Route path='/room/:id'>
                    <Room />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import history from "./components/history";
import { unregister } from './registerServiceWorker';
ReactDOM.render(<App history={history} />, document.getElementById("root"));


unregister();
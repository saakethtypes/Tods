import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import history from "./components/history";
ReactDOM.render(<App history={history} />, document.getElementById("root"));

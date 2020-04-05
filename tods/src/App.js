import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import history from "./components/history";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

//importing the components
import { TodoList } from "./components/TodoList";
import { GlobalProvider } from "./context/GlobalState";
import { AddTodo } from "./components/AddTodo";
import { User } from "./components/User";
import { AuthLogin } from "./components/AuthLogin";
import { AuthLogout } from "./components/AuthLogout";
import { ProtectedRoute } from "./ProtectedRoute";

//App
function App() {
  return (
    //calling a component - <Component/>
    
    <div>
      <Router history={history}>
        <GlobalProvider>
          <ReactNotification />
          <div className  = "SideContainer" >
          <Route exact path="/" component={AuthLogin} />
          </div>
          <div className="container">
            <div>
              <ProtectedRoute exact path="/home" component={AuthLogout} />
            </div>
          </div>
          <div className="container">
            <Switch>
              <ProtectedRoute exact path="/home" component={User} />
            </Switch>
          </div>
          <div className="container">
            <ProtectedRoute exact path="/home" component={TodoList} />
          </div>
          <div className="container">
            <div>
              <ProtectedRoute exact path="/home" component={AddTodo} />
            </div>
          </div>
        </GlobalProvider>
      </Router>
    </div>
  );
}

export default App;

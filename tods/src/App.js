import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./components/history";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

//importing the components
import { GlobalProvider } from "./context/GlobalState";
import { AddTodo } from "./components/AddTodo";
import { User } from "./components/User";
import { AuthLogin } from "./components/AuthLogin";
import { ProtectedRoute } from "./ProtectedRoute";
import { Footer } from "./components/Footer";
import { AuthRegister } from "./components/AuthRegister";
import { SortableTodoList } from "./components/TodoList";

//App
function App() {
  return (
    //calling a component - <Component/>

    <div>
      <Router history={history}>
        <GlobalProvider>
          <ReactNotification />
          <div>
            <Route exact path="/" component={AuthLogin} />
          </div>
          <div>
            <Route exact path="/" component={AuthRegister} />
          </div>
          <div className="home">
            <div>
              <Switch>
                <ProtectedRoute exact path="/home" component={User} />
              </Switch>
            </div>
            <div>
              <ProtectedRoute exact path="/home" component={AddTodo} />
            </div>
            <div>
              <ProtectedRoute exact path="/home" component={SortableTodoList} />
            </div>
            <div>
              <ProtectedRoute exact path="/home" component={Footer} />
            </div>
          </div>
        </GlobalProvider>
      </Router>
    </div>
  );
}

export default App;

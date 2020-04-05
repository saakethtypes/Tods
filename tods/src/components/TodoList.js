import React, { useContext, useEffect } from "react";
import "../App.css";

//importing compenents
//importing context which is data we work with
import { GlobalContext } from "../context/GlobalState";
import { Todo } from "./Todo";

export const TodoList = () => {
  //use Context to get the data in the context

  useEffect(() => {
    getTodos();
    //eslint-disable-next-line
  }, []);

  let { todos, getTodos } = useContext(GlobalContext);
  let unfinished = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === false) {
      unfinished += 1;
    }
  }

  //using {} to get the variable from the Globalcontext named as todos

  //using {todos} in html to get the variable used i.e todos mentioned above
  //using .map() to get one object from the todos array
  //using <Todo/> component to render the single todo object by passing
  // the object as a parameter to the compenent. while doing so we need
  //to mention a key param to tell react each object is unique
  // we say that by giving the todoobject's id as the key.

  return (
    <div>
      <h3>Tods</h3>
      <div className="User">
        <label>{unfinished} Pending</label>
      </div>
      <li class="list-info">
      <div className="Todo">
          {todos.map(todo =>
            todo.star ? <Todo key={todo._id} todo={todo} /> : null
          )}
          {todos
            .sort((a, b) => b.importance - a.importance)
            .map(todo =>
              todo.star ? null : <Todo key={todo._id} todo={todo} />
            )}
        </div>
      </li>

    </div>
  );
};

import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { store } from "react-notifications-component";

export const AddTodo = uid => {
  //create vars and its states by useState
  const [task, setTask] = useState("");

  //add functions from the globalcontext
  const { add_todo } = useContext(GlobalContext);
  //local functions to call the global functions
  const addTodo = e => {
    e.preventDefault();
    //create new object based on the user's input
    const newTodo = {
      id: Math.floor(Math.random() * 10000000),
      task: task,
      content: [],
      status: false,
      star: false,
      importance: 10
    };
    //setup the validations like if the todo is empty dont create object
    if (task.length > 1) {
      //to add the todo we need to give the todo obj to the function as param

      add_todo(newTodo, uid.uid);
      setTask("");
      store.addNotification({
        message: "Adding",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1500
        },
        touch:true,
        slidingExit: {
          duration: 800,
          timingFunction: 'ease-out',
          delay: 0
        }
      });
    } else {
      //clear the input text field after submition
      setTask("");
    }
  };

  //onSubmit pass the function we created to add the todo.
  //data binding is done to get data from the input field say its value is a
  //varible created above so that its value can be used as the var
  //therfore on change of the input field we say that var's value is the
  //input field's value (event.target.value)
  return (
    <div>
      <div className="addTodo">
        <form onSubmit={addTodo}>
          <div className="todoInputs">
            <input
              type="text"
              className="taskinput"
              placeholder="Add"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            <button class="button"><div className="plusbut">+
            </div></button>
          </div>
        </form>
      </div>
    </div>
  );
};

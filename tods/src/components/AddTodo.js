import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTodo = uid => {
  //create vars and its states by useState
  const [task, setTask] = useState("");
  const [content_text, setContent_text] = useState([""]);
  const [star, setStar] = useState(false);

  //add functions from the globalcontext
  const { add_todo } = useContext(GlobalContext);

  //local functions to call the global functions
  const addTodo = e => {
    e.preventDefault();
    //create new object based on the user's input
    const newTodo = {
      id: Math.floor(Math.random() * 10000000),
      task: task,
      content: [
        { id: Math.floor(Math.random() * 10000000), content_text: content_text }
      ],
      status: false,
      star: star,
      importance: importance
    };
    //setup the validations like if the todo is empty dont create object
    if ((task.length > 1) & (content_text.length > 1)) {
      //to add the todo we need to give the todo obj to the function as param
      add_todo(newTodo, uid.uid);
      setTask("");
      setContent_text("");
      setStar(false);
      setImportance(5);
    } else {
      //clear the input text field after submition
      setTask("");
      setContent_text("");
    }
  };
  const starTodo = e => {
    e.preventDefault();
    setStar(true);
  };
  const [importance, setImportance] = useState(5);

  //onSubmit pass the function we created to add the todo.
  //data binding is done to get data from the input field say its value is a
  //varible created above so that its value can be used as the var
  //therfore on change of the input field we say that var's value is the
  //input field's value (event.target.value)
  return (






    <div>
      <h3 className="pretty">Add Todo</h3>
      <form onSubmit={addTodo}>
        <div className="form-control">
          <label htmlFor="task" className="pretty">
            Task
          </label>
          <input
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="content" className="pretty">
            Content <br />
          </label>
          <input
            type="text"
            value={content_text}
            onChange={e => setContent_text(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="task" className="pretty">
            Importance
          </label>
          <input
            type="number"
            value={importance}
            onChange={e => setImportance(e.target.value)}
            placeholder="0"
          />
        </div>
        <button type="button" onClick={starTodo} className="btn">
          Star todo
        </button>
        <button className="btn">Add Todo</button>
      </form>
    </div>
  );
};

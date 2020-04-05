import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export const EditTodo = ({ todo_id }) => {
  const { edit_todo_title } = useContext(GlobalContext);
  const [edittask, setedittask] = useState("");

  const editTodo = e => {
    e.preventDefault();
    edit_todo_title(edittask, todo_id);
    setedittask("");
  };

  return (
    <form onSubmit={editTodo}>
      <div className="form-control">
        <label htmlFor="task" className="pretty">
          Task
        </label>
        <input
          type="text"
          value={edittask}
          onChange={e => setedittask(e.target.value)}
          placeholder="Enter text..."
        />
      </div>
    </form>
  );
};

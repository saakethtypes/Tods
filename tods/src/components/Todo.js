import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Content } from "./Content";
import { AddContent } from "./AddContent";
//import { EditTodo } from "./EditTodo";
import { store } from "react-notifications-component";

//Since we need the todo to render this component we add it to our params
//this <todo/> compenent is passed on with a todo object in the
//todolist component

export const Todo = ({ todo }) => {
  //Get the functions from the global context
  const { delete_todo } = useContext(GlobalContext);
  const { users } = useContext(GlobalContext);
  const uid = users._id;
  //to get the info in todo's attributes we say todo.attributename
  //since while delting a todo we must exactly know what todo it is
  //we need to pass on its id to the delete_todo function as a param.
  const [y, sety] = useState(false);
  const [b, setb] = useState(false);

  const viewComment = () => {
    y ? sety(false) : sety(true);
  };

  const { checked } = useContext(GlobalContext);

  const editToggle = () => {
    b ? setb(false) : setb(true);
  };
  const taskcheck = (tid) => {
    strikeed ? setstrikeed(false) : setstrikeed(true);
    checked(tid);
  };
  let taskname = todo.task;
  taskname = taskname.charAt(0).toUpperCase() + taskname.slice(1);
  const { edit_todo_title } = useContext(GlobalContext);
  const [edittask, setedittask] = useState(todo.task);

  const editTodo = (e) => {
    e.preventDefault();
    edit_todo_title(edittask, todo._id);
    setedittask(edittask);
    setb(false);
    store.addNotification({
      title: "Typo? Lol",
      message: "Editted your todo",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
      },
    });
  };
  const [strikeed, setstrikeed] = useState(todo.status);
  return (
    <div className="todo">
      <div className="todoWrapper">
        <div className="todoLine">
          <div className="strike" onClick={() => taskcheck(todo._id)}>
            <span className={strikeed ? "striked" : "unstriked"}>
              {taskname}
            </span>
          </div>
        </div>
        <div className="todoButtons">
          <div className="deletebut" onClick={() => delete_todo(todo._id, uid)}>
            <span
              class="iconify"
              data-icon="ri:delete-bin-6-fill"
              data-inline="false"
            ></span>
          </div>
          <div className="editTaskbut" onClick={editToggle}>
            <span
              class="iconify"
              data-icon="ri:edit-fill"
              data-inline="false"
            ></span>
          </div>
          <div className="viewCommentsbut" onClick={viewComment}>
            <span
              class="iconify"
              data-icon="ic:round-filter-list"
              data-inline="false"
            ></span>
          </div>
        </div>
      </div>
      {y
        ? todo.content.map((content) => (
            <Content key={content._id} content={content} tid={todo._id} />
          ))
        : null}
      {y ? <AddContent todo_id={todo._id} /> : null}
      {b ? (
        <form onSubmit={editTodo}>
          <div className="EditandAdd">
            <input
              type="text"
              value={edittask}
              className="Editinput"
              onChange={(e) => setedittask(e.target.value)}
            />
            <div className="multiplybut">*</div>
          </div>
        </form>
      ) : null}
    </div>
  );
};

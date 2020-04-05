import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Content } from "./Content";
import { AddContent } from "./AddContent";
import { EditTodo } from "./EditTodo";

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
  const [z, setz] = useState(false);
  const [b, setb] = useState(false);

  const viewComment = () => {
    y ? sety(false) : sety(true);
  };
  const addComment = () => {
    z ? setz(false) : setz(true);
  };

  const { checked, livesort } = useContext(GlobalContext);
  const [importance_edit, setImportance] = useState(todo.importance);

  const editToggle = () => {
    b ? setb(false) : setb(true);
  };

  return (
    <div>
      <li>
          <i class=" fa fa-ellipsis-v"></i>
          <div class="task-checkbox">
              <input type="checkbox" class="list-child" value={todo.status} onClick={() => checked(todo._id)} />
          </div>
          <input
            type="number"
            value={importance_edit}
            onChange={e => setImportance(e.target.value)}
            placeholder="0"
            onClick={() => livesort(todo._id, importance_edit)}
          />
          <div class="task-title">
              <span class="task-title-sp" className={todo.status ? "cross" : "nocross"}>{todo.task}</span>
              <span class="badge bg-important">{todo.importance}</span>
              <div class="pull-right hidden-phone">
                  <button class="btn btn-success btn-xs fa fa-pencil" onClick={addComment}></button>
                  <button class="btn btn-success btn-xs fa fa-pencil" onClick={editToggle}></button>
                  <button class="btn btn-primary btn-xs fa fa-pencil"  onClick={viewComment}></button>
                  <button class="btn btn-danger btn-xs fa fa-trash-o" onClick={() => delete_todo(todo._id, uid)}></button>
              </div>
        {y ? 
        todo.content.map(content => (
              <Content key={content._id} content={content} tid={todo._id} />
            ))
          : null}
        {z ? 
        <AddContent todo_id={todo._id} /> : null}
        {b ? <EditTodo todo_id={todo._id} /> : null}
          </div></li>   
    </div>
  );
};

import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Content } from "./Content";
import { AddContent } from "./AddContent";
//import { EditTodo } from "./EditTodo";
import { store } from "react-notifications-component";
import Emoji from "react-emoji-render";

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
  let staskname = todo.task
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
        duration: 1600,
      },
    });
  };

  const [strikeed, setstrikeed] = useState(todo.status);

  const todoClass = () => {
    if (staskname.includes('-')){
      let tem = taskname.split("-");
      taskname = tem[0].charAt(0).toUpperCase() + tem[0].slice(1);

      switch (tem[0]){
      case 'MILE':
        taskname = '⭐  '+tem[1].charAt(1).toUpperCase() + tem[1].slice(2);
        return 'mile'
      case 'T':
        taskname =  '🕒  '+tem[1].charAt(1).toUpperCase() + tem[1].slice(2);
        return 'today';
      case 'SEC':
        taskname = '📑  '+ tem[1].charAt(1).toUpperCase() + tem[1].slice(2);
          return 'sec';
      default:
            return 'norm';
      }
    }else{
      return "norm"
    }
  }
  const todoClan = () => {
    taskname = taskname.charAt(0).toUpperCase() + taskname.slice(1);
      switch (clan){
      case 'mile':
        return 'mileclas'
      case 'today':
        return 'todayclas';
      case 'sec':
          return 'secclas';
      default:
            return 'norm';
      }
  }
  const [clan, setclan] = useState(todoClass)
  const [clann,setclann] = useState(todoClan)
  todoClass()
  let conexist = false
  if(todo.content.length>0){
     conexist = true
  }
  return (
    <div className={`todo ${clan}`}>
      <div >
      <div className="todoWrapper">
        <div className="todoLine">
          <div className="strike" onClick={() => taskcheck(todo._id)}>
            {strikeed ?<span className="striked" >
            <div className={`${clann}`}>{taskname}</div>
            </span>
            :<span className="unstriked">
              {taskname}
            </span>}
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
          {conexist?
          <span className='dotp'></span>
          :null}
        </div>
      </div>
      {y
        ? todo.content.map((content) => (
            <Content key={content._id} content={content} tid={todo._id} styl={clann} />
          ))
        : null}
      {y ? <AddContent todo_id={todo._id} styl={clann} /> : null}
      {b ? (
        <form onSubmit={editTodo}>
          <div className={`EditandAdd`}>
            <input
              type="text"
              value={edittask}
              className={`Editinput ${clann}`}
              onChange={(e) => setedittask(e.target.value)}
            />
            <div className="multiplybut">*</div>
          </div>
        </form>
      ) : null}
    </div>
    </div>
  );
};

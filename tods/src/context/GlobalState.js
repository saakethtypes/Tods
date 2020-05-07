import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "../auth";
import { store } from "react-notifications-component";

//initial data
const initialState = {
  user_logged: "",
  users: {
    _id: "",
    firstname: "",
    user_sections: [],
    logged: false,
    username: "",
    password: "",
    user_todos: [
    ],
  },
  todos: [],
  error: "",
  loading: true,
  logged_in: false,
  theme: "red"
};

//create context with the initial data
export const GlobalContext = createContext(initialState);

//global provider - to provide all the components the varibles, arrays
// and funtions we write inside this. here the children are the
//components
export const GlobalProvider = ({ children }) => {
  //the functions will be written in app reducer and the parameters
  //for the functions will be given here.
  //for the functions we need to provide the whole data
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions for backend intigration

  async function registerUser(user) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    
      await axios.post("/user/register", user, config);
      // dispatch({
      //   type: "REGISTER_USER",
      //   uid: uid,
      //   todo: res.data.data,
      //   tid: res.data.data._id,
      // });
      
      store.addNotification({
        title: "Let's achieve great things together",
        message: `I'll help you manage your work, ${user.firstname}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }
  
  async function persist(props) {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      const res = await axios.post("/todos/verify",{"token":String(token)},config)
      let verified = res.data.veri
        if(!verified){
          localStorage.removeItem("jwt")
        }else{
          auth.login(() => {
          props.history.push("/home");
      });
        }
      }
  }

  async function loginUser(uname, pass, props) {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    let usercred = { username: uname, password: pass };
    try {
      const res = await axios.post("/user/login", usercred, config);
      localStorage.setItem("jwt", res.data.token);

      if (res.data.logged) {
        console.log("User logged");
        dispatch({
          type: "LOGIN_USER",
          logged: res.data.logged,
          fn:res.data
        });
        auth.login(() => {
          props.history.push("/home");
        });
        console.log("asdas",res.data.fn)
        store.addNotification({
          title: "Jillybean has missed you :3",
          message: "Have you had a nice day yet?",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },

        });
      } else {
        store.addNotification({
          title: "Walnuts are recommended",
          message: res.data.msg,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function logout() {
    localStorage.removeItem("jwt");
    console.log("User logged out");
    dispatch({
      type: "LOGOUT",
    });
  }

  async function getTodos() {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      };

      const res = await axios.get("/todos", config);
      dispatch({
        type: "GET_TODOS",
        todos: res.data.todos,
        count: res.data.count,
        users: res.data.user,
      });
    } catch (err) {
      console.log("Error at getTodos");
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function add_todo(todo, uid) {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };

    try {
      const res = await axios.post("/todos/", todo, config);
      dispatch({
        type: "ADD_TODO",
        uid: uid,
        todo: res.data.data,
        tid: res.data.data._id,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  //functions
  async function delete_todo(id, uid) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    try {
      await axios.delete(`/todos/${id}`, config);

      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
      store.addNotification({
        title: "Indeed satisfaction",
        message: "Deleted your todo",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 500,
        },
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function livesort(tid, imp) {
    imp = parseInt(imp);
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    try {
      let impr = {
        imp: imp,
      };
      let res = await axios.patch(`/todos/live/${tid}`, impr, config);
      dispatch({
        type: "LIVE_SORT",
        tid: tid,
        imp: res.data.imp,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function add_content(content, todo_id) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt"),
        },
      };
      await axios.post(`/todos/${todo_id}`, content, config);

      dispatch({
        type: "ADD_CONTENT",
        tid: todo_id,
        payload: content,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.datam,
      });
    }
  }

  async function checked(todo_id) {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      };

      let s = "filler";
      const res = await axios.put(`/todos/${todo_id}`, s, config);

      dispatch({
        type: "CHECKED",
        tid: todo_id,
        stat: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function edit_todo_title(editted, tid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt"),
        },
      };
      const edittedTask = {
        task: editted,
      };

      const res = await axios.patch(`todos/${tid}`, edittedTask, config);
      dispatch({
        type: "EDIT_TODO_TITLE",
        title: res.data.data,
        todo_id: tid,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function delete_content(cid, tidd) {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      };
      const res = await axios.delete(`/todos/${tidd}/${cid}`, config);
      dispatch({
        type: "DELETE_CONTENT",
        payload: cid,
        tid: tidd,
        cont: res.data.data.content,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function saveTheme(theme,thm,thmt,tx,l) {
    
    localStorage.setItem("theme",theme);
    localStorage.setItem("thm",thm);
    localStorage.setItem("thmt", thmt);
    localStorage.setItem("textthm", tx);
    localStorage.setItem("line", l);
    console.log("saved")
   }

  async function updateTodoPos(todos) {
    try {
      dispatch({
        type: "UPDATESORT",
        payload: todos,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function saveTodoSort(todos, user) {
    let todosort = [];
    for (let i = 0; i < todos.length; i++) {
      todosort[i] = todos[i]._id;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    await axios.post(`/todos/save`, { data: todosort, user: user }, config);
  }




  //return the ability to provide these functions and data to all the
  //components. Whatever is wrapped in the app.js with the <Provider/>
  //automatically becomes the {childeren} mention here. therfore those
  //children i.e components inside the <Provider/> tag have access to
  //use the globalcontext.
  return (
    <GlobalContext.Provider
      value={{
        //redefining what todos is
        //these funcs and vars are extracted with curly braces to other
        //components
        todos: state.todos,
        users: state.users,
        delete_todo,
        add_todo,
        add_content,
        checked,
        livesort,
        edit_todo_title,
        delete_content,
        getTodos,
        registerUser,
        loginUser,
        logout,
        error: state.error,
        loading: state.loading,
        user_logged: state.user_logged,
        logged_in: state.logged_in,
        theme: state.theme,
        billyage: state.billyage,
        updateTodoPos,
        saveTodoSort,
        persist,
        saveTheme
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

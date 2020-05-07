const appreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        logged_in: action.logged,
        ...state.users,
        firstname : action.fn
      };

    case "LOGOUT":
      return {
        ...state,
        logged_in: false
      };
    case "GET_TODOS":
      return {
        ...state,
        loading: false,
        todos: action.todos,
        count: action.count,
        users: action.users,
        logged_in: true,
        billyage: action.billy
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload
      };
    //case mentioned in the globalstate file
    case "DELETE_TODO":
      return {
        //spread the data given
        ...state,
        //filter the todos except the todo with the id of the id passed in
        //here the id passed in is the payload and the filtering is done
        //by equating all the todo ids with the payload (id) so only one
        //todo wont wont be anymore in the todos list. and todos list
        //is getting returned here.
        users: {
          ...state.users,
          user_todos: [
            ...state.users.user_todos.filter(
              usertodo => action.payload !== usertodo
            )
          ]
        },
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };

    case "ADD_TODO":
      return {
        //spreading all the todos
        ...state,
        //todos is now all the todos and the payload . here the payload
        //is the new todo object which got created in addtodo component
        todos: [action.todo, ...state.todos]
      };
    case "ADD_CONTENT":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.tid
            ? {
                ...todo,
                content: [...todo.content, action.payload]
              }
            : todo
        )
      };

    case "CHECKED":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.tid
            ? {
                ...todo,
                status: action.stat
              }
            : todo
        )
      };

    case "EDIT_TODO_TITLE":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.todo_id ? { ...todo, task: action.title } : todo
        )
      };

    case "DELETE_CONTENT":
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.tid === todo._id
            ? {
                ...todo,
                content: [
                  ...todo.content.filter(
                    contents => action.payload !== contents._id
                  )
                ] //action.cont
              }
            : todo
        )
      };

    case "LIVE_SORT":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.tid ? { ...todo, importance: action.imp } : todo
        )
      };

    case "UPDATESORT":
      return {
        ...state,
        todos: action.payload
      };

    default:
      return state;
  }
};

export default appreducer;

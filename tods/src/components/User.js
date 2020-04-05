import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const User = uid => {
  let { users, todos } = useContext(GlobalContext);

  return (
    <div className="User">
      <h2>Welcome {users.firstname}</h2>
      <div>Total todos - {todos.length}</div>
    </div>
  );
};

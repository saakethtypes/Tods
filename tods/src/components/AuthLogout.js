import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

export const AuthLogout = props => {
  const { logout, todos, saveTodoSort, users } = useContext(GlobalContext);
  const log = e => {
    e.preventDefault();
    console.log("Logged out");
    saveTodoSort(todos, users._id);
    logout();
    auth.logout(() => {
      props.history.push("/");
    });
  };
  return <div onClick={log}>Logout</div>;
};

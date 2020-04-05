import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

export const AuthLogout = props => {
  const { logout } = useContext(GlobalContext);
  const log = e => {
    e.preventDefault();
    logout();
    auth.logout(() => {
      props.history.push("/");
    });
  };
  return (
    <div>
      <button onClick={log}>Logout</button>
    </div>
  );
};

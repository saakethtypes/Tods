import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AuthRegister = () => {
  const [Fn, setFn] = useState("");
  const [Pass, setPass] = useState("");
  const [Username, setUsername] = useState("");

  const { registerUser } = useContext(GlobalContext);

  const register_User = e => {
    e.preventDefault();
    let user = {
      firstname: Fn,
      username: Username,
      password: Pass
    };
    registerUser(user);
    setUsername("");
    setFn("");
    setPass("");
  };
  return (
    <div>
      
      <h3 className="pretty">Register</h3>
      <form onSubmit={register_User}>
        <div className="form-control">
          <label className="pretty">First Name</label>
          <input
            type="text"
            value={Fn}
            onChange={e => setFn(e.target.value)}
            placeholder="Add Firstname"
          />
        </div>
        <div className="form-control">
          <label className="pretty">Username</label>
          <input
            type="text"
            value={Username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Add Username"
          />
        </div>
        <div className="form-control">
          <label className="pretty">Password</label>
          <input
            type="password"
            value={Pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Add Password"
          />
        </div>
        <button className="btn"> Submit </button>
      </form>
    </div>
  );
};

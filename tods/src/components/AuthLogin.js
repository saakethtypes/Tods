import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AuthLogin = (props) => {
  const [userName, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const { loginUser, persist } = useContext(GlobalContext);

  const login = (e) => {
    e.preventDefault();
    loginUser(userName, pass, props);
    setUsername("");
    setPass("");
  };
  persist(props);
  return (
    <div>
      <div className="loginStyle">
        <div>
          <div className="Logo">[ tods ]</div>
          
          <nav>
            <div className="loginInputs">
              <form onSubmit={login}>
                <div id="Username">
                  <input
                    type="text"
                    className="taskinputl"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div id="Pass">
                  <input
                    className="taskinputl"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <button className="button" type="submit">
                  Login
                </button>
                <p>Register on top right</p>
              </form>
              <br></br>
              <h3>A Minimal todo app</h3>
              <p> Made by <a href='https://github.com/saakethtypes'>@saakethtypes</a> </p>

            </div>
          </nav>
          <div className="Artwork">
              Illustration by Meenakshi 
          </div>
        </div>
      </div>
    </div>
  );
};

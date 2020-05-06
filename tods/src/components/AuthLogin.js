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
          <div className="Logo">[ todo ]</div>
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
              </form>
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

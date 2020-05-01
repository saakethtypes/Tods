import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AuthLogin = props => {
  const [userName, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const { loginUser } = useContext(GlobalContext);

  const login = e => {
    e.preventDefault();

    loginUser(userName, pass, props);
    setUsername("");
    setPass("");
  };

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
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div id="Pass">
                  <input
                    className="taskinputl"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                  />
                </div>
                <button class="button" type="submit">
                  Login
                </button>
              </form>
            </div>
          </nav>
          <div className="MobileDisclaimer"> Although you can use this website, it is not designed optimally for small screens.
          A mobile app is coming soon. :/ </div>
        </div>
      </div>
    </div>
  );
};

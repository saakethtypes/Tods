import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {  Route } from "react-router-dom";
import { AuthRegister } from "./AuthRegister";

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

  const [registers, setregisters] = useState(false);
  const register = () => {
    if (registers === false) {
      setregisters(true);
    } else {
      setregisters(false);
    }
  };
  return (
    <div>
      <div >
        <div>
          <img className= "Logo" src={require("../assets/logo.png")} alt="Logo" />
        </div>
        <nav>
          <div>
            <form onSubmit={login}>
              <div id="Username">
                <input
                  type="text"
                  id="Passs"
                  value={userName}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    backgroundImage: `url(${require("../assets/username.png")})`,
                    backgroundPosition: "center",
                    paddingBottom: "10px",
                    paddingTop: "1px",
                    backgroundSize: "10em",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              </div>
              <div id="Pass">
                <input
                  type="password"
                  id="Passs"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  style={{
                    backgroundImage: `url(${require("../assets/password.png")})`,
                    backgroundPosition: "center",
                    paddingBottom: "10px",
                    paddingTop: "1px",
                    backgroundSize: "10em",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              </div>
              <button>Login </button>
            </form>
          </div>
        </nav>
      </div>
      <div>
        <div  className="RegisterButton">
        <button onClick={register}>
          Register
        </button>
        </div>
        {registers ? (
          <div className="RegisterBox">
            <Route exact path="/" component={AuthRegister} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

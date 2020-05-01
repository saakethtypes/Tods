import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { store } from "react-notifications-component";

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
    if (Fn.length > 1 && Pass.length > 3 && Username.length > 3) {
      registerUser(user);
      setregisters(false);
      setUsername("");
      setFn("");
      setPass("");
    } else {
      store.addNotification({
        title: "Shorty",
        message: "Username and Password are way too short",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000
        }
      });
    }
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
      <div className="registerStyle">
        <div className="RegisterButton">
          <div className="registerbutton" onClick={register}>
            Register
          </div>
        </div>
        {registers ? (
          <div className="RegisterBox">
            <div>
              <div>
                <div>
                  <h3>Sign up</h3>
                  <form onSubmit={register_User}>
                    <div id="usernamere">
                      <input
                        value={Username}
                        id="Usernamee"
                        placeholder="Set Username"
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                      ></input>
                    </div>
                    <div id="fnre">
                      <input
                        value={Fn}
                        type="text"
                        id="Usernamee"
                        placeholder="Name"
                        onChange={e => setFn(e.target.value)}
                      ></input>
                    </div>
                    <div id="passre">
                      <input
                        value={Pass}
                        id="Usernamee"
                        placeholder="Set Password"
                        onChange={e => setPass(e.target.value)}
                        type="password"
                      ></input>
                    </div>
                    <button class="button" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

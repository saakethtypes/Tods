import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { AuthLogout } from "../components/AuthLogout";
import { ProtectedRoute } from "../ProtectedRoute";
var numberToWords = require("number-to-words");
export const User = uid => {
  let { users, todos } = useContext(GlobalContext);
  let unfinished = 0;

  todos = todos.filter(function (el) {
    return el != null;
  });

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === false) {
      unfinished += 1;
    }
  }

  let smile = false;
  if (unfinished === 0) {
    smile = true;
  } else {
    smile = false;
  }
  let unfistr = numberToWords.toWords(unfinished);
  unfistr = unfistr.charAt(0).toUpperCase() + unfistr.slice(1);

  let treefinal3 = require(`../assets/treepic1.png`);
  let treefinal4 = require(`../assets/treepic5.png`);

  return (
    <div>
      <div className="Logobar">
        [ todo ]
        <div className="logoutStyle">
          <ProtectedRoute exact path="/home" component={AuthLogout} />
        </div>
      </div>
      <div className="sideBar">
        <h3 className="greet">
          Hi <p className="name"> {users.firstname},</p>
        </h3>
        <h3 className="count">
          You have, <p className="unfinished">{unfistr}</p> unfinished tasks.
        </h3>
        <div className="trees">
          <img className="tree"src={treefinal4} alt="BillyJean" />
          <img className="tree3" src={treefinal3} alt="BillyJean" />

        </div>
        {smile ? (
          <h3 className="chill">
            {" "}
            You can go get <p className="name">pizza</p> now
          </h3>
        ) : null}
      </div> 
    </div>
  );
};

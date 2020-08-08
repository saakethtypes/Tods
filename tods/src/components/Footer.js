import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Footer = () => {
  const { saveTheme } = useContext(GlobalContext);

  const [y, sety] = useState(false);
  const [bd, setBd] = useState(false);
  const [thm, setThm] = useState("");
  const [thmt, setThmt] = useState("");
  const [textthm, setTextthm] = useState("");
  const [line, setLine] = useState("");
  const [theme, setTheme] = useState("#ca7df9");

  function themePick(themecolor, thm, thmt, tx, l) {
    setTheme(themecolor);
    sety(false);
    saveTheme(themecolor, thm, thmt, tx, l);
  }

  function toggleDark(bd) {
    if (bd === false) {
      setTheme(theme);
      setThm("black");
      setThmt("rgb(22, 22, 22)");
      setLine("grey");
      setTextthm("cornsilk");
      setBd(false);
      saveTheme(theme, "black", "rgb(22, 22, 22)", "cornsilk", "grey");
    } else {
      setTheme(theme);
      setThm("cornsilk");
      setThmt("rgb(227, 215, 241)");
      setLine("darkgray");
      setTextthm("dimgrey");
      setBd(true);
      saveTheme(theme, "cornsilk", "rgb(227, 215, 241)", "dimgrey", "darkgray");
    }
  }
const [inf, setinf] = useState(false)
  const viewDots = () => {
    y ? sety(false) : sety(true);
  };
  const viewInfo = () => {
    inf ? setinf(false) : setinf(true);
  };
  const toggleBd = () => {
    bd ? toggleDark(false) : toggleDark(true);
  };
  document.documentElement.style.setProperty(
    "--theme",
    localStorage.getItem("theme")
  );
  document.documentElement.style.setProperty(
    "--thm",
    localStorage.getItem("thm")
  );
  document.documentElement.style.setProperty(
    "--thmt",
    localStorage.getItem("thmt")
  );
  document.documentElement.style.setProperty(
    "--textthm",
    localStorage.getItem("textthm")
  );
  document.documentElement.style.setProperty(
    "--line",
    localStorage.getItem("line")
  );

  if(!localStorage.getItem("line")){
      setThm("black");
      setThmt("rgb(22, 22, 22)");
      setLine("grey");
      setTextthm("cornsilk");
      setBd(false);
    saveTheme(theme, "black", "rgb(22, 22, 22)", "cornsilk", "grey");
  }
  return (
    <div className="footer">
      {inf?<div className='infouse '>
          <p>T- insert your today's task</p>
        <p>SEC- insert your section's name</p>
        <p>MILE- set your milsetone</p>
          </div>:null}
      <div className="handels">
        <span
          onClick={viewDots}
          className="dot"
          style={{ backgroundColor: theme }}
        ></span>
        <button className='quesmark' onClick={viewInfo}>?</button>

        {y ? (
          <div className="dotss">
            <span
              className="dot"
              onClick={(e) => themePick("#FFE74C", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#FFE74C"}}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#61D095", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#61D095" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#FF5964", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#FF5964" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("rgb(79, 253, 216)", thm, thmt,textthm,line)}
              style={{ backgroundColor: "rgb(79, 253, 216)" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#ca7df9", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#ca7df9" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#EA2B1F", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#EA2B1F" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#7209B7", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#7209B7" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#F1FFC4", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#F1FFC4" }}
            ></span>
            <span
              className="dot"
              onClick={(e) => themePick("#3333ff", thm, thmt,textthm,line)}
              style={{ backgroundColor: "#3333ff",paddingLeft:"10px",position:"relative" }}
            ></span>
          </div>
        ) : null}
        <div className="night" onClick={toggleBd}>
          <span
            class="iconify"
            data-icon="eva:moon-fill"
            data-inline="false"
          ></span>
        </div>

        <a href="https://github.com/saakethtypes/tods" target="_blank"
        rel="noopener noreferrer"> 
          <i class="fa fa-flag fa-github fa-2x" aria-hidden="true"></i>
        </a>
        <a href="https://www.instagram.com/saaketh89/" target="_blank"
        rel="noopener noreferrer">
          <i class="fa fa-flag fa-instagram fa-2x" aria-hidden="true"></i>
        </a>
        <a href="https://www.twitch.tv/saaketh56" target="_blank"
        rel="noopener noreferrer">
          <i class="fa fa-flag fa-twitch fa-2x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

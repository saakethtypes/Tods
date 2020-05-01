import React, { useState } from "react";

export const Footer = () => {
  const [y, sety] = useState(false);
  const [bd, setBd] = useState(false);
  const [thm, setThm] = useState("black");
  const [thmt, setThmt] = useState("rgb(22, 22, 22)");
  const [textthm, setTextthm] = useState("cornsilk");
  const [line, setLine] = useState("dimgrey");
  const [theme, setTheme] = useState("#ca7df9");
  function themePick(themecolor, thm, thmt) {
    setTheme(themecolor);
    sety(false);
  }

  function toggleDark(bd) {
    if (bd === false) {
      setTheme(theme);
      setThm("black");
      setThmt("rgb(22, 22, 22)");
      setTextthm("cornsilk");
      setLine("grey");
      setBd(false);
    } else {
      setTheme(theme);
      setThm("cornsilk");
      setThmt("rgb(227, 215, 241)");
      setTextthm("dimgrey");
      setLine("darkgrey");
      setBd(true);
    }
  }

  const viewDots = () => {
    y ? sety(false) : sety(true);
  };
  const toggleBd = () => {
    bd ? toggleDark(false) : toggleDark(true);
  };
  document.documentElement.style.setProperty("--theme", theme);
  document.documentElement.style.setProperty("--thm", thm);
  document.documentElement.style.setProperty("--thmt", thmt);
  document.documentElement.style.setProperty("--textthm", textthm);
  document.documentElement.style.setProperty("--line", line);

  return (
    <div className="footer">
      <div className="handels">
        <span
          onClick={viewDots}
          className="dot"
          style={{ backgroundColor: theme }}
        ></span>

        {y ? (
          <div>
            <span
              className="dot"
              onClick={e => themePick("#FFE74C", thm, thmt)}
              style={{ backgroundColor: "#FFE74C", left: "20%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#61D095", thm, thmt)}
              style={{ backgroundColor: "#61D095", left: "16%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#FF5964", thm, thmt)}
              style={{ backgroundColor: "#FF5964", left: "18%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("rgb(79, 253, 216)", thm, thmt)}
              style={{ backgroundColor: "rgb(79, 253, 216)", left: "6%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#ca7df9", thm, thmt)}
              style={{ backgroundColor: "#ca7df9", left: "8%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#EA2B1F", thm, thmt)}
              style={{ backgroundColor: "#EA2B1F", left: "10%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#7209B7", thm, thmt)}
              style={{ backgroundColor: "#7209B7", left: "12%" }}
            ></span>
            <span
              className="dot"
              onClick={e => themePick("#F1FFC4", thm, thmt)}
              style={{ backgroundColor: "#F1FFC4", left: "14%" }}
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
        
          <a href= "https://github.com/saakethtypes"> 
          <i class="fa fa-flag fa-github fa-2x" aria-hidden="true"></i>
           </a>
           <a href= "https://www.instagram.com/saaketh89/">
        <i class="fa fa-flag fa-instagram fa-2x" aria-hidden="true"></i>
        </a><a href= "https://www.twitch.tv/saaketh56">
        <i class="fa fa-flag fa-twitch fa-2x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

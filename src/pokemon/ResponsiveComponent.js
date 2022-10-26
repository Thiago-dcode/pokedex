import React from "react";
import { useState } from "react";

const ResponsiveComponent = ({ content, element }) => {
  const [spanClass, setspanClass] = useState(`span-res`);
  const [isHide, setIsHide] = useState(true);
  const [divStyle, setDivStyle] = useState({
    display: "none",
  });

  const handleResponsive = (e) => {
    const btnClassName = e.target.className.slice(-7);
    const divClassName =
      e.target.parentElement.nextElementSibling.className.slice(-7);

    if (btnClassName !== divClassName) return;
    if (isHide) {
        setspanClass('span-res-active')
      setDivStyle({
        display: "inline-block",
      });
      setIsHide(false);
      return;
    }
    setspanClass('span-res')
    setDivStyle({
      display: "none",
    });
    setIsHide(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className={`btn-res btn-${content}`}
          onClick={(e) => {
            handleResponsive(e);
          }}
        >
          {content}
        </button>
        <span className={spanClass}></span>
      </div>
      <div className={"div-responsive"  + " div-res-" + content} style={divStyle}>
        {element}
      </div>
    </div>
  );
};

export default ResponsiveComponent;

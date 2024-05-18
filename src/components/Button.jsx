import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className={`rounded border text-xs px-4 ${props.className ? props.className : ""}`}
        onClick={props.onClick ? props.onClick : ""}
        id={props.id ? props.id : ""}
        type={props.type ? props.type : ""}
      >
        {props.children ? props.children : ""}
      </button>
    </>
  );
};

export default Button;

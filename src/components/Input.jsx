import React from "react";

const Input = (props) => {
  return (
    <div className="flex flex-col">
        <label className="text-xs px-1" for={props.id ? props.id : ""}>
            {props.label ? props.label : ""}
        </label>
      <input
        className={`px-4 py-2 rounded border ${props.className ? props.className : ""}`}
        type={props.type ? props.type : ""}
        value={props.value ? props.value : ""}
        onChange={props.onChange ? props.onChange : ""}
        id={props.id ? props.id : ""}
        step={props.step ? props.step : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
      />
    </div>
  );
};

export default Input;

import React from "react";

const Dropdown = (props) => {
  return (
    <div className="flex flex-col w-[200px]">
      <label className="text-xs px-1" htmlFor={props.id ? props.id : ""}>
        {props.label ? props.label : ""}
      </label>
      <select
        className="px-4 py-2 rounded border"
        id={props.id ? props.id : ""}
        value={props.value ? props.value : ""}
        onChange={props.onChange ? props.onChange : ""}
      >
        {props.option && props.option.length ? (
          props.option.map((option) => (
            <option value={option.value}>{option.name}</option>
          ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
};

export default Dropdown;

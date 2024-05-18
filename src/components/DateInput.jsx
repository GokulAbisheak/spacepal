import React from "react";

const DateInput = (props) => {
  return (
    <div className="flex flex-col w-[200px]">
        <label className="text-xs px-1" for={props.id ? props.id : ""}>
            {props.label ? props.label : ""}
        </label>
      <input
        className="px-4 py-2 rounded border"
        type="date"
        value={props.value ? props.value : ""}
        onChange={props.onChange ? props.onChange : ""}
        id={props.id ? props.id : ""}
      />
    </div>
  );
};

export default DateInput;

import React from "react";
import "./Filter.css";
const Filter = (props) => {
  const changeHandler = (e) => {
    props.setOptionValue(e.target.value);
    props.filterHandler(e.target.value);
  };

  return (
    <div className="filter">
      <select
        onChange={changeHandler}
        value={props.optionValue}
        className="selectBox"
      >
        <option value=""> All </option>
        <option value="completed"> completed </option>
        <option value="unCompleted"> uncompleted </option>
      </select>
    </div>
  );
};

export default Filter;

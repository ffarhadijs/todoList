import React, { useEffect } from "react";
import "./TodolistAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

const TodolistAdd = (props) => {
  useEffect(() => {
    inputRef.current.focus();
  }, [props.todos, props.edit]);
  const inputRef = React.useRef();

  const changeHandler = (e) => {
    props.setInputValue(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.addTodo(props.inputValue);
    props.setInputValue("");
  };
  const editHandler = (e) => {
    e.preventDefault();
    props.editTodo(props.inputValue, props.edit.id);
    props.setInputValue("");
    props.setEdit({ id: null, text: "" });
  };
  return (
    <div>
      <form
        onSubmit={props.edit.id ? editHandler : submitHandler}
        className="form"
      >
        <input
          type="text"
          value={props.inputValue}
          onChange={changeHandler}
          placeholder={props.edit.id ? "Edit..." : "Add your new Todo"}
          ref={inputRef}
          className="input"
        />
        <button type="submit" className="button">
          {props.edit.id ? (
            <FontAwesomeIcon icon={faPenToSquare} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </form>
    </div>
  );
};

export default TodolistAdd;

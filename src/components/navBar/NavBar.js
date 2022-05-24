import React from "react";
import "./Navbar.css";
const NavBar = (props) => {
  return (
    <div className="navbar">
      <h1> Todolist App </h1>

      <div className="items">
        {props.todos.length ? <span> All: {props.todos.length} </span> : null}
        {props.todos.filter((t) => t.isCompleted === true).length ? (
          <span>
            Completed:{props.todos.filter((t) => t.isCompleted === true).length}
          </span>
        ) : null}
        {props.todos.filter((t) => t.isCompleted === false).length ? (
          <span>
            Uncompleted:
            {props.todos.filter((t) => t.isCompleted == false).length}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;

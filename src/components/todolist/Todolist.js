import React from "react";
import TodolistAdd from "../todolistAdd/TodolistAdd";
import "./Todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Todolist = (props) => {
  return (
    <div>
      {props.todos.length ? (
        <div>
          {props.todos.map((t) => (
            <div key={t.id} className={`${t.isCompleted?'completed': "uncompleted"}Todo`}>
              <div className="text">
                <span>
                  {t.text}
                </span>
              </div>
              <div className="btns">
                <button onClick={() => props.clickHandler(t.id)}>
                  
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => props.removeHandler(t.id)}>
                  
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button onClick={() => props.editHandler(t)}>
                  
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="desc">Start your day!</h3>
      )}
    </div>
  );
};

export default Todolist;

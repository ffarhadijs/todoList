import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import NavBar from "../navBar/NavBar";
import Todolist from "../todolist/Todolist";
import TodolistAdd from "../todolistAdd/TodolistAdd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../toast/Toast";
import "./TodolistApp.css";

const TodolistApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [optionValue, setOptionValue] = useState("");
  const [edit, setEdit] = useState({ id: null, text: "" });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    filterHandler(optionValue);
  }, [todos, optionValue]);

  const addTodo = (inputValue) => {
    notify("Todo added successfully", "success");
    if (inputValue == "") {
      alert("please import text");
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 10000),
        text: inputValue,
        isCompleted: false,
      };
      axios
        .post("http://localhost:3001/todos", newTodo)
        .then((res) => axios.get("http://localhost:3001/todos"))
        .then((res) => setTodos([...todos, newTodo]));
    }
  };
  const onComplete = (id) => {

    const selectedTodo = todos.findIndex((t) => t.id == id);
    const todo = { ...todos[selectedTodo] };
    todo.isCompleted = !todo.isCompleted;

    const updatedTodos = [...todos];
    updatedTodos[selectedTodo] = todo;
    setTodos(updatedTodos);
  };
  const onRemove = (id) => {
    notify("Todo removed successfully", "error");
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:3001/todos/${id}`)
        .then((res) => axios.get("http://localhost:3001/todos"))
        .then((res) => setTodos(res.data));
    }
  };
  const filterHandler = (filter) => {
    if (filter == "") {
      setFilteredData(todos);
      return;
    }
    if (filter === "completed") {
      const filterTerm = todos.filter((t) => t.isCompleted == true);
      setFilteredData(filterTerm);
      return;
    }
    if (filter === "unCompleted") {
      const filterTerm = todos.filter((t) => t.isCompleted !== true);
      setFilteredData(filterTerm);
      return;
    }
  };
  const onEdit = (t) => {
    setEdit({ id: t.id, text: t.text });
    setInputValue(t.text);
  };
  const editTodo = (inputValue, id) => {
    
    const selectedTodo = todos.findIndex((t) => t.id == id);
    const todo = { ...todos[selectedTodo] };
    todo.text = inputValue;

    // const updatedTodos = [...todos]
    // updatedTodos[selectedTodo] = todo
    // setTodos(updatedTodos)

    axios
      .put(`http://localhost:3001/todos/${id}`, todo)
      .then((res) => axios.get("http://localhost:3001/todos"))
      .then((res) => setTodos(res.data));
  };

  return (
    <div className="todolistApp">
      <NavBar todos={todos} />

      <Filter
        filterHandler={filterHandler}
        optionValue={optionValue}
        setOptionValue={setOptionValue}
      />
      <TodolistAdd
        addTodo={addTodo}
        edit={edit}
        editTodo={editTodo}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setEdit={setEdit}
        todos={todos}
      />
      <Todolist
        todos={filterData}
        clickHandler={onComplete}
        removeHandler={onRemove}
        editHandler={onEdit}
        edit={edit}
      />
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TodolistApp;

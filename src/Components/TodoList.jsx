import Todo from "./Todo";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../Contexts/todosContext";
import { ToastContext } from "../Contexts/Toast";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todosArray, setTodosArray } = useContext(TodosContext);
  const { notify } = useContext(ToastContext);

  const [inputValue, setInputValue] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const notDoneTodos = todosArray.filter((todo) => {
    return !todo.isDone;
  });
  const isDoneTodos = todosArray.filter((todo) => {
    return todo.isDone;
  });

  let todosToBeRendered = todosArray;

  if (displayedTodosType === "notDone") {
    todosToBeRendered = notDoneTodos;
  } else if (displayedTodosType === "isDone") {
    todosToBeRendered = isDoneTodos;
  } else {
    todosToBeRendered = todosArray;
  }
  const todos = todosToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  useEffect(() => {
    // localStorage.setItem("todos", JSON.stringify([...todosArray]));
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodosArray(storedTodos);
  }, []);
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      body: "مهمة جديدة",
      isDone: false,
    };
    setTodosArray([...todosArray, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todosArray, newTodo]));
    setInputValue("");
    // toast alert
    notify("تمت إضافة المهمة بنجاح", "success");
  }
  return (
    <>
      <div
        className="container text-center bg-light py-3 rounded-bottom"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="mb-3">
          <div className="row">
            <div className="col-12 col-md-9 mb-3 mb-md-0">
              <input
                value={inputValue}
                onChange={(event) => {
                  handleInputChange(event);
                }}
                type="text"
                name="todo"
                className="form-control"
                placeholder="عنوان المهمة"
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="col-12 col-md-3">
              <button
                className="btn btn-success w-100"
                type="button"
                id="button-add"
                onClick={() => {
                  handelAddClick();
                }}
                disabled={inputValue.trim() === ""}
              >
                إضافة مهمة
              </button>
            </div>
          </div>
        </div>
        <h1>قائمة مهامي</h1>
        <hr />
        <div>
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="danger-outlined1"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-secondary"
            htmlFor="danger-outlined1"
            value="notDone"
            onClick={() => {
              setDisplayedTodosType("notDone");
            }}
          >
            غير منجز
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="danger-outlined2"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-secondary"
            htmlFor="danger-outlined2"
            value="isDone"
            onClick={() => {
              setDisplayedTodosType("isDone");
            }}
          >
            منجز
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="danger-outlined3"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-secondary"
            htmlFor="danger-outlined3"
            value="all"
            onClick={() => {
              setDisplayedTodosType("all");
            }}
            
          >
            الكل
          </label>
        </div>
        {/* all todos */}
        <div>{todos}</div>
        {/* end all todos */}
      </div>
    </>
  );
}

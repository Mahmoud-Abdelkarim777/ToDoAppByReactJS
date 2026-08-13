import "../App.css";
import { useContext,useState } from "react";
import { TodosContext } from "../Contexts/todosContext";
export default function Todo({ todo }) {
  const [editValue, setEditModeValue] = useState(todo.title);
  const { todosArray, setTodosArray } = useContext(TodosContext);
  function handleDoneClick() {
    const updatedTodos = todosArray.map((todoItem) => {
      if (todoItem.id === todo.id) {
        return { ...todoItem, isDone: !todoItem.isDone };
      }
      return todoItem;
    })
    setTodosArray(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleDeleteClick(){
    const updatedTodos = todosArray.filter((todoItem) => {
      return todoItem.id !== todo.id;
    })
    setTodosArray(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handelEditValue(){
    const updatedTodos = todosArray.map((todoItem) => {
      if (todoItem.id === todo.id){
        return {...todoItem, title: editValue }
      }
      return todoItem;
    })
    setTodosArray(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      {/*Delete Modal */}
      <div className="modal fade" id={`delete-${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>هل تريد حذف هذه المهمة؟</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger w-50" data-bs-dismiss="modal" onClick={() => {
              handleDeleteClick();
            }}>نعم,قم بالحذف</button>
              <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal">إغلاق</button>
            </div>
          </div>
        </div>
      </div>
      {/*Delete Modal */}
      {/*Edit Modal */}
      <div className="modal fade" id={`edit-${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
            <p>تعديل المهمة</p>
            </div>
            <div className="modal-body">
              <input type="text" value={editValue} onChange={(event) => setEditModeValue(event.target.value)} className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-50" data-bs-dismiss="modal" 
              onClick={() => {handelEditValue();}}>نعم,قم بالتعديل</button>
              <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal">إغلاق</button>
            </div>
          </div>
        </div>
      </div>
      {/*Edit Modal */}
      <div className="container mt-3 shadow">
        <div className="row border border-2 border-dark rounded">
          <div className="col-3 p-0 d-flex justify-content-around align-items-center">
            <i data-bs-toggle="modal" data-bs-target={`#delete-${todo.id}`} className="bi bi-trash btn p-0" ></i>
            <i data-bs-toggle="modal" data-bs-target={`#edit-${todo.id}`} className="bi bi-pencil btn p-0"></i> 
            <i
              className={`bi ${todo.isDone ? "bi-check-circle-fill" : "bi-check-circle"} btn p-0`}
              onClick={() => {
                handleDoneClick();
              }}
            ></i>
          </div>
          <div className="col-9 body-task">
            <h4 className="my-2" style={{textDecoration: todo.isDone ? "line-through" : "none"}}>{todo.title}</h4>
            {/* <p>{todo.body}</p> */}
          </div>
        </div> 
      </div>
    </>
  );
}

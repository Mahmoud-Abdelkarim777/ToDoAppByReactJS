import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import TodoList from "./Components/TodoList";
import { useState } from "react";
import { TodosContext } from "./Contexts/todosContext";
import { ToastContext } from "./Contexts/Toast";
// import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
const notify = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};
// const initialTodos = [
//   // {
//   //   id: uuidv4(),
//   //   title: "قراءة كتاب",
//   //   body: "قرائة كتاب عن البرمجة",
//   //   isDone: false,
//   // },
//   // {
//   //   id: uuidv4(),
//   //   title: "ممارسة الرياضة",
//   //   body: "ممارسة الرياضة كل يوم",
//   //   isDone: false,
//   // },
//   // {
//   //   id: uuidv4(),
//   //   title: "الذهاب الى العمل",
//   //   body: "الذهاب الى العمل في الوقت المحدد",
//   //   isDone: false,
//   // },
// ];
function App() {
  const [todosArray, setTodosArray] = useState([]);
  return (
    <>
      <TodosContext.Provider value={{ todosArray, setTodosArray }}>
        <ToastContext.Provider value={{ notify }}>
          <TodoList />
        </ToastContext.Provider>
      </TodosContext.Provider>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;

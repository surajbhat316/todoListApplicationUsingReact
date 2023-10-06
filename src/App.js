import { useState } from "react";
import TodoListComponent from "./components/TodoListComponent/TodoListComponent";


function App() {

  const [todos, setTodos] = useState([]);
  return (
    <div>
      <TodoListComponent todos={todos}
                          setTodos={setTodos}
                          />
    </div>

  );
}

export default App;

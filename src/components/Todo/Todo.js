import "./Todo.css";

export default function Todo(props) {

    const {todos, handleDelete, handleUpdate} = props;
  return (
    <div className="todoContainer">
        {todos.map((todo) => {
            return (
                <div className="todoItem" key={todo.id}>
                    <div className="todoTitle">
                        {todo.title}
                    </div>
                    <div className="btnContainer">
                        <div>
                            <button onClick={() => handleUpdate(todo)} style={{backgroundColor: "yellow", padding: "0.5rem", borderRadius: "0.5rem"}}>Update</button>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(todo.id)} style={{backgroundColor: "red", padding: "0.5rem",borderRadius: "0.5rem", color: "white"}}>Delete</button>
                        </div>
                    </div>
                    
                </div>
            );
        })}
    </div>
  )
}

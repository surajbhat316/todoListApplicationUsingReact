import { useEffect, useRef, useState } from "react"
import Todo from "../Todo/Todo";
import "./TodoListComponent.css";

export default function TodoListComponent(props) {

    const {todos, setTodos} = props;
    const [updatedTodo, setUpdatedTodo] = useState("");
    let todoTitle = useRef();

    useEffect(()=>{
        async function getTodos(){
            let res = await fetch("https://jsonplaceholder.typicode.com/todos");
            let data = await res.json();
            // console.log(data);
            setTodos([...data]);
        }
        getTodos();
    },[setTodos])

    function handleFormSubmit(e){
        e.preventDefault();
        // For Update Scenario
        if(updatedTodo){
            let index = todos.findIndex((todo) => todo.id === updatedTodo.id);
            let todosFromState = [...todos];
            todosFromState[index].title = todoTitle.current.value;
            setTodos([...todosFromState]);

            async function updateTodo(){
                let res = await fetch('https://jsonplaceholder.typicode.com/todos/'+updatedTodo.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: todoTitle.current.value,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                let data = await res.json();
                console.log(data);
            }
            if(updatedTodo.id >=0 && updatedTodo.id <=201 ){
                updateTodo();
            }
            setUpdatedTodo("");
            todoTitle.current.value = "";
            return;
        }


        // For new tdo creation
        setTodos([{title: todoTitle.current.value,
                    id: Date.now(),
                    completed: false}, ...todos])
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: todoTitle.current.value,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
            todoTitle.current.value = "";
    }


    function handleDelete(id){
        let filteredTodos = todos.filter((todo) =>{
            return todo.id !== id;
        })
        setTodos([...filteredTodos]);
        try{
            fetch('https://jsonplaceholder.typicode.com/todos/'+id, {
                method: 'DELETE',
            });
        }
        catch(err){
            console.log(err);
        }
        
    }


    function handleUpdate(currentTodo){
        setUpdatedTodo(currentTodo);
        todoTitle.current.value = currentTodo.title;
    }

  return (
    <div>

        <form className="todoListForm" onSubmit={handleFormSubmit}>
            <div>
                <input ref={todoTitle} type="text" placeholder="Enter a new todo " required />  
            </div>
            <div>
                {!updatedTodo ? <button>Add Todo</button>: <button>Update Todo</button> }
                
            </div>
        </form>
        <Todo todos={todos} handleDelete={handleDelete} handleUpdate={handleUpdate} />
       
    </div>
    
  )
}

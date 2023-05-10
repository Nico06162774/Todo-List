import react, {Fragment, useEffect, useState} from "react";

const ListTodos = () =>{

    //delete todo func
    const deleteTodo = async(id)=>{
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
            // console.log(deleteTodo);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    const [todos,setTodos] = useState([]);
    const getTodos = async()=>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {

            console.error(err.message);
        }
    }
    useEffect(()=>{
        getTodos();
    },[]);
    return <Fragment>

<table class="table table-striped mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo=>(
        <tr key ={todo.todo_id}>
            <td>{todo.description}</td>
            <td><button className="btn btn-success">Edit</button></td>
            <td><button className="btn btn-danger"
             onClick = {() => deleteTodo(todo.todo_id)}>
                    Delete</button></td>
        </tr>
      )
        )}
    </tbody>
  </table>

    </Fragment>
}

export default ListTodos;
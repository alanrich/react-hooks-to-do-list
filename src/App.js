import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  /*************************** State ****************************/
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingText, setEditingText] = useState("");
  // When edit task btn is clicked, the id of that task is sent to todoEditing
  // telling the app which task to convert from text to an editable input
  const [todoEditing, setTodoEditing] = useState(null);

  /*************************** Methods ****************************/
  // Use localStorage
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const savedTasks = JSON.parse(temp);
    if (savedTasks) {
      setTodos(savedTasks);
    }
  }, []);

  // add the user input to state and reset the input
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    };
    // update the To Do List state
    setTodos([...todos].concat(newTodo));
    // reset the form input
    setTodo("");
  }

  // use filter method to delete tasks
  function deleteTodo(someId) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== someId);
    setTodos(updatedTodos);
  }

  // why did we have to iterate the array rather than just directly toggle the item inline
  function toggleCompleted(someId) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === someId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  // assign the edited value to the task with matching id, reset all st
  // except the one the method modifies
  function editTodo(someId) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === someId) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }
  /**************************** JSX ****************************/
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit} className="wrapper">
        {/*the inputs employ identical logic by assigning the value of the event target
        property to a state variable when the user types and then using 2-way data binding
        by assigning the newly created state to the input's own value*/}
        <input
          type="text"
          placeholder="enter a task"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button>add task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/*render the task as text or an input if the user clicks edit btn*/}
            {todo.id === todoEditing ? (
              <div>
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
                <button onClick={() => editTodo(todo.id)}>Submit</button>
              </div>
            ) : (
              <div>{todo.text}</div>
            )}

            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}> Delete </button>
            <input
              type="checkbox"
              onChange={() => toggleCompleted(todo.id)}
              checked={todo.completed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

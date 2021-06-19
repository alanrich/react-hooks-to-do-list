import React, { useState } from 'react';
import './App.css';

function App() {
/*************************** State ****************************/
const [todos, setTodos] = useState([]);
const [todo, setTodo] = useState('');

/*************************** Methods ****************************/

// add the user input to state and reset the input
function handleSubmit(e){
  e.preventDefault();
// build an object out of the user input
  const newTodo = {
    id: new Date().getTime(),
    text: todo,
    completed: false
  }
// update the To Do List state
  setTodos([...todos].concat(newTodo));
// reset the form input
  setTodo('');
}

// use filter method to delete tasks
function deleteTodo(someId) {
  const updatedTodos = [...todos].filter((todo) => todo.id !== someId);
  setTodos(updatedTodos);
}

// so why did we have to iterate the array rather than just directly toggle the item inline
function toggleCompleted(someId) {
  const updatedTodos = [...todos].map((todo) => {if (todo.id === someId) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  setTodos(updatedTodos);
}
/**************************** JSX ****************************/
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <input type="text"
               placeholder='enter a task'
               onChange={(e) => setTodo(e.target.value)}
              /* utilize 2 way data binding */
              value={todo}
        />
        <button>add task</button>
      </form>
      <ul>

        {todos.map((todo) =>
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}> Delete </button>
            <input type='checkbox'
                   onChange={() => toggleCompleted(todo.id)}
            />
          </li>
        )}

      </ul>
    </div>
  );
}

export default App;

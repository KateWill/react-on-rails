import React from 'react';
import Todo from './Todo';

// variable equal an anonymous function
const TodoList =  ({todos, updateTodo, deleteTodo}) => (
  <div>
    {
      todos.map( todo => 
        <Todo 
          key={todo.id}
          // everything that item has as set in app.js
          {...todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      )
    }
  </div>
)

export default TodoList
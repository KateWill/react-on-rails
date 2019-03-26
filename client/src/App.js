import React, { Component } from 'react';
import TodoForm from  './todos/TodoForm';
import TodoList from './todos/TodoList';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

// axios.httpVerb('url')
//promise
// .then(function (response) ){
//   do something
// }
//promise
// .catch( function(error) ){
//   do something
// }
// .finally

class App extends Component {
  state = { todos: [] }

  //before_action before things are rendered to the page
  componentDidMount(){
    //grab our todos from our rails end before we display(render) anything
    axios.get('/api/items')
    .then( res => {
      this.setState({ todos: res.data })
    })
    .catch( err => {
      console.log(err)
    })
  }

  // functions that handle the CRUD actions

  addItem = (name) => {
    // add the item on our rails end
    // update the state on the react end
    axios.post('/api/items', {name})
    .then( res => {
      const{todos} = this.state
        this.setState({ todos: [...todos, res.data] })
    })
    .catch( err => {
      console.log(err)
    })
  }

  updateTodo = (id) => {
    // update the todo on the rails end
    
    axios.put(`/api/items/${id}`)
    .then( res => {
      //update the todo on the react end
      const todos = this.state.todos.map(t => {
        if (t.id === id)
          return res.data;
        return t
      })
      this.setState({ todos })
    })
    .catch( err => {
      console.log(err)
    })
  }

  deleteTodo = (id) => {
    //delete on the rails end
    axios.delete(`/api/items/${id}`)
    // delete on the reaction end
    .then(res => {
      const {todos} = this.state
      this.setState({todos: todos.filter( t => t.id !== id) })
    })
  }

  render() {
    const { todos } = this.state
    return (
      <Container>
        <TodoForm
          addItem={this.addItem}
        />
        <TodoList 
          todos={todos}
          deleteTodo={this.deleteTodo}
          updateTodo={this.updateTodo}
        />
      </Container>
    );
  }
}

export default App;

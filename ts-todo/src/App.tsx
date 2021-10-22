import React, { Component, useState, useRef } from "react";
import "./App.css";
import { Todo } from "./Types/Todo";
import TodoItem from "./Components/TodoItem";



const App =  (MyProps: any) => {
  const todos: Array<Todo> = []
  const inputRef = useRef<HTMLInputElement>(MyProps);
  const [state, setstate] = useState(todos)
  const addItem = (value: any) =>{
    console.log(state)
    if(inputRef.current.value !== '' ){
      var newItem = {
        text: inputRef.current.value,
        key: Date.now().toString()
      }
      setstate(
        state.concat(newItem)
      )
      inputRef.current.value = '';
    console.log(state)
    value.preventDefault();
    }
     

  }
  const deleteitem = (key: any) =>{
    const filterItem = state.filter(function(item){
      return (item.key !== key)
    })
    setstate(
      filterItem
    )
  }
  return (
    <div className="App">
      <div className="header">
        <form onSubmit={addItem}>
          <input ref={inputRef} placeholder="Enter task" />
          <button type="submit">Add</button>
        </form>
      </div>
      <TodoItem item={state} itemDelete={deleteitem} />
    </div>
  );
}

export default App;

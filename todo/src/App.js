import react, {Component} from 'react'
import "./App.css"

import TodoItem from './Components/TodoItem';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:[]
    }
  this.addItem = this.addItem.bind(this)
  this.deleteitem = this.deleteitem.bind(this)
  }
  addItem(value){
    if(this._inputElement.value !== ""){
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      }
      this.setState({
        item: this.state.item.concat(newItem)
      })
      this._inputElement.value = ""
    }

    console.log(this.state.item)
    value.preventDefault();

  }
  deleteitem(key){
    const filterItem = this.state.item.filter(function(item){
      return (item.key !== key)
    })
    this.setState({
      item:filterItem
    })
  }

  render(){
    return (
      <div className="App">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
            ref={(value) => this._inputElement = value}
            placeholder="Enter task" />
            <button type="submit">Add</button>
          </form>
        </div>
        <TodoItem item = {this.state.item}
                  itemDelete = {this.deleteitem}/>
      </div>
    );
  }
  
}

export default App;

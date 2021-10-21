import React, {Component} from "react";
import "./TodoItem.css"

export default class TodoItem extends Component {
    constructor(props){
        super(props)
        this.createTasks = this.createTasks.bind(this)
        this.delete = this.delete.bind(this)
    }
    createTasks(value){
        return <li onClick={() => this.delete(value.key)}
                   key={value.key}>{value.text}</li>
    }
    delete(items){
        this.props.itemDelete(items)
    }
    render(){

        const listItem = this.props.item.map(this.createTasks)
        return(
            <ul className="thelist">
                {listItem}
            </ul>
        )
    }
}
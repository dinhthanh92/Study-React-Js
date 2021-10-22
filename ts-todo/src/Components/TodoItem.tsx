import React, {Component} from "react";
import "./TodoItem.css"

const TodoItem = (props: any) => {
    
    const deletes = (items: any) => {
        props.itemDelete(items)
    }

    const createTasks = (value: any) => {
        return <li onClick={() => deletes(value.key)}
                   key={value.key}>{value.text}</li>
    }
    
    const listItem = props.item.map(createTasks)

    return(
            <ul className="thelist">
                {listItem}
            </ul>
    )  
}
export default TodoItem;
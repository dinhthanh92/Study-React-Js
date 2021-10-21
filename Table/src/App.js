import React, {Component} from 'react';
import { Row, Col, Divider } from 'antd';

import 'antd/dist/antd.css';

import "./App.css"

import Forms from './Components/Forms';
import Tables from './Components/Tables'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[
        {
          key: '3',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '5',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        }
      ]
    }
    this.addData = this.addData.bind(this)
    this.deleteData = this.deleteData.bind(this)
    this.editData = this.editData.bind(this)
  }
  addData(value){ //Add new data
    const count  =  Math.floor(Math.random() * 1000000);
    if(count !== this.state.data.key){
      this.setState({
        data: [ ...this.state.data,
            {
             key: count ,
             name: value.user.name,
             age: value.user.age,
             address: value.user.address,
             tags: value.user.tags,
            }
          ]
       })
    } 
 }

 editData(keys, value){
   
  const {data} = this.state
  const valueData = data.find(item => item.key === keys)
  const index =  data.indexOf(valueData)

    this.setState((state) => {
      const { data } = state
      data[index].name = value.user.name
      data[index].age = value.user.age
      data[index].address = value.user.address
      data[index].tags = value.user.tags
      return data
    })    
 }

 deleteData(keys){ // delete data from key
  const {data} = this.state
      const index =  data.indexOf(data.find(key => key.key === keys))
      data.splice(index, 1);
      this.setState({
        data: [...data]
      })
      console.log(data)
}
  

  render(){  
    return (
      
      <div className="App">
        
        <Forms data={this.addData} /> {/* button add new data */}

        <Tables data={this.state.data}
                editData = {this.editData}  
                deleteData = {this.deleteData}/>{/* Table wiew data */}
        
      </div>
    );
  }
  
}

export default App;

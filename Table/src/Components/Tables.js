import React, {Component, useState} from "react";
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd';

import FormEdit from "./FormEdit";

export default class Tables extends Component{
  constructor(props){
    super(props)
    this.state={
      setVisible: false,
      dataRow:[]
    }
    this.deleteData = this.deleteData.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.editData = this.editData.bind(this)
  }
  editData(key, keyss){
    this.props.editData(key, keyss)
  }
  setVisible(item){
    if(!this.state.setVisible){
      this.setState({
        setVisible :  !this.state.setVisible,
        dataRow: item
      })
    }
    this.setState({
      setVisible :  !this.state.setVisible
    })
    
  }
    
  deleteData(item){
    message.info('Delete S, uccess');
    this.props.deleteData(item)

  }
    render(){
      const texts = 'Are you sure to delete ';
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: 
              
              (text) => <a>{text}</a>,
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Tags',
              key: 'tags',
              dataIndex: 'tags',
              render: tags => (
                <>
                  {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              ),
            },
            {
              title: 'Action',
              dataIndex: 'key',
              key: 'action',
              render: (text, record) => (
                
                <Space size="middle">
                  {/* Update data */}
                  <FormEdit setVisible = {this.state.setVisible} clicksVisible = {this.setVisible} dataRow={this.state.dataRow} editData= {this.editData}>
                    <Button
                          onClick={() => {
                            this.setVisible(record)
                            console.log(record.name)
                          }} 
                      >
                          Update
                      </Button>
                  </FormEdit>
                  
                  {/* Delete Data */}
                  <Popconfirm placement="topLeft" title={texts} onConfirm={()=>this.deleteData(text, record)} okText="Yes" cancelText="No">
                    <Button >Delete</Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ];
        return(
            <Table columns={columns} dataSource={this.props.data} />
        )
    }
}
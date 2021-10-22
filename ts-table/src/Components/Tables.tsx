import React, {Component, useState} from "react";
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd';

import FormEdit from "./FormEdit";

import { Datas } from "../Types/Datas";
const dataRow:Array<Datas> = []
const Tables =  (props: any) =>{
const [row, setRow] = useState(dataRow)
const [Visible, setVisibles] = useState(false)
    
    const editData = (key: any, keyss: any) => {
      props.editData(key, keyss)
    }
    const setVisible = (item: any) => {
      if(!Visible){
        setVisibles(!Visible)
        setRow(item)
      } setVisibles(!Visible)
      
    }
      
    const deleteData = (item: any) => {
      message.info('Delete S, uccess');
      props.deleteData(item)
  
      console.log(item)
    }
      
        const texts = 'Are you sure to delete ';
          const columns = [
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: 
                
                (text: string) => <a>{text}</a>,
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
                render: (tags:any) => (
                  <>
                    {tags.map((tag:any) => {
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
                render: (text: any, record: any) => (
                  
                  <Space size="middle">
                    {/* Update data */}
                    <FormEdit setVisible = {Visible} clicksVisible = {setVisible} dataRow={row} editData= {editData}>
                      <Button
                            onClick={() => {
                              setVisible(record)
                              console.log(record.name)
                            }} 
                        >
                            Update
                        </Button>
                    </FormEdit>
                    
                    {/* Delete Data */}
                    <Popconfirm placement="topLeft" title={texts} onConfirm={()=>deleteData(record)} okText="Yes" cancelText="No">
                      <Button >Delete</Button>
                    </Popconfirm>
                  </Space>
                ),
              },
            ];
          return(
              <Table columns={columns} dataSource={props.data} />
          )
      }
  
  export default Tables;
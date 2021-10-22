import React, { Component, useState } from "react";

import "antd/dist/antd.css";

import "./App.css";

import Forms from "./Components/Forms";
import Tables from "./Components/Tables";
import { Datas } from "./Types/Datas";
const data: Array<Datas> = [
  {
    key: "3",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
];
const App = () => {
  const [state, setstate] = useState(data);
  const addData = (value: any) => {
    //Add new data
    const newArray = [
      {
        key: Date.now().toString(),
        name: value.user.name,
        age: value.user.age,
        address: value.user.address,
        tags: value.user.tags,
      },
    ];
    setstate(state.concat(newArray));
  };

  const editData = (key: any, value: any) => {
    const filter = state.filter((item:any)=>item.key !== key);
    const finds:any = state.find((item:any)=>item.key === key);
    const index = state.indexOf(finds);
    const newArray = [
      ...state.slice(0, index),
      { key: key,  
        name: value.user.name,
        age: value.user.age,
        address: value.user.address,
        tags: value.user.tags
      },
      ...state.slice(index + 1)
    ]
   setstate(newArray)   
   }

   const deleteData = (value: any) => { // delete data from key
        
        const filter = state.filter((item:any)=>item.key !== value.key)
        setstate(filter)
  }

  return (
    <div className="App">
      <Forms data={addData} /> {/* button add new data */}
      <Tables
        data={state}
        editData={editData}
        deleteData={deleteData}
      />
      {/* Table wiew data */}
    </div>
  );
};

export default App;

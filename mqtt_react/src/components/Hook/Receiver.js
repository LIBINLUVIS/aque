import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { useNavigate } from "react-router-dom";
import './Receiver.css';
import axios from 'axios'

const Receiver = ({ payload,exit,mqttDisconnect,mqttUnSub}) => {
  const [messages, setMessages] = useState([])
  const [fine,setFine]=useState(true);
  

  let navigate=useNavigate();
  
  useEffect(() => {
    if (payload.topic) {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  



  const makemessage=()=>{
    setFine(false);
    var username=localStorage.getItem("username");
    var msgapi=`http://127.0.0.1:8000/api/message/${username}/`;
    axios.get(msgapi).then((res)=>{

      console.log("Message Sended!")
      // alert("Message send to the Service Person!")
    })
  }

   const message=messages.map((msg)=>msg.message);
   
   if(message>=150){
    if(fine){
      makemessage();
    }
   }

  const renderListItem = (item) => (
  
    window.setInterval(function() {
      
        var elem = document.getElementById('data');
        elem.scrollTop = elem.scrollHeight;
      
    }, 1000),

    <List.Item>
      <List.Item.Meta
     
        // title={""}
        description={item.message}
      />
    </List.Item>
  
  )


  const backhome=()=>{
    mqttUnSub();
    mqttDisconnect();
    localStorage.removeItem("username");
    localStorage.removeItem("user_token");
    navigate("/");
  }

  return (
    <div className='outer-box'>
      <h1 style={{display:'flex',justifyContent:'center',color:'#ffbb33'}}>Live Monitor</h1>
    <div className="Receiver-data">

      <h>Current PH Value - No Data</h>
      <h>Current TDS Value in PPM</h>

      {!exit?<>
        <Card
      title=""
      className='tds-card'
      id='data'
    >   
        <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
      </>:backhome()}
    </div>
    <div className='other-params'>
    <h>Date and Time : </h>
    <h>Quality : {fine?<>
    <span style={{color:"green"}}>Good For Drinking!</span>
    </>:<>
    <span style={{color:"red"}}>Bad For Drinking!</span>
    </>}</h>
    </div>

    </div>

  );
}

export default Receiver;

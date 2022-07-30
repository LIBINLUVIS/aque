import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Receiver from './Receiver';
import mqtt from 'mqtt'
import {Button} from 'antd'
import './Receiver.css'

function HookMqtt() {

  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [exit,setExit]=useState(false);
  const [connectStatus, setConnectStatus] = useState('Connect');

  let navigate=useNavigate();

    const options={
      
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false,
    clientId:'mqttx_36d01581',
    username:'emqx',
    password:'12345'

  }

  const url='ws://broker.emqx.io:8083/mqtt';

  useEffect(()=>{
    
   mqttConnect();
  },[])



    useEffect(()=>{
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected'); 
        console.log("connected")
      });

      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    
    }
  },[client]);


  const mqttConnect =  () => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(url,options));
  };

  const mqttSub = () => {

    var user=localStorage.getItem("username")
    if(user){
      if (client) {
        const topic=`libin/adishankara/tds/${user}`
        const qos=0
        client.subscribe(topic,{qos} , (error) => {
          if (error) {
            console.log('Subscribe to topics error', error)
            return
          }
          setIsSub(true)
        });
      }
    }
  };

  const mqttDisconnect = () => {

    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttUnSub = () => {
   
    var user=localStorage.getItem("username")
    if (client) {
      const topic=`libin/adishankara/tds/${user}`
      
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false);
      });
      
    }
  };

  const logout=()=>{
        setExit(true);
  }



  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h1>Aque</h1>
      <p>An Smart Way to Monitor Water Quality</p>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}>
      <Button type="primary" onClick={mqttSub}  className='getdatabtn'>Get Data</Button>
      <Button type="primary" onClick={logout}  className='logoutbtn'>Logout</Button>
      </div>
      
     
      <Receiver payload={payload} exit={exit} mqttUnSub={mqttUnSub} mqttDisconnect={mqttDisconnect}/>
    </div>
  )
}

export default HookMqtt;

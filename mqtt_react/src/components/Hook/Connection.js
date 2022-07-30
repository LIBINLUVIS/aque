import React from 'react'

function Connection() {

      // const [client, setClient] = useState(null);
  // const [isSubed, setIsSub] = useState(false);
  // const [payload, setPayload] = useState({});
  // const [connectStatus, setConnectStatus] = useState('Connect');
  
  // const options={
      
  //   keepalive: 30,
  //   protocolId: 'MQTT',
  //   protocolVersion: 4,
  //   clean: true,
  //   reconnectPeriod: 1000,
  //   connectTimeout: 30 * 1000,
  //   will: {
  //     topic: 'WillMsg',
  //     payload: 'Connection Closed abnormally..!',
  //     qos: 0,
  //     retain: false
  //   },
  //   rejectUnauthorized: false,
  //   clientId:'mqttx_36d01581',
  //   username:'emqx',
  //   password:'12345'

  // }

  // const url='ws://broker.emqx.io:8083/mqtt'

  // useEffect(()=>{
  //   console.log("yeyy")
  // //  mqttConnect();
  // },[])

  // useEffect(()=>{
  //   if (client) {
  //     client.on('connect', () => {
  //       setConnectStatus('Connected');
  //       console.log("connected")
  //     });

  //     // client.on('message', (topic, message) => {
  //     //   const payload = { topic, message: message.toString() };
  //     //   setPayload(payload);
  //     // });
    
  //   }
  // },[client])

  // if(client){
  //   console.log("connected")
  // }

  // const mqttConnect =  () => {
  //   setConnectStatus('Connecting');
  //   setClient(mqtt.connect(url,options));
  // };
  return (
    <div>Connection</div>
  )
}

export default Connection
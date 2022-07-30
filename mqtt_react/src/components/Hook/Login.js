import React,{useEffect,useState,useContext} from 'react'
import './Login.css'
import { useHistory,useNavigate } from "react-router-dom";
import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress'


function Login() {

    let navigate=useNavigate();

    const [loading,setLoading] = useState(false);


    const loginUser=(e)=>{
        e.preventDefault();
        setLoading(true)
        let  username=e.target.username.value
        let password=e.target.password.value
  
        const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept':'application/json'
          }
      };
  
        const body=JSON.stringify({username,password})
  
        const loginapi="http://127.0.0.1:8000/api/login/"
  
        axios.post(loginapi,body,config).then((res)=>{
          localStorage.setItem("user_token",res.data.token)
          localStorage.setItem("username",username)
          setLoading(false)
          
            navigate("/home")
        })
      
      }
  
  return (
    <main>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h1>Aque</h1>
      <p>An Smart Way to Monitor Water Quality</p>
      </div>
    <div className="container-login " >
      <div className="app-wrapper">
      <h1 className="title">Sign In</h1>
      <p>Sign into your Account</p>
      <form  className="form-wrapper" onSubmit={loginUser}>
        <div className="form-group">
          <input
            className="input"
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            minLength="3"
            required
          />
        </div>
        <button className="btn" type="submit" >
            Login
          {/* {loading?<CircularProgress size="1.5rem" />:<>Login</>} */}
        </button>
      </form>
      </div>
    </div>
    </main>
   
  )
}

export default Login
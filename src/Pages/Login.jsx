import React, { useState } from 'react'
import axios from 'axios';
import './CSS/LoginSignup.css'
import {Link} from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [_,setCookies]=useCookies("access_token");
  const navigate = useNavigate();
const onSubmit= async(event)=>{

  try
  {
    const response = await axios.post("http://localhost:3002/auth/login",{
      username,password
    });
    alert(response.data.message);
    setCookies("access_token",response.data.token);
    window.localStorage.setItem("userID",response.data.userID);
    window.localStorage.setItem("name",response.data.name);
    if(response.data.loggedStatus){
        navigate('/')
    }
  }
  catch(err){
      console.error(err)
  }

}

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>LogIn</h1>
          <div className="loginsignup-fields">
            <input type="text"placeholder='Your Name'onChange={(event)=>{setUsername(event.target.value)}} />
            <input type="password"placeholder='Password'onChange={(event)=>{setPassword(event.target.value)}} />
          </div>
          <button onClick={onSubmit}>Continue</button>
          <p className="loginsignup-login">If don't have an account? <Link to='/signup'>Create Acount</Link></p>

        </div>
    </div>
  )
}

export default Login
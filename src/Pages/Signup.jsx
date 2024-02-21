import React, { useState } from 'react'
import axios from 'axios';
import './CSS/LoginSignup.css'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
const onSubmit= async(event)=>{

  try
  {
    const response = await axios.post("http://localhost:3002/auth/register",{
      username,email,password
    });
    alert(response.data.message);
    if(response.data.signedStatus){
      navigate('/login')
    }
    
  }
  catch(err){
      console.error(err)
  }

}

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text"placeholder='Your Name'onChange={(event)=>{setUsername(event.target.value)}} />
            <input type="email"placeholder='Email Address'onChange={(event)=>{setEmail(event.target.value)}} />
            <input type="password"placeholder='Password'onChange={(event)=>{setPassword(event.target.value)}} />
          </div>
          <button onClick={onSubmit}>Continue</button>
          <p className="loginsignup-login">Already have an account? <Link to='/login'>Login here</Link></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
    </div>
  )
}

export default Signup
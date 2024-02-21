import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { ShopContext } from '../../Context/ShopContext'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const {getTotalCartItems} = useContext(ShopContext)
    const [menu,setMenu] = useState("shop");
    const [cookies,setCookies] = useCookies ("access_token");
    const navigate = useNavigate('/');


        const logout =()=>{
        setCookies("access_token","")
        window.localStorage.clear();
        navigate('/login')
       }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:"none"}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{textDecoration:"none"}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{textDecoration:"none"}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{textDecoration:"none"}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        {!window.localStorage.getItem('userID')?<Link to='/login' onClick={()=>{setMenu("")}} style={{textDecoration:"none"} }><button>Login</button></Link>
        :<button style={{background:"red",borderRadius:"5px",fontSize:"20px",fontWeight:"600",padding:"4px 10px",marginLeft:"10px" ,cursor:"pointer",outline:"none",border:"none",color:"white"}} onClick={logout}>Logout</button>} 


        {window.localStorage.getItem('userID')?
             <><Link to='/cart' onClick={()=>{setMenu("")}} style={{textDecoration:"none"}}><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div> <i style={{fontSize:"20px",fontWeight:'600'}}>{window.localStorage.getItem("name")}</i> </>
        :<></>} 



        </div>
    </div>
  )
}

export default Navbar
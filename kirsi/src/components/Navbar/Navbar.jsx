import React, { useState } from "react"
import './Navbar.css'
import { useNavigate } from "react-router-dom"
import {assets} from '../../assets/assets.js'




const Navbar = () => {
  const [menu, setMenu] = useState("home")  
  const navigate = useNavigate()
  const handleNav = (name, path) => {
    setMenu(name)
    navigate(path)
  }


  return (
    <div className = 'navbar'>
      <img src={assets.logo} alt="kirsi" className="navbar-logo"/>
        <ul className="navbar-menu">
            <li onClick={() => handleNav("home", "/")} className={menu === "home" ? "active" : ""}>Home</li>
            <li onClick={() => handleNav("About us", "/about")} className={menu === "About us" ? "active" : ""}>About us</li>
            <li onClick={() => handleNav("tools", "/tools")} className={menu === "tools" ? "active" : ""}>Tools</li>
            <li onClick={() => handleNav("Crop", "/crops")} className={menu === "Crop" ? "active" : ""}>Crop</li>
            <li onClick={() => handleNav("Animal", "/animal")} className={menu === "Animal" ? "active" : ""}>Animal</li>
        </ul>
     <div className = "navbar-right">
        {/* <img src={} alt ="" /> */}
        <button className="login-btn" onClick={ () => handleNav("Login", "/login")}> login / signup</button>
        </div>   
    </div>
  )

}

export default Navbar
import React, { useState } from "react"
import './Navbar.css'
import {assets} from '../../assets/assets.js'




const Navbar = () => {
  const [menu, setMenu] = useState("home")

  return (
    <div className = 'navbar'>
      <img src={assets.logo} alt="kirsi" className="navbar-logo"/>
        <ul className="navbar-menu">
            <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
            <li onClick={() => setMenu("About us")} className={menu === "About us" ? "active" : ""}>About us</li>
            <li onClick={() => setMenu("tools")} className={menu === "tools" ? "active" : ""}>Tools</li>
            <li onClick={() => setMenu("Crop")} className={menu === "Crop" ? "active" : ""}>Crop</li>
            <li onClick={() => setMenu("Animal")} className={menu === "Animal" ? "active" : ""}>Animal</li>

        </ul>
     <div className = "navbar-right">
        {/* <img src={} alt ="" /> */}
        <button > login / signup</button>
        </div>   
    </div>
  )

}

export default Navbar
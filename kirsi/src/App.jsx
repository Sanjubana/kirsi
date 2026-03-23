import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tools from './Pages/Tools/Tools'
import Login from './Pages/Login/login'
import Signup from './Pages/Signup/Signup'
import Crops from './Pages/Crops/Crops'
import Animal from './Pages/Animal/Animal'
import Aboutus from './Pages/Aboutus/Aboutus'
import Selltools from './components/Selltools/Selltools'
import BuyTools from './components/Buytools/Buytools'
import RentalTools from './components/Rentaltools/Rentaltools'
import MechanicServices from './components/Mechanic/Mechanic'
import RegisterM from './components/Mechanic/Register/RegisterM'
import ExpertsList from './components/Experts/Experts'
import Cropshops from './components/Cropshops/Cropshops'
import Cropadvisory from './components/Cropadvisory/Cropadvisory'


const App = () => {


  return (
    
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/tools' element={<Tools/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/Buytools' element={<BuyTools/>}/>
          <Route path='/Selltools' element={<Selltools/>}/>
          <Route path='/Mechanic' element={<MechanicServices/>}/>
          <Route path='/register-mechanic' element={<RegisterM/>}/>
          <Route path='/crops' element={<Crops/>}/>
          <Route path='/experts' element={<ExpertsList/>}/>
          <Route path ='/cropshops' element={<Cropshops/>}/>
          <Route path='/cropadvisory' element={<Cropadvisory/>}/>
          <Route path='/Renttools' element={<RentalTools/>}/>
          <Route path='/animal' element={<Animal/>}/>
        </Routes>
        </div>
       
  )
}

export default App

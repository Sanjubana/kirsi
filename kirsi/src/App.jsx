import { useState } from 'react'
import Navbar from './components/Navbar/NAvbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tools from './Pages/Tools/Tools'
import Crops from './Pages/Crops/Crops'
import Animal from './Pages/Animal/Animal'
import Aboutus from './Pages/Aboutus/Aboutus'
import Selltools from './components/Selltools/Selltools'
import MechanicServices from './components/Mechanic/Mechanic'
import RegisterM from './components/Mechanic/Register/RegisterM'
import ExpertsList from './components/Experts/Experts'
import Cropshops from './components/Cropshops/Cropshops'


const App = () => {


  return (
    
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/tools' element={<Tools/>}/>
          <Route path='/Selltools' element={<Selltools/>}/>
          <Route path='/Mechanic' element={<MechanicServices/>}/>
          <Route path='/register-mechanic' element={<RegisterM/>}/>
          <Route path='/crops' element={<Crops/>}/>
          <Route path='/experts' element={<ExpertsList/>}/>
          <Route path ='/cropshops' element={<Cropshops/>}/>

          <Route path='/animal' element={<Animal/>}/>
        </Routes>
        </div>
       
  )
}

export default App

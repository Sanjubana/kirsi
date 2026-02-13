import { useState } from 'react'
import Navbar from './components/Navbar/NAvbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tools from './Pages/Tools/Tools'
import Crops from './Pages/Crops/Crops'
import Animal from './Pages/Animal/Animal'
import Aboutus from './Pages/Aboutus/Aboutus'

const App = () => {


  return (
    
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/tools' element={<Tools/>}/>
          <Route path='/crops' element={<Crops/>}/>
          <Route path='/animal' element={<Animal/>}/>
        </Routes>
        </div>
       
  )
}

export default App

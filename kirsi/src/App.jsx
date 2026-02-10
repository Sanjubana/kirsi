import { useState } from 'react'
import Navbar from './components/Navbar/NAvbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tools from './Pages/Tools/Tools'
import Animal from './Pages/Animal/Animal'

const App = () => {


  return (
    
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tools' element={<Tools/>}/>
          <Route path='/animal' element={<Animal/>}/>
        </Routes>
        </div>
       
  )
}

export default App

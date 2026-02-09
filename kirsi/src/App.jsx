import { useState } from 'react'
import Navbar from './components/Navbar/NAvbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'

const App = () => {


  return (
    
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        </div>
       
  )
}

export default App

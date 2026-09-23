import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tools from './Pages/Tools/Tools'
import Login from './Pages/Login/login'
import Signup from './Pages/Signup/Signup'
import ForgotPassword from './Pages/Login/ForgotPassword'
import Crops from './Pages/Crops/Crops'
import BuyCrops from './Pages/Crops/BuyCrops'
import SellCrops from './Pages/Crops/SellCrops'
import Aboutus from './Pages/Aboutus/Aboutus'
import Selltools from './components/Selltools/Selltools'
import BuyTools from './components/Buytools/Buytools'
import RentalTools from './components/Rentaltools/Rentaltools'
import MechanicServices from './components/Mechanic/Mechanic'
import RegisterM from './components/Mechanic/Register/RegisterM'
import ExpertsList from './components/Experts/Experts'
import Cropshops from './components/Cropshops/Cropshops'
import Cropadvisory from './components/Cropadvisory/Cropadvisory'
import UIShowcase from './Pages/UIShowcase/UIShowcase'
import CropInfo from './Pages/Crops/CropInfo'
import Animal from './Pages/Animal/Animal'
import AnimalHealth from './Pages/Animal/AnimalHealth'
import AnimalDisease from './Pages/Animal/AnimalDisease'
import NearbyVets from './Pages/Animal/NearbyVets'
import BuySellAnimals from './Pages/Animal/BuySellAnimals'
import { LocationContextProvider } from './context/LocationContext'
import WeatherWidget from './components/Weather/WeatherWidget'


const App = () => {


  return (
    <LocationContextProvider>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/tools' element={<Tools/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/buy-tools' element={<BuyTools/>}/>
          <Route path='/sell-tools' element={<Selltools/>}/>
          <Route path='/rent-tools' element={<RentalTools/>}/>
          <Route path='/mechanic' element={<MechanicServices/>}/>
          <Route path='/register-mechanic' element={<RegisterM/>}/>
          <Route path='/crops' element={<Crops/>}/>
          <Route path='/buy-crops' element={<BuyCrops/>}/>
          <Route path='/sell-crops' element={<SellCrops/>}/>
          <Route path='/experts' element={<ExpertsList/>}/>
          <Route path='/crop-shops' element={<Cropshops/>}/>
          <Route path='/crop-advisory' element={<Cropadvisory/>}/>
          <Route path='/crop-info' element={<CropInfo/>}/>
          <Route path='/animal' element={<Animal/>}/>
          <Route path='/animal-health' element={<AnimalHealth/>}/>
          <Route path='/animal-disease' element={<AnimalDisease/>}/>
          <Route path='/nearby-vets' element={<NearbyVets/>}/>
          <Route path='/buy-sell-animals' element={<BuySellAnimals/>}/>
          <Route path='/ui-showcase' element={<UIShowcase/>}/>
        </Routes>
        <WeatherWidget />
      </div>
    </LocationContextProvider>
  )
}

export default App

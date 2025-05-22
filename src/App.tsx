import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import { useState } from 'react'
import NavBar from './components/Navbar'
import Teachers from './pages/Teachers/Teachers'
import Lessons from './pages/Lessons/Lessons'

function App() {

  const location = useLocation();
  const [currDate, setCurrDate] = useState<Date>(new Date());

  const hideNavBarRoutes = ['/', '/register'];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen p-2 bg-gray-100 flex flex-col">
      { shouldShowNavBar && <NavBar changeCurrDate={setCurrDate} />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/lessons' element={<Lessons />} />
      </Routes>
    </div>
  )
}

export default App

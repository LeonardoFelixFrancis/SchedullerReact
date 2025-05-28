import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { useState } from "react";
import NavBar from "./components/Navbar";
import Teachers from "./pages/Teachers/Teachers";
import Lessons from "./pages/Lessons/Lessons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/Resetpassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const location = useLocation();
  const [currDate, setCurrDate] = useState<Date>(new Date());

  const hideNavBarRoutes = ["/", "/register"];
  const shouldHideNavBar =
    hideNavBarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/reset_password");

  const shouldShowNavBar = !shouldHideNavBar;

  console.log(location.pathname);

  return (
    <div className="min-h-screen p-2 bg-gray-100 flex flex-col">
      {shouldShowNavBar && <NavBar changeCurrDate={setCurrDate} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;

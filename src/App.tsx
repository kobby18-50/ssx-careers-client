// import RegisterUser from "./pages/auth/register/RegisterUser"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login/Login"
import RegisterUser from "./pages/auth/register/RegisterUser"
import RegisterAdmin from "./pages/auth/register/RegisterAdmin"
import IPOPage from "./pages/ipo/IPOPage"
import VerifyEmail from "./pages/verify/VerifyEmail"
import Dashboard from "./pages/dashboard/Dashboard"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Subscriptions from "./pages/subscribe/Subscriptions"

function App() {


  return (
    <>

      <Routes>
        {/* auth routes */}
        <Route  path="/" element={<Login />}/>
        <Route  path="/auth/register-user" element={<RegisterUser />}/>
        <Route  path="/auth/register-admin" element={<RegisterAdmin />}/>

        {/* ipo routes */}
        <Route path="/ipo/create-ipo" element={<IPOPage/>} />

        {/* verify email */}
        <Route path="/user/verify-email" element={<VerifyEmail/>} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />

        {/* subscriptions */}
        <Route path="/dashboard/subscribe/:id" element={<Subscriptions/>} />




      </Routes>
      {/* <RegisterUser/> */}
    </>
  )
}

export default App

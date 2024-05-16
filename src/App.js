import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import DoctorsProfile from './pages/DoctorsProfile/DoctorsProfile';
import ViewAppointments from'./pages/ViewAppointments/ViewAppointments'; 
import ScheduleAppointments from'./pages/ScheduleAppointments/ScheduleAppointemts';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
  return (
    //  <RouterProvider router={router}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Registration />} />
      <Route path="/DoctorsProfle" element={<DoctorsProfile />} />
      <Route path="/ViewAppointments" element={<ViewAppointments/>}/>
      <Route path="/ScheduleAppointments"element={<ScheduleAppointments/>}/>
      <Route path="/UserProfile" element={<UserProfile/>}/>
    </Routes>

  );
}

export default App;

import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import DoctorsProfile from './pages/DoctorsProfile/DoctorsProfile';
import ViewAppointments from'./pages/ViewAppointments/ViewAppointments'; 
import ScheduleAppointments from'./pages/ScheduleAppointments/ScheduleAppointemts';
import ConfirmAppointment from './pages/ConfirmAppointment/ConfirmAppointment';
import UserProfile from './pages/UserProfile/UserProfile';
import VoiceChat from './pages/VoiceChat/VoiceChat';
import ReScheduleAppointment from './pages/ReScheduleAppointment/ReScheduleAppointemts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Registration />} />
      <Route path="/DoctorsProfile" element={<DoctorsProfile />} />
      <Route path="/Appointments" element={<ViewAppointments/>}/>
      <Route path="/ScheduleAppointment"element={<ScheduleAppointments/>}/>
      <Route path="/ConfirmAppointment"element={<ConfirmAppointment/>}/>
      <Route path="/Profile" element={<UserProfile/>}/>
      <Route path="/VoiceChat" element={<VoiceChat/>}/>
      <Route path="/ReScheduleAppointment" element={<ReScheduleAppointment/>}/>
    </Routes>
  );
}

export default App;
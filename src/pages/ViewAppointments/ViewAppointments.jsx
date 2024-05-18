import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaCircleUser, FaCalendarDay, FaRegClock } from 'react-icons/fa6';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

import VP_Styles from './ViewAppointments.module.css'
import strings from '../../utilities/strings'

function ViewAppointments() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const [appointmentsUpcoming, setAppointmentsUpcoming] = useState([]);
    const [pastAppointments, setAppointmentsPast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usrID, setUsrId] = useState("");
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const { userId } = decodedToken;
                fetchAppoitnmentData(userId);
                setUsrId(userId);
            }
        }
    }, [isAuthenticated, navigate]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const fetchAppoitnmentData = async (userId) => {
  
        try {
            const response = await axios.get(`http://localhost:6969/appointment/upcomingAppointments/${userId}`);
            const appointmentData = response.data;
            setAppointmentsUpcoming(appointmentData.upcomingAppointments);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }

        try {
            const response = await axios.get(`http://localhost:6969/appointment/pastAppointments/${userId}`);
            const appointmentData = response.data;
            setAppointmentsPast(appointmentData.pastAppointments);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }
    };

    // Function to calculate days remaining from today to the selected date
    const calculateDaysRemaining = (dateString) => {
        const selectedDate = new Date(dateString);
        const today = new Date();
        const differenceInTime = selectedDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const currentDate = new Date();

    const calculateDaysAgo = (dateString) => {
        const selectedDate = new Date(dateString);
        const today = new Date();
        const differenceInTime = today.getTime() - selectedDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    function rescheduleAction(data) {
       navigate('/ReScheduleAppointment', {
        state: {
            appointmentId: data._id,
            appointmentData : data.date,
            appointmentTime : data.time
        }
       });
    }


    return (
        <div>
            <header>
                <div className="navbar">
                    <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
                    <h2>{strings.appName} | <span> Appointments </span></h2>
                    <div className='nav_btn_container'>
                        <ul>
                            <li><a href='/Appointments'>Appointments</a></li>
                            <li><a href='/VoiceChat'>Book Appointment</a></li>
                        </ul>
                        <a href='/Profile' className='user_icon'><FaCircleUser className='icon' /></a>
                    </div>
                </div>

                <div className={`menu_container ${isMenuOpen ? 'show' : ''}`}>
                    <div className='menu_header'>
                        <h2 className='app_name'>{strings.appName}</h2>
                        <button className='btn_close_menu' onClick={toggleMenu}><FaAlignRight /></button>
                    </div>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/Appointments'>Appointments</a></li>
                        <li><a href='/Profile'>Profile</a></li>
                        <li><a href='/Login'>Login</a></li>
                        <li><a href='/Register'>Register</a></li>
                    </ul>
                </div>
            </header>
            <section>
                <div className={VP_Styles.container}>
                    <div className={VP_Styles.tab_buttons}>
                        {/* <button onClick={() => handleTabClick('tab1')} className={`${activeTab === 'tab1' ? VC_Style.activeTab : ''}`}>Tab 1</button> */}
                        <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? VP_Styles.activeTab : ''}>Upcoming</button>
                        <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? VP_Styles.activeTab : ''}>Past</button>
                    </div>
                    <div className={VP_Styles.tab_content}>
                        {/* Upcoming Apppointments */}
                        {activeTab === 'tab1' && <div>
                            <h2>Upcoming</h2>
                            <div className={VP_Styles.appointment_card}>
                                {isLoading ? (
                                    <p style={{ textAlign: 'center' }}>Loading...</p> // Show loading message while data is being fetched
                                ) : appointmentsUpcoming.length === 0 ? (
                                    <p style={{ textAlign: 'center' }}>No upcoming appointments found</p>
                                ) : (
                                    // Render appointment cards when appointments are available
                                    appointmentsUpcoming.map((appointment, index) => (
                                        <div key={index}>
                                        <div className={VP_Styles.appointment_details}>
                                            <div className={VP_Styles.details}>
                                                <div>
                                                    <h3>{appointment.doctor}</h3>
                                                    {/* Assuming 'doctor' field contains the doctor's name */}
                                                    {/* If 'specialization' field is available, you can include it here */}
                                                </div>
                                                <div>
                                                    <div className={VP_Styles.time}>
                                                        <FaRegClock className={VP_Styles.icon} />
                                                        <p>{appointment.time}</p>
                                                    </div>
                                                    <div className={VP_Styles.date}>
                                                        <FaCalendarDay className={VP_Styles.icon} />
                                                        <p>{formatDate(appointment.date)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={VP_Styles.button_container}>
                                                <div className={VP_Styles.more_days}><p>{calculateDaysRemaining(appointment.date)} Days more</p></div>
                                                <button className="btn_primary" onClick={()=>rescheduleAction(appointment)}>Reschedule</button>
                                            </div>
                                        </div>
                                        <div className={VP_Styles.divider} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>}
                        {/* Past Appointments */}
                        {activeTab === 'tab2' && <div>
                            <h2>Past</h2>
                            <div className={VP_Styles.appointment_card}>
                                {isLoading ? (
                                    <p style={{ textAlign: 'center' }}>Loading...</p> // Show loading message while data is being fetched
                                ) : pastAppointments.length === 0 ? (
                                    <p style={{ textAlign: 'center' }}>No past appointments found</p>
                                ) : (
                                    pastAppointments.map((appointment, index) => (
                                        <div key={index}>
                                        <div className={VP_Styles.appointment_details}>
                                            <div className={VP_Styles.details}>
                                                <div>
                                                    <h3>{appointment.doctor}</h3>
                                                    <p>{appointment.specialization}</p>
                                                </div>
                                                <div>
                                                    <div className={VP_Styles.time}>
                                                        <FaRegClock className={VP_Styles.icon} />
                                                        <p>{appointment.time}</p>
                                                    </div>
                                                    <div className={VP_Styles.date}>
                                                        <FaCalendarDay className={VP_Styles.icon} />
                                                        <p>{formatDate(appointment.date)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={VP_Styles.button_container}>
                                                <div className={VP_Styles.days_ago}><p>{Math.abs(calculateDaysAgo(appointment.date))} Days ago</p></div>
                                                <button className="btn_primary" onClick={()=>rescheduleAction(appointment)}>Reschedule</button>
                                            </div>
                                        </div>
                                        <div className={VP_Styles.divider} />
                                        </div>

                                    )))}
                            </div>
                        </div>}
                    </div>
                </div>
            </section >
        </div >

    );
}

export default ViewAppointments;
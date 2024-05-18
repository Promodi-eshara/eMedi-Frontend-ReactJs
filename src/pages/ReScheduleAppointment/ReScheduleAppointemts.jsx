import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaCircleUser, FaAward, FaUsers, FaChevronDown } from "react-icons/fa6";
import Swal from 'sweetalert2';
import axios from 'axios';
import emailjs from 'emailjs-com';

import SA_Styles from './ScheduleAppointments.module.css'
import strings from '../../utilities/strings'
import doctor from '../../assets/docimage.png'
import DateSelector from './DateSelector';

function ReScheduleAppointments() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const location = useLocation();
    const { appointmentId , appointmentData , appointmentTime } = location.state;

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const newDates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(currentYear, currentDate.getMonth(), currentDate.getDate() + i);
            const month = date.toLocaleString('default', { month: 'short' });
            const formattedDate = `${month} ${date.getDate()}`;
            newDates.push(formattedDate);
        }
        setDates(newDates);

        setSelectedTime(appointmentTime);
        setSelectedScheduleDate(dateConvert(appointmentData));
    }, []);

    function dateConvert(dateString){
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleString('default', { month: 'short', day: 'numeric' });
        return formattedDate;
    }

    const handleScheduleDateSelection = (date) => {
        setSelectedScheduleDate(date);
        setSelectedDate(date);
    };

    function updateAppointment(){
        const currentYear = new Date().getFullYear();

        axios.patch(`http://localhost:6969/appointment/updateAppoinment/${appointmentId}`, {
            date : `${selectedDate} ${currentYear}`,
            time : selectedTime
        })
        .then(response => {
            // Handle success response
            Swal.fire({
                icon: 'success',
                title: 'Appointment Updated',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href="./Appointments";
            });
        })
        .catch(error => {
            // Handle error response
            console.error('Error updating appointment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'An error occurred while updating the appointment. Please try again later.',
                confirmButtonText: 'OK'
            });
        });
    }

    return (
        <div>
            <header>
                <div className="navbar">
                    <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
                    <h2>{strings.appName} | <span>Schedule Appointment</span></h2>
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
                        <li><a href='/UserProfile'>Profile</a></li>
                        <li><a href='/Login'>Login</a></li>
                        <li><a href='/Register'>Register</a></li>
                    </ul>
                </div>
            </header>
            <section>
                <div className={SA_Styles.container}>
                    <div className={SA_Styles.doctor_profile}>
                        <h1 style={{textAlign:'center'}} >RESCHEDULE APPOINTMENT</h1>
                        <div style={{paddingTop:'3%'}}>
                            <h2>Schedule</h2>
                            <div className={SA_Styles.schedule}>
                                <DateSelector selectedDate={selectedScheduleDate} handleDateSelection={handleScheduleDateSelection} dates={dates} />
                            </div>
                        </div>
                        <div>
                            <h2>Time</h2>
                            <div className={SA_Styles.time}>
                                <button className={selectedTime === '4.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('4.00 PM')}>4.00 PM</button>
                                <button className={selectedTime === '5.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('5.00 PM')}>5.00 PM</button>
                                <button className={selectedTime === '6.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('6.00 PM')}>6.00 PM</button>
                                <button className={selectedTime === '7.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('7.00 PM')}>7.00 PM</button>
                                <button className={selectedTime === '8.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('8.00 PM')}>8.00 PM</button>
                                <button className={selectedTime === '9.00 PM' ? 'btn_primary' : 'btn_secondary'} onClick={() => handleTimeSelection('9.00 PM')}>9.00 PM</button>
                            </div>
                        </div>
                </div>
                </div>
                <div className={SA_Styles.footer}>
                    <div className={SA_Styles.button_container}>
                        <a href='/Appointments' className='btn_secondary'>Cancel</a>
                        <button onClick={updateAppointment} className={'btn_primary'} >Update Appointment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ReScheduleAppointments;
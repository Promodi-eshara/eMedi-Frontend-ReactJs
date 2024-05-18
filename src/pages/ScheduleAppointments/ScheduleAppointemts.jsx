import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaCircleUser, FaAward, FaUsers, FaChevronDown } from "react-icons/fa6";
import Swal from 'sweetalert2';

import SA_Styles from './ScheduleAppointments.module.css'
import strings from '../../utilities/strings'
import doctor from '../../assets/docimage.png'
import DateSelector from './DateSelector';

function ScheduleAppointments() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const { doctorData, symptomsData } = location.state;
    
    const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
    const [dates, setDates] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const isAuthenticated = !!localStorage.getItem('token');
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
        }
    }, [isAuthenticated, navigate]);

    const hospitals = doctorData.Hospitals ? doctorData.Hospitals.split(';').map(hospital => hospital.trim()) : [];

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedHospital, setSelectedHospital] = useState('');

    // Handler function to update the selected hospital
    const handleHospitalSelection = (hospital) => {
        setSelectedHospital(hospital);
        setIsDropdownOpen(false);
    };

    // Handler function to update the selected date
    const handleDateSelection = (date) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setSelectedDate(`${date} ${currentYear}`);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    const handleBookAppointment = () => {
       
        if (!doctorData || !selectedHospital || !selectedDate || !selectedTime) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select all required fields!',
                confirmButtonText: 'OK'
            });
            return;
        }
    
        const currentYear = new Date().getFullYear();
        navigate('/ConfirmAppointment', {
            state: {
                doctor: doctorData,
                selectedHospital: selectedHospital,
                selectedDate: `${selectedDate} ${currentYear}`,
                selectedTime: selectedTime,
                symptoms : symptomsData
            }
        });
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
    }, []);

    const handleScheduleDateSelection = (date) => {
        setSelectedScheduleDate(date);
        setSelectedDate(date);
    };
    
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
                        <div className={SA_Styles.doctor_details}>
                            <img src={doctor} alt="Doctor" className={SA_Styles.doctor_img} />
                            <div className={SA_Styles.details}>
                                <h1 className={SA_Styles.doctors_name}>{doctorData.Name}</h1>
                                <p className={SA_Styles.doctors_specialization}>{doctorData.Specialization}</p>
                                <div className={SA_Styles.experience}><span className={SA_Styles.certificate}><FaAward /></span><p>7 Years of Experience</p></div>
                                <div className={SA_Styles.experience}><span className={SA_Styles.certificate}><FaUsers /></span><p>20,000+ Patients</p></div>
                            </div>
                        </div>

                        <h2>Biography</h2>
                        <p className={SA_Styles.bio}>{doctorData.Biography}</p>

                        <h2>Hospital</h2>
                        <div class="dropdown">
                            <button className="btn_drop" onClick={toggleDropdown}>{selectedHospital ? `${selectedHospital}` : 'No hospital selected'}<span className={SA_Styles.icon}><FaChevronDown /></span></button>
                            <div className={`dropdown_content ${isDropdownOpen ? 'show' : ''}`}>
                                {hospitals.map((hospital, index) => (
                                    <a key={index} href="javascript:void(0)" onClick={() => handleHospitalSelection(hospital)}>{hospital}</a>
                                ))}
                            </div>
                        </div>

                        <h2>Schedule</h2>
                        <div className={SA_Styles.schedule}>
                            <DateSelector selectedDate={selectedScheduleDate} handleDateSelection={handleScheduleDateSelection} dates={dates} />
                        </div>

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
                <div className={SA_Styles.footer}>
                    <div className={SA_Styles.button_container}>
                        <a href='/VoiceChat' className='btn_secondary'>Cancel</a>
                        <button onClick={handleBookAppointment} className={'btn_primary'} >Book Appointment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ScheduleAppointments;
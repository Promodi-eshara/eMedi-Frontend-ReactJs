import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaUserCircle, FaChevronDown, FaAward, FaUsers } from "react-icons/fa";

import DP_Styles from './DoctorsProfile.module.css'
import strings from '../../utilities/strings'
import doctor from '../../assets/docimage.png'

function DoctorsProfile() {
    const location = useLocation();
    const doctorData = location.state?.doctor || {};

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const hospitals = doctorData.Hospitals ? doctorData.Hospitals.split(';').map(hospital => hospital.trim()) : [];

    return (
        <div>
            <header>
                <div className='navbar'>
                    <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
                    <h2>{strings.appName} | <span>Doctors Profile</span></h2>
                    <div className='nav_btn_container'>
                        <ul>
                            <li><a href='/Appointments'>Appointments</a></li>
                            <li><a href='/VoiceChat'>Book Appointment</a></li>
                        </ul>
                        <a href='/Profile' className='user_icon'><FaUserCircle className='icon' /></a>
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
                <div className={DP_Styles.container}>
                    <div className={DP_Styles.doctor_profile}>
                        <div className={DP_Styles.doctor_details}>
                            <img src={doctor} alt="Doctor" className={DP_Styles.doctor_img} />
                            <div className={DP_Styles.details}>
                                <h1 className={DP_Styles.doctors_name}>{doctorData.Name}</h1>
                                <p className={DP_Styles.doctors_specialization}>{doctorData.Specialization}</p>
                                <div className={DP_Styles.experience}><span className={DP_Styles.certificate}><FaAward /></span><p>7 Years of Experience</p></div>
                                <div className={DP_Styles.experience}><span className={DP_Styles.certificate}><FaUsers /></span><p>20,000+ Patients</p></div>
                            </div>
                        </div>

                        <h2>Biography</h2>
                        <p className={DP_Styles.bio}>{doctorData.Biography}</p>

                        <h2>Hospital</h2>
                        <div className="dropdown">
                            <button className="btn_drop" onClick={toggleDropdown}>Show all hospitals <span className={DP_Styles.icon}><FaChevronDown /></span></button>
                            <div className={`dropdown_content ${isDropdownOpen ? 'show' : ''}`}>
                                {hospitals.map((hospital, index) => (
                                    <a key={index} href="javascript:void(0)">{hospital}</a>
                                ))}
                            </div>
                        </div>

                        <h2>Schedule</h2>
                        <div className={DP_Styles.schedule}>
                            <button className='btn_secondary'>May 12</button>
                            <button className='btn_secondary'>May 13</button>
                            <button className='btn_secondary'>May 14</button>
                            <button className='btn_disabled'>May 15</button>
                            <button className='btn_secondary'>May 16</button>
                            <button className='btn_disabled'>May 17</button>
                            <button className='btn_disabled'>May 18</button>
                            <button className='btn_secondary'>May 19</button>
                        </div>

                        <h2>Time</h2>
                        <div className={DP_Styles.time}>
                            <button className='btn_disabled'>4.00 PM</button>
                            <button className='btn_secondary'>6.00 PM</button>
                            <button className='btn_secondary'>6.00 PM</button>
                            <button className='btn_secondary'>7.00 PM</button>
                            <button className='btn_disabled'>8.00 PM</button>
                            <button className='btn_disabled'>9.00 PM</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DoctorsProfile;
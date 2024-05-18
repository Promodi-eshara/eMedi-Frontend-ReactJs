import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaCheckCircle } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import CA_Styles from './ConfirmAppointment.module.css'
import strings from '../../utilities/strings'

function ConfirmAppointment() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { doctor: doctorData, selectedHospital, selectedDate, selectedTime , symptoms } = location.state;
    const isAuthenticated = !!localStorage.getItem('token');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [appointmentDetails, setAppointmentDetails] = useState({
        doctorName: doctorData.Name || '',
        specialization: doctorData.Specialization || '',
        hospital: '',
        date: '',
        time: '',
        userId: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
        }

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const { userId } = decodedToken;
            setAppointmentDetails(prevState => ({
                ...prevState,
                hospital: selectedHospital || '',
                date: selectedDate || '',
                time: selectedTime || '',
                userId: userId || ''
            }));
        }

        if (doctorData) {
            setAppointmentDetails(prevState => ({
                ...prevState,
                doctorName: doctorData.Name || '',
                specialization: doctorData.Specialization || ''
            }));
        }

    }, [isAuthenticated, navigate, doctorData, selectedHospital, selectedDate, selectedTime]);

    const handleConfirmAppointment = async () => {
        // Check if all fields are filled
        if (appointmentDetails.hospital && appointmentDetails.date && appointmentDetails.time) {
            
            var formData = {
                doctor: doctorData.Name,
                patient: appointmentDetails.userId,
                date: appointmentDetails.date ,
                time: appointmentDetails.time,
                symptoms: symptoms,
                status: 'Scheduled'
              };
          
            try {
                const response = await axios.post('http://localhost:6969/appointment/appointmentSave', formData);
                console.log(response);
                if (response.status === 201) {
                    if(response.data.status == "error"){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Doctor is not available at the specified date and time'
                        }); 
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: "Appoinment is created",
                            text: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(async function () {
                            const { value: email ,  dismiss} = await Swal.fire({
                                title: "Input email address",
                                input: "email",
                                inputLabel: "Your email address",
                                inputPlaceholder: "Enter your email address",
                                showCancelButton: true,
                                cancelButtonText: "Skip"
                            });
                            if (dismiss === Swal.DismissReason.cancel) {
                            // window.location.href = "./";
                            } else if (email) {
                                console.log("Email entered:", email);
                                sendEmail(email);
                            }
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.message,
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to save appointment!'
                });
            }
        } else {
            console.log('Please fill in all required fields.');
        }
    };

    function sendEmail(email) {
        emailjs.send("service_ajnnw93","template_hhfk0rm", {
            email: email,
            p_name: appointmentDetails.userId,
            d_name: doctorData.Name,
            a_date: appointmentDetails.date,
            a_time: appointmentDetails.time,
            status: "Scheduled"
        }, "UbwBmYxk9U4vj34ga")
        .then((response) => {
            Swal.fire({
                title: 'Success!',
                text: `The e-receipt has been sent to your email. Email : "${email}" `,
                icon: 'success'
            });
            window.location.href = "./";
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });
    }

    return (
        <div>
            <header>
                <div className="navbar">
                    <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
                    <h2>{strings.appName} | <span>Confirm Appointment</span></h2>
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
                <div className={CA_Styles.confirm_container}>
                    <div className={CA_Styles.confirm_card}>
                        <span className={CA_Styles.icon}><FaCheckCircle /></span>
                        <h1>Confirm Booking</h1>
                        <p>{appointmentDetails.doctorName}</p>
                        <p>{appointmentDetails.specialization}</p>
                        <p>{appointmentDetails.hospital}</p>
                        <p>{appointmentDetails.date}</p>
                        <p>{appointmentDetails.time}</p>
                        <button onClick={handleConfirmAppointment} className='btn_primary'>Confirm Appointment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ConfirmAppointment;
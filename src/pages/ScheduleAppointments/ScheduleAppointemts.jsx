import React from 'react';
import './ScheduleAppointments.css'
import doctor from '../../assets/docimage.png'
import { FaUserCircle } from "react-icons/fa";
function ScheduleAppointments() {
    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>E - Channel Voice | <span>Schedule Appointments</span></h2>
                    <div className='usericon'><FaUserCircle className='icon' /></div>
                </div>
            </header>
            <section>
                <div className='container'>
                    <div className="doctor-profile">
                        <div className="profile-details">
                            <img src={doctor} alt="Doctor" className="doctor-image" />
                            <div className="details">
                                <h2>Dr. simson</h2>
                                <p>Cardiologist</p>
                                <img src="certificate-path" alt="Certificate" className="certificate" />
                                <p>Patients: 20000+</p>
                                <p>7 Year Experience</p>
                            </div>
                        </div>

                        <h3>Hospital</h3>
                        <button className="btn-primary">Select a hopsital &nbsp V</button>


                        <h3>Schedule</h3>
                        <div className="schedule">
                            <button className="btn-secondary">May 12</button>
                            <button className="btn-primary">May 13</button>
                            <button className="btn-secondary">May 14</button>
                            <button className="btn-disabled">May 15</button>
                            <button className="btn-secondary">May 16</button>
                            <button className="btn-secondary">May 17</button>
                            <button className="btn-secondary">May 18</button>
                            <button className="btn-disabled">May 19</button>
                        </div>

                        <h3>Time</h3>
                        <div class="time">
                            <button class="btn-disabled">4.00 PM</button>
                            <button class="btn-secondary">6.00 PM</button>
                            <button class="btn-primary">6.00 PM</button>
                            <button class="btn-secondary">7.00 PM</button>
                            <button class="btn-disabled">8.00 PM</button>
                            <button class="btn-secondary">9.00 PM</button>

                        </div>
                        <hr />
                        <button className="btn-secondary">Cancel</button>
                        <button className="btn-primary">Book Appointment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ScheduleAppointments; 
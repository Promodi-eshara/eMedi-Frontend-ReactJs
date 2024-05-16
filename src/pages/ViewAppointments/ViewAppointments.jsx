import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ViewAppointments.css'
function ViewAppointments() {
    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>E - Channel Voice | <span> Appointments </span></h2>
                    <div className='usericon'><FaUserCircle className='icon' /></div>
                </div>
            </header>
            <section>
                <div className='appointment'>
                <div className="tabs">
                    <button className="btn-primary">Upcoming</button>
                    <button className="btn-secondary">Past</button>
                </div>

                <div className='row'>
                <div className="appointment-details">
                    <h2>Appointment Details</h2>
                    <p>in 3 days</p>
                    <p>Dr. John</p>
                    <p>Cardiologist</p>
                    <p>1:00 PM</p>
                    <p>2024 May 18</p>
                    <button className="btn-primary">Reschedule</button>
                </div>
                </div>
                <footer>
                    <button className="btn-secondary">Back</button>
                    <button className="btn-primary">Next</button>
                </footer>
            </div>
            </section>
        </div >

    );
}

export default ViewAppointments;

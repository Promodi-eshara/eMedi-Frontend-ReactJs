import React from 'react';
import './DoctorsProfile.css'
import doctor from '../../assets/docimage.png'
import {FaUserCircle}from "react-icons/fa";
function DoctorsProfile() {
    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>E - Channel Voice | <span>Doctors Profile</span></h2>
                    <div className='usericon'><FaUserCircle className='icon'/></div>
                </div>
            </header>
            <section>
                <div className='container'>
                    <div className="doctor-profile">
                        <div className="profile-details">
                            <img src={doctor} alt="Doctor" className="doctor-image" />
                            <div className="details">
                                <h2>Dr. Jhone</h2>
                                <p>Cardiologist</p>
                                <img src="certificate-path" alt="Certificate" className="certificate" />
                                <p>Patents: 200+</p>
                                <p>7 Year Experience</p>
                            </div>
                        </div>

                        <h2>Biography</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <h3>Hospital</h3>
                        <button className="btn-primary">Select a hopsital &nbsp V</button>


                        <h3>Schedule</h3>
                        <div className="schedule">
                            <button className="btn-primary">May 12</button>
                            <button className="btn-primary">May 13</button>
                            <button className="btn-disabled">May 14</button>
                            <button className="btn-primary">May 15</button>
                            <button className="btn-disabled">May 16</button>
                            <button className="btn-primary">May 17</button>
                            <button className="btn-disabled">May 18</button>
                            <button className="btn-primary">May 19</button>
                        </div>

                        <h3>Time</h3>
                        <div class="time">
                            <button class="btn-disabled">4.00 PM</button>
                            <button class="btn-primary">6.00 PM</button>
                            <button class="btn-primary">6.00 PM</button>
                            <button class="btn-primary">7.00 PM</button>
                            <button class="btn-disabled">8.00 PM</button>
                            <button class="btn-primary">9.00 PM</button>
                           
                        </div>
                        <hr />
                        <button className="btn-secondary">Back</button>
                        <button className="btn-primary">Next</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DoctorsProfile; 
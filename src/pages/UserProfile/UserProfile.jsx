import React from 'react';
import './UserProfile.css'
import user from '../../assets/docimage.png'
import { FaUserCircle } from "react-icons/fa";
function UserProfile() {
    return (
        <div>
            <header>
                <div className="header">
                    <h2>E - Channel Voice | <span>User Profile</span></h2>
                    <div className=""><FaUserCircle className="icon" /></div>
                </div>
            </header>
            <section>
                <img src="pic_trulli.jpg" alt="Trulli" width="250" height="250"/>
                    <div class="registration-container">
                        <div class="registration-card">
                            <form>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Your Name" required />

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="Enter Your Email" required />

                                <label htmlFor="mobile">Mobile Number</label>
                                <input type="tel" id="mobile" placeholder="Enter Your Mobile" required />

                                <label htmlFor="mobile">Emergency Number (Optional)</label>
                                <input type="tel" id="mobile" placeholder="Enter Your Mobile" />


                                <label htmlFor="blood-group">Blood Group</label>
                                <input type="text" id="blood-group" placeholder="Enter Your Blood Group" required />

                                <label htmlFor="allergies">Allergies</label>
                                <input type="text" id="allergies" placeholder="Enter Any Allergies" required />

                                <label htmlFor="medications">Previous Medication</label>
                                <input type="text" id="medications" placeholder="Enter Any Previous Medications" required />

                                <label htmlFor="weight">Weight</label>
                                <input type="text" id="weight" placeholder="Enter Your Weight" required />

                                <label htmlFor="height">Height</label>
                                <input type="text" id="height" placeholder="Enter Your Height" required />

                                <label htmlFor="gender">Gender</label>
                                <input type="text" id="gender" placeholder="Enter Your Gender" required />

                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" placeholder="Enter Your Address" required />
                            </form>

                        </div>
                    </div>
            </section>


        </div>
   
    )

};

export default UserProfile;


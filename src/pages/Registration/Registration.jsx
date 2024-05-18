import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Regstyle from './Registration.module.css';
import strings from '../../utilities/strings';

function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the server with the registration data
            const response = await axios.post('http://localhost:6969/auth/register', formData);
            // const response = "Success";
            console.log(response.data); // Log the response from the server
            // Optionally, redirect the user to another page after successful registration
            navigate('/Login');
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle any errors, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>{strings.appName} | <span>Registration</span></h2>
                </div>
            </header>
            <section>
                <div className={Regstyle.registration_container}>
                    <div className={Regstyle.registration_card}>
                        <h2>Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />

                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="tel" id="mobile" placeholder="Enter Your Mobile" required value={formData.mobile} onChange={handleChange} />

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password" required value={formData.password} onChange={handleChange} />

                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" placeholder="Re-Enter Your Password" required />

                            <p>Already have an account? <a href="/Login">Login</a></p>
                            <button type="submit" className="btn_primary">Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Registration;
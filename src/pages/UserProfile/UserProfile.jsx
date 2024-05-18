import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaCircleUser } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import UP_Styles from './UserProfile.module.css'
import strings from '../../utilities/strings'
import user from '../../assets/docimage.png'

function UserProfile() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
        emergencyNumber: '',
        bloodGroup: '',
        allergies: '',
        medications: '',
        weight: '',
        height: '',
        gender: '',
        address: ''
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isAuthenticated = !!localStorage.getItem('token');
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const { userId } = decodedToken;
                fetchUserData(userId);
            }
        }
    }, [isAuthenticated, navigate, userData]);

    const fetchUserData = async (identifier) => {
        try {
            const response = await axios.get(`http://localhost:6969/user/get-user/${encodeURIComponent(identifier)}`);
            const userData = response.data;
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:6969/auth/logout", {
                method: "POST",
                credentials: "include" // Include cookies in the request
            });
            // Clear the token from local storage
            localStorage.removeItem("token");
            // Redirect to the login page or perform any other action
            navigate("/Login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a PUT request to update user data
            const response = await axios.put(`http://localhost:6969/user/update-user/${encodeURIComponent(userData._id)}`, formData);
            console.log(response.data);
            // Optionally, you can fetch the updated user data after successful update
            // fetchUserData(userData._id);
            // Exit edit mode after successful update
            setIsEditing(false);
            navigate('/Profile');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <header>
                <div className="navbar">
                    <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
                    <h2>{strings.appName} | <span>Profile</span></h2>
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
                <div className={UP_Styles.container}>
                    <div className={UP_Styles.user_info}>
                        <img src={user} alt="User" />
                        <div>
                            <h1>{userData.name}</h1>
                            <p>{userData.email}</p>
                            <button className='btn_primary' onClick={isEditing ? handleSubmit : handleEdit}>{isEditing ? 'Update' : 'Edit'}</button>
                        </div>
                    </div>
                    <div className={UP_Styles.profile_container}>
                        {isEditing ? (
                            <form className={UP_Styles.profile_form} onSubmit={handleSubmit}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name='name' placeholder="Your Name" required onChange={handleChange} />

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name='email' placeholder="Enter Your Email" required onChange={handleChange} />

                                <label htmlFor="mobile">Mobile Number</label>
                                <input type="tel" id="mobile" name='mobile' placeholder="Enter Your Mobile" required onChange={handleChange} />

                                <label htmlFor="mobile">Emergency Number (Optional)</label>
                                <input type="tel" id="emergencyNumber" name='emergencyNumber' placeholder="Enter Your Mobile" onChange={handleChange} />

                                <label htmlFor="blood-group">Blood Group</label>
                                <input type="text" id="bloodGroup" name='bloodGroup' placeholder="Enter Your Blood Group" required onChange={handleChange} />

                                <label htmlFor="allergies">Allergies</label>
                                <input type="text" id="allergies" name='allergies' placeholder="Enter Any Allergies" required onChange={handleChange} />

                                <label htmlFor="medications">Previous Medication</label>
                                <input type="text" id="medications" name='medications' placeholder="Enter Any Previous Medications" required onChange={handleChange} />

                                <label htmlFor="weight">Weight</label>
                                <input type="text" id="weight" name='weight' placeholder="Enter Your Weight" required onChange={handleChange} />

                                <label htmlFor="height">Height</label>
                                <input type="text" id="height" name='height' placeholder="Enter Your Height" required onChange={handleChange} />

                                <label htmlFor="gender">Gender</label>
                                <input type="text" id="gender" name='gender' placeholder="Enter Your Gender" required onChange={handleChange} />

                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name='address' placeholder="Enter Your Address" required onChange={handleChange} />
                            </form>
                        ) : (
                            <div className={UP_Styles.information}>
                                <h4>Name</h4>
                                <p>{userData.name}</p>

                                <h4>Email</h4>
                                <p>{userData.email}</p>

                                <h4>Mobile Number</h4>
                                <p>{userData.mobile}</p>

                                <h4>Emergency Number</h4>
                                <p>{userData.emergencyNumber}</p>

                                <h4>Blood Group</h4>
                                <p>{userData.bloodGroup}</p>

                                <h4>Allergies</h4>
                                <p>{userData.allergies}</p>

                                <h4>Previous Medication</h4>
                                <p>{userData.medications}</p>

                                <h4>Weight</h4>
                                <p>{userData.weight}</p>

                                <h4>Height</h4>
                                <p>{userData.height}</p>

                                <h4>Gender</h4>
                                <p>{userData.gender}</p>

                                <h4>Address</h4>
                                <p>{userData.address}</p>
                            </div>

                        )}

                        <button type='button' className={UP_Styles.btn_logout} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default UserProfile;
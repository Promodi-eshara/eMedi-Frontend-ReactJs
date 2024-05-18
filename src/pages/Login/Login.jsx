import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoginStyle from './Login.module.css'
import strings from '../../utilities/strings'

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the server to authenticate the user
            const response = await axios.post('http://localhost:6969/auth/login', {
                identifier: formData.identifier, // Either mobile number or email
                password: formData.password
            });

            console.log(response.data);
            const { token } = response.data;
            // Log the response from the server
            localStorage.setItem('token', token);

            // Redirect the user to the dashboard or another page on successful login
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            // Display an error message to the user
        }
    };

    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>{strings.appName} | <span>Login</span></h2>
                </div>
            </header>
            <section>
                <div className={LoginStyle.login_container}>
                    <div className={LoginStyle.login_card}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="identifier" placeholder="Email / Mobile Number" value={formData.identifier} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} />

                            <p>Don't have an account? <a href="/Register">Create one</a></p>
                            <button className="btn_primary" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login; 
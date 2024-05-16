import React from 'react';
import './Registration.css'
function Registration() {
    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>E - Channel Voice | <span>Registration</span></h2>
                </div>
            </header>
            <section>
                <div className="registration-card">
                    <h2>Registration</h2>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your Name" required />

                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="tel" id="mobile" placeholder="Enter Your Mobile" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Your Password" required />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Re-Enter Your Password" required />

                        <p>Already Have an Account? <a href="/Login">Login here</a></p>


                        <button type="button" className="btn-primary">Register</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Registration; 
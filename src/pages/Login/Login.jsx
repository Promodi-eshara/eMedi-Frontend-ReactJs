import React from 'react';
import './Login.css'
function Login() {
    return (
        <div>
            <header>
                <div className="navbar">
                    <h2>E - Channel Voice | <span>Login</span></h2>
                </div>
            </header>
            <section>
                <div className="login-container">
                    <div className="login-card">
                        <h2>Login</h2>
                        <form>
                            <input type="text" placeholder="Email/NIC/Mobile Number" />
                            <input type="password" placeholder="Enter Your Password" />
                            <button className="btn-primary" type="submit">Login</button>

                            <p>Don't Have an Account? <a href="/Register" className="">Create One</a></p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login; 
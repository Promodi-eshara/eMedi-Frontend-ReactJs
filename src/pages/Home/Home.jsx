import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom'
import doctor from "../../assets/docimage.png"
function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  return (
    <div>
      <header>
        <div className="navbar">
          <h2>E - Channel Voice | <span>Home</span></h2>
          <div>
            <button className="btn-secondary" onClick={handleRegisterClick}>Register</button>
            <button className="btn-primary" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </header>
      <section>
        <div className='header'>
          <div className="row row-2">
            <div className='col-2'>
              <h1>E-Channel Voice</h1>
              <p>Fastest E - channel network</p>
              <button className="btn-primary">Book an Appointment</button>
            </div>
            <img src={doctor} alt="Doctor" />
          </div>
        </div>
      </section>
    </div >
  );
}

export default Home; 
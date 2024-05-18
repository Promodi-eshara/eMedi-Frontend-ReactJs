import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser, FaAlignLeft, FaAlignRight } from 'react-icons/fa6';

import HomeStyle from './Home.module.css';
import strings from '../../utilities/strings'
import doctor from "../../assets/docimage.png";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }
  }, [isAuthenticated, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <div className="navbar">
          <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
          <h2>{strings.appName} | <span>Home</span></h2>
          <div className='nav_btn_container'>
            <ul>
              <li><a href='/Appointments'>Appointments</a></li>
              <li><a href='/VoiceChat'>Book Appointment</a></li>
            </ul>
            <div className='nav_btn_container'><a href='/Profile' className='user_icon'><FaCircleUser className='icon' /></a></div>
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
            <li><a href='/Profile'>Logout</a></li>
            {!isAuthenticated && <li><a href='/Login'>Login</a></li>}
            {!isAuthenticated && <li><a href='/Register'>Register</a></li>}
          </ul>
        </div>
      </header>
      <section>
        <div className={HomeStyle.row}>
          <div className={HomeStyle.col_2}>
            <h1>E - Voice Channel</h1>
            <p>Fastest E - channel network</p>
            <button className="btn_primary">Book an Appointment</button>
          </div>
          <div className={HomeStyle.header_img}>
            <img src={doctor} alt="Doctor" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
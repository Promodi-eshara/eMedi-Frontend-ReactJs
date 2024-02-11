import React from 'react';
import './Home.css'
function Home() {
//   const history = useHistory();

//   const handleLoginClick = () => {
//     history.push('/login');
//   };
  return (
    <div>
      <div className="header">
        <h2>E - Channel Voice | <span>Home</span></h2>
        <div>
          <button className="btn-secondary">Register</button>
          {/* <button className="btn-primary" onClick={handleLoginClick}>Login</button> */}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <h1>E-Channel Voice</h1>
            <p>Fastest E - channel network</p>
            <button className="btn-primary">Book an Appointment</button>
          </div>
          <div className="col-2">
            <img src="./assest/docimage.png" alt="Doctor" />
          </div>
        </div>
      </div>
    </div>


  );
}

export default Home; 
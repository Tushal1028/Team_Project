
import React from 'react';
import './Styles/Landing.css';
import { useNavigate } from 'react-router-dom';
import img1 from './Images/1.jpg';
import img2 from './Images/2.jpg';
import img3 from './Images/3.jpg';
import img4 from './Images/4.jpg';
import img5 from './Images/5.jpg';
import img6 from './Images/6.jpg';

function LandingPage() {
  const navigate = useNavigate();

  function trynow() {
    navigate('/home');
  }
  function login(){
    navigate('/signup')
  }

  return (
    <div className="container-landing">
      <div className="left">
        <div className="logo">InterioVirt</div>
        <div style={{ marginTop: '200px' }}>
          <h1>Transform Your Space, Unleash Your Style</h1>
          <p>Unlock endless possibilities for your dream home—try our design tool and watch your vision come to life!</p>
        </div>
        <div className="button-group">
          <button className="btn btn-blue" onClick={trynow}>Try Now</button>
          <button className="btn btn-black" onClick={login}>Register Now</button>
        </div>
      </div>
      <div className="right">
        <div className="image-column">
          <div className="image image1"><img src={img4} alt="Image 1" /></div>
          <div className="image image4"><img src={img2} alt="Image 4" /></div>
        </div>
        <div className="image-column">
          <div className="image image2"><img src={img5} alt="Image 2" /></div>
          <div className="image image5"><img src={img1} alt="Image 6" /></div>
        </div>
        <div className="image-column">
          <div className="image image3"><img src={img6} alt="Image 3" /></div>
          <div className="image image6"><img src={img3} alt="Image 5" /></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

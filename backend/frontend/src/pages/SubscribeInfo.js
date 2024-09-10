import React,{useState} from 'react';
import './Styles/Sub.css'; // Import the CSS file for styles
import img from './Images/right.png'
import img1 from './Images/crown.jpg'
import { useNavigate } from 'react-router-dom';

function SubscribeInfo() {
  const navigate=useNavigate()
  function close(){
    navigate('/home')
  }
 function payment(){
  navigate("/payment-method")
 }
   // Initial state for checkboxes
   const [features, setFeatures] = useState({
    adDownload: false,
    teamSetup: false,
    chatLocked: false,
    freeProject: false,
  });

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFeatures((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [premiumFeatures, setPremiumFeatures] = useState({
    freeDownload: false,
    multipleTeamSetup: false,
    chatVideoCall: false,
    multipleProject: false,
  });

  // Handle checkbox changes
  const handleCheckboxChange1 = (event) => {
    const { name, checked } = event.target;
    setPremiumFeatures((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  return (
    <div className="pricing-container">
      <div className="pricing-card">
        <div className="card-header">
          <img src={img} alt="Icon" className="icon"/>
          <h2>Free</h2>
        </div>
        <hr />
        <div className="features-list">
          <label>
            <input 
              type="checkbox" 
              name="adDownload"
              checked={features.adDownload}
              onChange={handleCheckboxChange} 
            />
            Ad Download
          </label>
          <label>
            <input 
              type="checkbox" 
              name="teamSetup"
              checked={features.teamSetup}
              onChange={handleCheckboxChange} 
            />
            Single Team Set-Up
          </label>
          <label>
            <input 
              type="checkbox" 
              name="chatLocked"
              checked={features.chatLocked}
              onChange={handleCheckboxChange} 
            />
            Chat & Video Call Locked
          </label>
          <label>
            <input 
              type="checkbox" 
              name="freeProject"
              checked={features.freeProject}
              onChange={handleCheckboxChange} 
            />
            3 Free Project
          </label>
        </div>
        <button className="action-button" onClick={close}>Close</button>
      </div>
  
      <div className="pricing-card">
        <div className="card-header">
          <img src={img1} alt="Icon" className="icon"/>
          <h2>Premium</h2>
        </div>
        <hr />
        <div className="features-list">
          <label>
            <input 
              type="checkbox" 
              name="freeDownload"
              checked={premiumFeatures.freeDownload}
              onChange={handleCheckboxChange1} 
            />
            Free Download
          </label>
          <label>
            <input 
              type="checkbox" 
              name="multipleTeamSetup"
              checked={premiumFeatures.multipleTeamSetup}
              onChange={handleCheckboxChange1} 
            />
            Multiple Team Set-Up
          </label>
          <label>
            <input 
              type="checkbox" 
              name="chatVideoCall"
              checked={premiumFeatures.chatVideoCall}
              onChange={handleCheckboxChange1} 
            />
            Chat & Video Call
          </label>
          <label>
            <input 
              type="checkbox" 
              name="multipleProject"
              checked={premiumFeatures.multipleProject}
              onChange={handleCheckboxChange1} 
            />
            Multiple Project
          </label>
        </div>
        <button className="action-button" onClick={payment}>Subscribe</button>
      </div>
    </div>
  );
}

export default SubscribeInfo;
